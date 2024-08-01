<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Document\VerifyDocumentRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Services\VaultService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LDDilithium;

class DocumentController extends BaseController
{
    public function __construct(protected UserRepositoryInterface $userRepository, protected VaultService $vaultService)
    {
        parent::__construct();
    }

    public function verifyDocumentView(Request $request)
    {
        $signers = $this->userRepository->getSigners();

        return Inertia::render('document/verify-document', [
            'data' => [
                'signers' => $signers
            ]
        ]);
    }

    public function verifyDocument(VerifyDocumentRequest $request)
    {
        $user = $this->userRepository->find($request->input('signer_id'));

        if (!$user) {
            return $this->error([
                'message' => 'Signer not found'
            ]);
        }

        $publicKey = $this->vaultService->getPublicKey($user->vault_setting->vault_key_pair_path);

        $document = $request->file('files')[0];

        $hash = hash('sha256', file_get_contents($document->getRealPath()));

        $userPublicKeyResource = openssl_pkey_get_public($publicKey);

        $signature = base64_decode($request->input('signature'));

        $verified = openssl_verify($hash, $signature, $userPublicKeyResource, OPENSSL_ALGO_SHA256);

        if ($verified === 1) {
            return $this->success([
                'message' => 'Document verified successfully'
            ]);
        }

        return $this->error([
            'message' => 'Document verification failed'
        ]);
    }
}
