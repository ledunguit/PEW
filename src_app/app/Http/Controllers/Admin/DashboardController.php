<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Interfaces\DocumentRepositoryInterface;
use App\Interfaces\ProjectRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use Inertia\Inertia;

class DashboardController extends BaseController
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
        protected ProjectRepositoryInterface $projectRepository,
        protected DocumentRepositoryInterface $documentRepository
    ) {
        parent::__construct();
    }

    public function index()
    {
        $usersCount = $this->userRepository->count();
        $projectsCount = $this->projectRepository->count();
        $documentsCount = $this->documentRepository->count();

        return Inertia::render("admin/dashboard/index", [
            'data' => [
                'usersCount' => $usersCount,
                'projectsCount' => $projectsCount,
                'documentsCount' => $documentsCount
            ]
        ]);
    }
}
