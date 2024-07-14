<?php

namespace App\Repositories;

use App\Interfaces\ProjectRepositoryInterface;
use App\Models\Project;

class ProjectRepository extends BaseRepository implements ProjectRepositoryInterface
{
    public function __construct(protected Project $project)
    {
        parent::__construct($project);
    }

    public function checkExistProjectId($projectId)
    {
        $project = $this->findWithCondition([
            "project_id" => $projectId
        ]);

        return $project ? true : false;
    }
}
