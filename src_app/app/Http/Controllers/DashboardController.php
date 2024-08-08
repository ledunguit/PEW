<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends BaseController
{
    public function index()
    {
        $user = Auth::user();
        $projectCount = $user->projects()->count();
        $documentCount = $user->documents()->count();

        return Inertia::render('dashboard/index', [
            'data' => [
                'projectCount' => $projectCount,
                'documentCount' => $documentCount,
                'createdAt' => $user->created_at
            ]
        ]);
    }
}
