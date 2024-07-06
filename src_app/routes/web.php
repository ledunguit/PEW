<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;

Route::group(["middleware" => "web"], function () {
    Route::name("dashboard")->group(function () {
        Route::get("/", [DashboardController::class, "index"])->name(".index");
    });

    Route::name("document")->prefix('/documents')->group(function () {
        Route::get("/", [DocumentController::class, "index"])->name(".index");
    });
});
