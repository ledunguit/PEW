<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface ProjectRepositoryInterface extends BaseRepositoryInterface
{
    public function checkExistProjectId($projectId);
    public function assignUsers($projectId, $userIds);
}
