<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Admin\UserManagement\FindUserWithEmailRequest;
use App\Http\Requests\Admin\UserManagement\GenerateKeyPairRequest;
use App\Interfaces\SettingRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Services\VaultService;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserManagementController extends BaseController
{
    public function __construct(
        protected UserRepositoryInterface $userRepository,
        protected VaultService $vaultService,
        protected SettingRepositoryInterface $settingRepository
    ) {
        parent::__construct();
    }

    public function index()
    {
        $users = $this->userRepository->getModel()->where('role', 'user')->get();

        $users->load([
            'projects',
            'vault_setting',
        ]);

        return Inertia::render("admin/user-management/index", [
            "data" => [
                "users" => $users
            ]
        ]);
    }

    public function getUserLikeByName(FindUserWithEmailRequest $request)
    {
        if (!$request->input('email')) {
            return $this->success([]);
        }

        $users = $this->userRepository->getModel()
            ->where(function ($query) use ($request) {
                $query->where('email', $request->input('email'))->orWhere('email', 'like',
                    '%' . $request->input('email') . '%');
            })->where('role', 'user')->get()->toArray();

        return $this->success([
            "users" => $users
        ]);
    }

    public function generateKeyPair(GenerateKeyPairRequest $request)
    {
        $userInfo = $this->userRepository->find($request->input('user_id'));

        if (!$userInfo) {
            return $this->error([
                'message' => 'User not found'
            ]);
        }

        if ($userInfo->vault_setting) {
            return $this->error([
                'message' => 'User already has key pair'
            ]);
        }

        $keyPair = $this->vaultService->getIntCA();

        $privateKey = openssl_pkey_get_private($keyPair['data']['private_key']);
        $publicKey = openssl_x509_read($keyPair['data']['public_key']);

        $userKeyConfig = array(
            "digest_alg" => "sha256",
            "private_key_type" => OPENSSL_KEYTYPE_EC,
            "curve_name" => "secp521r1",
        );

        $userPrivKey = openssl_pkey_new($userKeyConfig);

        if ($userPrivKey === false) {
            return $this->error([
                'message' => 'Failed to generate user private key: ' . openssl_error_string()
            ]);
        }

        // Generate the CSR for the user certificate
        $userCSR = openssl_csr_new(array(
            "countryName" => "VN",
            "stateOrProvinceName" => "HCM",
            "localityName" => "BT",
            "organizationName" => "LeDungOQS",
            "organizationalUnitName" => "InternalFileSharing",
            "commonName" => $userInfo->name,
            "emailAddress" => $userInfo->email,
        ), $userPrivKey, $userKeyConfig);

        if ($userCSR === false) {
            return $this->error([
                'message' => 'Failed to generate user CSR: ' . openssl_error_string()
            ]);
        }

        // Sign the user's certificate with the Intermediate CA
        $userCert = openssl_csr_sign($userCSR, $publicKey, $privateKey, 365,
            $userKeyConfig);

        if ($userCert === false) {
            return $this->error([
                'message' => 'Failed to generate user certificate: ' . openssl_error_string()
            ]);
        }

        // Export the user's private key
        openssl_pkey_export($userPrivKey, $userPrivKeyOut);

        if ($userPrivKeyOut === false) {
            return $this->error([
                'message' => 'Failed to export user private key: ' . openssl_error_string()
            ]);
        }

        // Export the user's certificate
        openssl_x509_export($userCert, $userCertOut);

        if ($userCertOut === false) {
            return $this->error([
                'message' => 'Failed to export user certificate: ' . openssl_error_string()
            ]);
        }

        $uuid = Str::uuid()->toString();

        $this->settingRepository->create([
            'user_id' => $userInfo->id,
            'vault_key_pair_path' => $uuid,
        ]);

        $this->vaultService->saveKeyPair($uuid, $userCertOut, $userPrivKeyOut);

        return $this->success([
            "message" => "Key pair created successfully",
        ]);
    }
}
