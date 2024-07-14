<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProfileController extends BaseController
{
    public function index()
    {
        return Inertia::render('profile/index');
    }
}
