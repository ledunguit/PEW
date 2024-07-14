<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends BaseController
{
    public function index()
    {
        return Inertia::render('home');
    }
}
