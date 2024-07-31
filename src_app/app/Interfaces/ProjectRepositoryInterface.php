<?php

namespace App\Interfaces;

interface ProjectRepositoryInterface extends BaseRepositoryInterface
{
    public function checkExistProjectId($projectId);

    public function assignUsers($projectId, $userIds);
}
