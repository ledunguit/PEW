<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\SettingRepositoryInterface;
use App\Repositories\SettingRepository;
use App\Interfaces\ProjectRepositoryInterface;
use App\Repositories\ProjectRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
