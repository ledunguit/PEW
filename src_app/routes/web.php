<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Admin\UserManagementController as AdminUserManagementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');
Route::get('/info', [InfoController::class, 'index'])->name('info');

Route::name('web.')->group(function () {
    Route::name('auth.')->prefix('/auth')->group(function () {
        Route::get('/login', [AuthController::class, 'loginView'])->name('login.view');
        Route::post('/login', [AuthController::class, 'handleLogin'])->name('login');
        Route::get('/register', [AuthController::class, 'register'])->name('signup.view');
    });
});

Route::middleware(["auth"])->group(function () {
    Route::name('auth.')->prefix('/auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    });
});

Route::name('admin.')->middleware(["auth", "role:admin"])->prefix('/admin')->group(function () {
    Route::name('dashboard.')->prefix('/dashboard')->group(function () {
        Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
    });

    Route::name('project.')->prefix('/projects')->group(function () {
        Route::get('/', [AdminProjectController::class, 'index'])->name('index');
        Route::post('/create', [AdminProjectController::class, 'create'])->name('create');
        Route::delete('/delete/{id}', [AdminProjectController::class, 'delete'])->name('delete');

        Route::post('/assign-users', [AdminProjectController::class, 'assignUsers'])->name('assignUsers');
    });

    Route::name('document.')->prefix('/documents')->group(function () {
        Route::get('/', [AdminDocumentController::class, 'index'])->name('index');
        Route::get('/{project_id}',
            [AdminDocumentController::class, 'showProjectDocuments'])->name('showProjectDocuments');
        Route::get('/download-document/{project_id}/{document_id}',
            [AdminDocumentController::class, 'downloadDocument'])->name('downloadDocument');
    });

    Route::name('profile.')->prefix('/profile')->group(function () {
        Route::get('/', [AdminProfileController::class, 'index'])->name('index');
    });

    Route::name('setting.')->prefix('/settings')->group(function () {
        Route::get('/', [AdminSettingController::class, 'index'])->name('index');
    });

    Route::name('user.')->prefix('/users')->group(function () {
        Route::get('/', [AdminUserManagementController::class, 'index'])->name('index');
        Route::post('/create', [AdminUserManagementController::class, 'create'])->name('create');
        Route::delete('/delete/{id}', [AdminUserManagementController::class, 'delete'])->name('delete');
        Route::post('/update-status/{id}',
            [AdminUserManagementController::class, 'updateStatus'])->name('updateStatus');

        Route::post(
            '/get-users-like-by-name',
            [AdminUserManagementController::class, 'getUserLikeByName']
        )->name('getUserLikeByName');

        Route::post(
            '/generate-key-pair',
            [AdminUserManagementController::class, 'generateKeyPair']
        )->name('generateKeyPair');
    });
});

Route::group(["middleware" => ["auth", "role:user", "userStatus"]], function () {
    Route::name("dashboard.")->prefix('/dashboard')->group(function () {
        Route::get("/", [DashboardController::class, "index"])->name("index");
    });

    Route::name('project.')->prefix('/projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index'])->name('index');
        Route::get('/detail/{project_id}', [ProjectController::class, 'detail'])->name('detail');
        Route::post('/upload-document', [ProjectController::class, 'uploadDocument'])->name('uploadDocument');
        Route::get('/download-document/{project_id}/{document_id}',
            [ProjectController::class, 'downloadDocument'])->name('downloadDocument');
        Route::delete('/delete-document/{project_id}/{document_id}',
            [ProjectController::class, 'deleteDocument'])->name('deleteDocument');

        Route::post('/verify-document', [ProjectController::class, 'verifyDocument'])->name('verifyDocument');
        Route::post('/copy-public-key', [ProjectController::class, 'copyPublicKey'])->name('copyPublicKey');
    });

    Route::name("document.")->prefix('/documents')->group(function () {
        Route::post("/upload", [DocumentController::class, "upload"])->name("upload");
    });

    Route::name("profile.")->prefix("/profile")->group(function () {
        Route::get('/', [ProfileController::class, 'index'])->name('index');
    });

    Route::name("setting.")->prefix('/settings')->group(function () {
        Route::get('/', [SettingController::class, 'index'])->name('index');

        Route::post('/create-key-pair', [SettingController::class, 'createKeyPair'])->name('createKeyPair');
        Route::post('/get-key-pair', [SettingController::class, 'getKeyPair'])->name('getKeyPair');
    });
});
