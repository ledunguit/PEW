<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use Inertia\Inertia;

class SettingController extends BaseController
{
    public function index()
    {
        return Inertia::render("admin/setting/index");
    }
}
