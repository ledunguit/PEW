<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Setting\CreateKeyPairRequest;
use App\Http\Requests\User\Setting\GetKeyPairRequest;
use App\Interfaces\SettingRepositoryInterface;
use App\Services\VaultService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use LDSignature;
use Illuminate\Support\Str;

class SettingController extends BaseController
{
    public function __construct(protected SettingRepositoryInterface $settingRepository, protected VaultService $vaultService)
    {
    }

    public function index(Request $request)
    {
        $isSetKeyPair = $this->settingRepository->isSetKeypair($request->user()->id);

        return Inertia::render("setting/index", [
            "data" => [
                "isSetKeypair" => $isSetKeyPair,
            ],
        ]);
    }

    public function createKeyPair(CreateKeyPairRequest $request)
    {
        $algorithm = $request->input('algorithm');
        $sig = new LDSignature($algorithm);

        $keyPath = $this->settingRepository->getKeyPathOfUser($request->user()->id);

        if ($keyPath) { // User already have a key pair
            $totalVersions = $this->vaultService->totalVersions($keyPath);

            switch ($totalVersions) {
                case MAXIMUM_NUMBER_OF_KEY_PAIRS:
                    return $this->error([
                        "message" => "You have reach the maximum number of key pair versions",
                    ]);
                default:
                    $keypair = $sig->generate_key_pair();

                    $this->vaultService->saveKeyPair($keyPath, $keypair[0], $keypair[1]);

                    return $this->success([
                        "message" => "Dilithium key pair created successfully",
                    ]);
            }
        } else { // Create new key pair with new key pair path
            $uuid = Str::uuid()->toString();
            $keypair = $sig->generate_key_pair();

            $this->settingRepository->create([
                'user_id' => $request->user()->id,
                'vault_key_pair_path' => $uuid,
            ]);

            $this->vaultService->saveKeyPair($uuid, $keypair[0], $keypair[1]);
        }

        return $this->success([
            'message' => "Dilithium key pair created successfully",
        ]);
    }

    public function getKeyPair(GetKeyPairRequest $request)
    {
        $email = $request->user()->email;

        if (Auth::once([
            "email" => $email,
            "password" => $request->input('password'),
        ])) {
            $keyPairResponse = $this->vaultService->retrieveKeyPair($this->settingRepository->getKeyPathOfUser($request->user()->id));

            return $this->success([
                "message" => "Key pair retrieved successfully",
                "keypair" => [
                    "public_key" => $keyPairResponse['data']['public_key'],
                    "secret_key" => $keyPairResponse['data']['secret_key'],
                ],
            ]);
        }

        return $this->forbidden([
            "message" => "Invalid credentials",
        ]);
    }
}
