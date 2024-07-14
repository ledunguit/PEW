<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProjectController extends BaseController
{
    public function index()
    {
        return Inertia::render('project/index');
    }
}
