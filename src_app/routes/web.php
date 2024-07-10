<?php

use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::name('web.')->group(function () {
    Route::name('auth.')->prefix('/auth')->group(function () {
        Route::get('/login', [AuthController::class, 'loginView'])->name('login.view');
        Route::post('/login', [AuthController::class, 'handleLogin'])->name('login');
        Route::get('/register', [AuthController::class, 'register'])->name('signup.view');
    });
});

Route::name('admin.')->middleware(["auth", "role:admin"])->prefix('/admin')->group(function () {
    Route::name('project.')->prefix('/projects')->group(function () {
        Route::get('/', [AdminProjectController::class, 'index'])->name('index');
    });
});


Route::group(["middleware" => ["auth", "role:user"]], function () {
    Route::name('auth.')->prefix('/auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    });

    Route::name("dashboard.")->group(function () {
        Route::get("/", [DashboardController::class, "index"])->name("index");
    });

    Route::name("document.")->prefix('/documents')->group(function () {
        Route::get("/", [DocumentController::class, "index"])->name("index");
        Route::post("/upload", [DocumentController::class, "upload"])->name("upload");
    });

    Route::name("setting.")->prefix('/settings')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');

        Route::post('/create-key-pair', [SettingController::class, 'createKeyPair'])->name('createKeyPair');
        Route::post('/get-key-pair', [SettingController::class, 'getKeyPair'])->name('getKeyPair');
    });
});
