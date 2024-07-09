<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\Setting\CreateKeyPairRequest;
use App\Interfaces\SettingRepositoryInterface;
use App\Models\Keypair;
use App\Services\VaultService;
use Illuminate\Http\Request;
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
        $isSetKeypair = $this->settingRepository->isSetKeypair($request->user()->id);

        return Inertia::render("setting/index", [
            "data" => [
                "isSetKeypair" => $isSetKeypair
            ],
        ]);
    }

    public function createKeyPair(CreateKeyPairRequest $request)
    {
        $algorithm = $request->input('algorithm');

        $sig = new LDSignature($algorithm);

        $keypair = $sig->generate_key_pair();

        $uuid = Str::uuid()->toString();

        $this->settingRepository->create([
            'user_id' => $request->user()->id,
            'vault_key_pair_path' => $uuid,
        ]);

        $this->vaultService->saveKeyPairForUser($uuid, $keypair[0], $keypair[1]);

        return $this->success([
            'message' => "Dilithium key pair created successfully",
        ]);
    }
}
