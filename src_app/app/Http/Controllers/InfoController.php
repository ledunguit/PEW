<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class InfoController extends BaseController
{
    public function index()
    {
        return Inertia::render('info/index');
    }
}
