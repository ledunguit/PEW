<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class ProfileController extends BaseController
{
    public function index()
    {
        return Inertia::render('admin/profile/index');
    }
}
