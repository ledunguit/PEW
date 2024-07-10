<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface SettingRepositoryInterface extends BaseRepositoryInterface
{
    public function getVaultPath(): string;
    public function isSetKeypair(string $userId): bool;
    public function getKeyPairOfUser(string $userId): array;
    public function getKeyPathOfUser(string $userId): string;
}
