<?php

namespace App\Repositories;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface
{
    public function __construct(protected Project $project)
    {
        parent::__construct($project);
    }

    public function getModel(): Project
    {
        return $this->project;
    }

    public function checkExistProjectId($projectId): bool
    {
        $project = $this->findFirstWithCondition([
            "project_id" => $projectId
        ]);

        return (bool) $project;
    }

    public function assignUsers($projectId, $userIds)
    {
        $project = $this->findFirstWithCondition([
            "project_id" => $projectId
        ]);

        if (!$project) {
            return false;
        }

        if ($project->users()->whereIn("user_id", $userIds)->exists()) {
            return false;
        }

        return $project->users()->attach($userIds);
    }
}
