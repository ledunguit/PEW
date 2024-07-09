<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends BaseController
{
    public function index()
    {
        return Inertia::render('dashboard/index');
    }
}
