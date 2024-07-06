<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use LDSignature;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/index');
    }
}
