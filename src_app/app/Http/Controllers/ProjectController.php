<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Project\UploadDocumentRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProjectController extends BaseController
{
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
        $project->load('documents');

        if (!$project) {
            return Inertia::render('404');
        }

        return Inertia::render('project/detail', [
            'project' => $project
        ]);
    }

    public function uploadDocument(UploadDocumentRequest $request)
    {
        $file = $request->file('document_file');

        if (!$file) {
            return $this->error([
                'message' => 'File not found'
            ]);
        }

        $hash = hash('sha256', file_get_contents($file->getRealPath()));

        $project = Auth::user()->projects()->where('projects.project_id', $request->project_id)->first();

        if (!$project) {
            return $this->error([
                'message' => 'Project not found'
            ]);
        }

        $documentsOfProject = $project->documents()->where('hash', $hash)->first();

        if ($documentsOfProject) {
            return $this->error([
                'message' => 'Document already exists for this project'
            ]);
        }

        $documentPath = $file->store('public/documents');

        $project->documents()->create([
            'document_name' => $file->getClientOriginalName(),
            'document_path' => $documentPath,
            'hash' => $hash,
            'created_by' => Auth::user()->id,
            'project_id' => $project->id
        ]);

        return $this->success([
            'message' => 'Document uploaded'
        ]);
    }
}
