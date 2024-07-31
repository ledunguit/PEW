<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Interfaces\DocumentRepositoryInterface;
use App\Interfaces\ProjectRepositoryInterface;
use Inertia\Inertia;

class DocumentController extends BaseController
{
    public function __construct(
        protected DocumentRepositoryInterface $documentRepository,
        protected ProjectRepositoryInterface $projectRepository
    ) {
        parent::__construct();
    }

    public function index()
    {
        $documents = $this->documentRepository->all();

        $documents->load('project');

        return Inertia::render("admin/document/index", [
            'data' => [
                'documents' => $documents
            ]
        ]);
    }

    public function downloadDocument(string $projectId, string $documentId)
    {
        $project = $this->projectRepository->getModel()->where('project_id', $projectId)->first();

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

    public function showProjectDocuments(string $projectId)
    {
        $project = $this->projectRepository->getModel()->where('project_id', $projectId)->first();

        if (!$project) {
            abort(404);
        }

        $documents = $project->documents;

        $documents->load('project');

        return Inertia::render("admin/document/index", [
            'data' => [
                'documents' => $documents
            ]
        ]);
    }
}
