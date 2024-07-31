<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Project\CopyPublicKeyRequest;
use App\Http\Requests\User\Project\UploadDocumentRequest;
use App\Http\Requests\User\Project\VerifyDocumentRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Services\VaultService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends BaseController
{
    public function __construct(protected UserRepositoryInterface $userRepository, protected VaultService $vaultService)
    {
        parent::__construct();
    }

    public function index()
    {
        $user = Auth::user();

        $projects = $user->projects()->get();
        $projects->load('users');

        return Inertia::render('project/index', [
            'data' => [
                'projects' => $projects
            ]
        ]);
    }

    public function detail($project_id)
    {
        $user = Auth::user();

        $project = $user->projects()->where('projects.project_id', $project_id)->first();

        if (!$project) {
            return Inertia::render('404');
        }

        $project->load('documents');

        return Inertia::render('project/detail', [
            'data' => [
                'project' => $project,
                'documents' => $project->documents
            ]
        ]);
    }

    public function uploadDocument(UploadDocumentRequest $request)
    {
        $project = Auth::user()->projects()->where('projects.project_id', $request->project_id)->first();

        if (!$project) {
            return $this->error([
                'message' => 'Project not found'
            ]);
        }

        $file = $request->file('document_file');

        if (!$file) {
            return $this->error([
                'message' => 'File not found'
            ]);
        }

        $hash = hash('sha256', file_get_contents($file->getRealPath()));

        $documentsOfProject = $project->documents()->where('hash', $hash)->first();

        if ($documentsOfProject) {
            return $this->error([
                'message' => 'Document already exists for this project'
            ]);
        }

        $user = Auth::user();

        if (!$user->vault_setting) {
            return $this->error([
                'message' => "Keypair not found, please contact admin for keypair generation"
            ]);
        }

        $privateKey = $this->vaultService->getPrivateKey($user->vault_setting->vault_key_pair_path);

        $userPrivateKeyResource = openssl_pkey_get_private($privateKey);

        $signature = '';
        openssl_sign($hash, $signature, $userPrivateKeyResource, OPENSSL_ALGO_SHA256);

        $signature = base64_encode($signature);
        $documentPath = $file->store("public/documents/$project->project_id");

        $project->documents()->create([
            'document_name' => $file->getClientOriginalName(),
            'document_path' => $documentPath,
            'hash' => $hash,
            'signature' => $signature,
            'created_by' => Auth::user()->id,
            'project_id' => $project->id
        ]);

        return $this->success([
            'message' => 'Document uploaded'
        ]);
    }

    public function downloadDocument(string $projectId, string $documentId)
    {
        $project = Auth::user()->projects()->where('projects.project_id', $projectId)->first();

        if (!$project) {
            return $this->error([
                'message' => 'Project not found'
            ]);
        }

        $document = $project->documents()->where('id', $documentId)->first();

        if (!$document) {
            return $this->error([
                'message' => 'Document not found for this project'
            ]);
        }

        return response()->download(storage_path("app/$document->document_path"), $document->document_name);
    }

    public function deleteDocument(string $projectId, string $documentId)
    {
        $project = Auth::user()->projects()->where('projects.project_id', $projectId)->first();

        if (!$project) {
            return $this->error([
                'message' => 'Project not found'
            ]);
        }

        $document = $project->documents()->where('id', $documentId)->first();

        if (!$document) {
            return $this->error([
                'message' => 'Document not found for this project'
            ]);
        }

        if ($document->created_by !== Auth::user()->id) {
            return $this->error([
                'message' => 'You are not authorized to delete this document'
            ]);
        }

        $document->delete();

        return $this->success([
            'message' => 'Document deleted'
        ]);
    }

    public function verifyDocument(VerifyDocumentRequest $request)
    {
        $project = Auth::user()->projects()->where('projects.project_id', $request->project_id)->first();

        if (!$project) {
            return $this->error([
                'message' => 'Project not found'
            ]);
        }

        $document = $project->documents()->where('id', $request->document_id)->first();

        if (!$document) {
            return $this->error([
                'message' => 'Document not found for this project'
            ]);
        }

        if ($document->created_by === Auth::user()->id) {
            return $this->error([
                'message' => "You can't verify your own document"
            ]);
        }

        $user = $document->createdBy;

        if (!$user->vault_setting) {
            return $this->error([
                'message' => "Something went wrong, please contact administrator"
            ]);
        }

        $publicKey = $this->vaultService->getPublicKey($user->vault_setting->vault_key_pair_path);

        $userPublicKeyResource = openssl_pkey_get_public($publicKey);

        $signature = base64_decode($document->signature);

        $verified = openssl_verify($document->hash, $signature, $userPublicKeyResource, OPENSSL_ALGO_SHA256);

        if ($verified === 1) {
            return $this->success([
                'message' => 'Document verified, this document is signed by ' . $document->createdBy->name
            ]);
        }

        return $this->error([
            'message' => 'Document verification failed, this document is not signed by ' . $document->createdBy->name
        ]);
    }

    public function copyPublicKey(CopyPublicKeyRequest $request)
    {
        $user = $this->userRepository->findOrFail($request->input('user_id'));

        if (!$user->vault_setting) {
            return $this->error([
                'message' => "Something went wrong, please contact administrator"
            ]);
        }

        $publicKey = $this->vaultService->getPublicKey($user->vault_setting->vault_key_pair_path);

        return $this->success([
            'message' => 'Public key copied',
            'publicKey' => $publicKey
        ]);
    }
}
