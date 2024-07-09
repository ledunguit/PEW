<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\SettingRepositoryInterface;
use App\Repositories\SettingRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(SettingRepositoryInterface::class, SettingRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
