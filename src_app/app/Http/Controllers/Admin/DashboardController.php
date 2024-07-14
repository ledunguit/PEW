<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class DashboardController extends BaseController
{
    public function index()
    {
        return Inertia::render("admin/dashboard/index");
    }
}
