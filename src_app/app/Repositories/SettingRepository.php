<?php

namespace App\Repositories;

use App\Interfaces\SettingRepositoryInterface;
use App\Models\Setting;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
    public function __construct(protected Setting $setting)
    {
        parent::__construct($setting);
    }

    public function getVaultPath(): string
    {
        return config('vault.kv_path');
    }

    public function isSetKeypair(string $userId): bool
    {
        $isSet = $this->findWithCondition([
            'user_id' => $userId,
        ]);

        return $isSet !== null;
    }
}
