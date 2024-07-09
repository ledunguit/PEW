<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface SettingRepositoryInterface extends BaseRepositoryInterface
{
    public function getVaultPath(): string;
    public function isSetKeypair(string $userId): bool;
}
