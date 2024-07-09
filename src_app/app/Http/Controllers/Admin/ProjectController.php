<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends BaseController
{
    public function index()
    {
        return Inertia::render('admin/project/index');
    }
}
