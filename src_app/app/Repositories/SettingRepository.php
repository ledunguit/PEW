<?php

namespace App\Repositories;

use App\Interfaces\SettingRepositoryInterface;
use App\Models\VaultSetting;
use App\Services\VaultService;

class SettingRepository extends BaseRepository implements SettingRepositoryInterface
{
    public function __construct(protected VaultSetting $vaultSetting, protected VaultService $vaultService)
    {
        parent::__construct($vaultSetting);
    }

    public function getVaultPath(): string
    {
        return config('vault.kv_path');
    }

    public function isSetKeypair(string $userId): bool
    {
        $isSet = $this->findFirstWithCondition([
            'user_id' => $userId,
        ]);

        return $isSet !== null;
    }

    public function getKeyPairOfUser(string $userId): array
    {
        if ($this->isSetKeypair($userId)) {
            $keyPairResponse = $this->vaultService->retrieveKeyPair($this->getKeyPathOfUser($userId));

            return [
                "public_key" => $keyPairResponse['data']['public_key'],
                "secret_key" => $keyPairResponse['data']['secret_key'],
            ];
        }

        return [];
    }

    public function getKeyPathOfUser(string $userId): string
    {
        $setting = $this->findFirstWithCondition([
            'user_id' => $userId,
        ]);

        return $setting ? $setting->vault_key_pair_path : '';
    }
}
