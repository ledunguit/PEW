<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Setting\CreateKeyPairRequest;
use App\Http\Requests\User\Setting\GetKeyPairRequest;
use App\Interfaces\SettingRepositoryInterface;
use App\Models\Keypair;
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
        $keyPath = $this->settingRepository->getKeyPathOfUser($request->user()->id);

        if ($keyPath) {
            return $this->error([
                "message" => "Key pair already exists",
            ]);
        }

        $algorithm = $request->input('algorithm');

        $sig = new LDSignature($algorithm);

        $keypair = $sig->generate_key_pair();

        $uuid = Str::uuid()->toString();

        $this->settingRepository->create([
            'user_id' => $request->user()->id,
            'vault_key_pair_path' => $uuid,
        ]);

        $this->vaultService->saveKeyPair($uuid, $keypair[0], $keypair[1]);

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
