<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class UserManagementController extends BaseController
{
    public function index()
    {
        return Inertia::render("admin/user-management/index");
    }
}
