<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Admin\Project\AssignUsersRequest;
use App\Http\Requests\Admin\Project\CreateProjectRequest;
use App\Interfaces\ProjectRepositoryInterface;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProjectController extends BaseController
{
    public function __construct(protected ProjectRepositoryInterface $projectRepository)
    {
    }

    public function index()
    {
        $projects = $this->projectRepository->all();

        return Inertia::render('admin/project/index', [
            'projects' => $projects
        ]);
    }

    public function create(CreateProjectRequest $request)
    {
        $projectId = PROJECT_ID_PREFIX . Str::upper(Str::random(6));

        $checkExistProjectId = $this->projectRepository->checkExistProjectId($projectId);

        while ($checkExistProjectId) {
            $projectId = PROJECT_ID_PREFIX . Str::upper(Str::random(6));

            $checkExistProjectId = $this->projectRepository->checkExistProjectId($projectId);
        }

        $newProject = [
            "name" => $request->input('name'),
            'description' => $request->input('description'),
            "project_id" => $projectId,
            "number_of_employees" => $request->input('number_of_employees'),
            "company_name" => $request->input('company_name'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ];

        $project = $this->projectRepository->create($newProject);

        return $this->success([
            "project" => $project
        ]);
    }

    public function assignUsers(AssignUsersRequest $request)
    {
        $projectId = $request->input("project_id");

        if (!$this->projectRepository->checkExistProjectId($projectId)) {
            return $this->error([]);
        }

        return $this->projectRepository->assignUsers($projectId, $request->input("user_ids"));
    }

    public function delete($id)
    {
        $this->projectRepository->delete($id);

        return $this->success([]);
    }
}
