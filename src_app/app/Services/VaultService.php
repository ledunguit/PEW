<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class VaultService
{
    private Client $client;
    private string $baseUri;
    private string $roleId;
    private string $secretId;
    private ?string $token = null;
    private string $kvPath;

    private int $trial = 1;

    public function __construct()
    {
        $this->baseUri = config('vault.base_uri');
        $this->roleId = config('vault.role_id');
        $this->secretId = config('vault.secret_id');
        $this->kvPath = config('vault.kv_path');
        $this->client = new Client(['base_uri' => $this->baseUri]);
        $this->token = config('vault.token');

        if (!$this->token) {
            $this->authenticate();
        }
    }

    /**
     * Authenticate with Vault and set the client token.
     */
    private function authenticate(): void
    {
        try {
            $response = $this->client->post('v1/auth/approle/login', [
                'json' => [
                    'role_id' => $this->roleId,
                    'secret_id' => $this->secretId,
                ],
            ]);
            $data = json_decode($response->getBody(), true);
            $this->token = $data['auth']['client_token'];

            Log::info('Authenticated with Vault successfully.');

            $this->updateEnvToken($this->token);
        } catch (RequestException $e) {
            Log::error('Failed to authenticate with Vault.', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Retrieve a secret from the given path.
     */
    private function sendRequest(string $path): array
    {
        return $this->request('GET', $path)['data'] ?? [];
    }

    /**
     * Send a request to Vault.
     */
    private function request(string $method, string $path, array $options = []): array
    {
        try {
            $response = $this->client->request($method, "v1/{$path}", array_merge([
                'headers' => ['X-Vault-Token' => $this->token]
            ], $options));

            return json_decode($response->getBody(), true);
        } catch (RequestException $e) {
            if ($e->getResponse()->getStatusCode() === 403) {
                Log::warning('Vault token expired, re-authenticating. Attempt: ' . $this->trial);

                $this->authenticate();

                if ($this->trial < 3) {
                    $this->trial += 1;
                    return $this->request($method, $path, $options);
                }

                return [];
            } else {
                Log::error('Vault request failed.', ['error' => $e->getMessage()]);
                throw $e;
            }
        }
    }

    /**
     * Save a key pair for a specific user.
     */
    public function saveKeyPair(string $userKeyPath, string $publicKey, string $secretKey): array
    {
        $path = "{$this->kvPath}/data/users/{$userKeyPath}";
        $data = [
            'data' => [
                'public_key' => $publicKey,
                'secret_key' => $secretKey,
            ]
        ];

        Log::info("Saving key pair for key path: $userKeyPath");

        return $this->request('POST', $path, ['json' => $data]);
    }

    /**
     * Retrieve the key pair for a specific user.
     */
    public function retrieveKeyPair(string $userKeyPath): array
    {
        $path = "{$this->kvPath}/data/users/{$userKeyPath}";

        return $this->sendRequest($path);
    }

    public function getMetadata(string $userKeyPath): array
    {
        $path = "{$this->kvPath}/metadata/users/{$userKeyPath}";

        return $this->sendRequest($path);
    }

    public function getAllKeyPairs(string $userKeyPath): array
    {
        $path = "{$this->kvPath}/data/users/{$userKeyPath}";

        return [];
    }

    /**
     * Delete the key pair for a specific user.
     */
    public function deleteKeyPair(string $userKeyPath): array
    {
        $path = "{$this->kvPath}/data/users/{$userKeyPath}";
        return $this->request('DELETE', $path);
    }

    /**
     * List all key pairs under a specific user's path.
     */
    public function listKeyPairs(string $userKeyPath): array
    {
        $path = "{$this->kvPath}/data/user/{$userKeyPath}";

        return $this->request('LIST', $path)['data']['keys'] ?? [];
    }

    public function totalVersions(string $userKeyPath): int
    {
        $path = "{$this->kvPath}/metadata/users/{$userKeyPath}";

        $versions = $this->request("GET", $path)["data"]["versions"];

        return count($versions);
    }

    /**
     * Update the Vault token in the .env file.
     */
    private function updateEnvToken(string $token): void
    {
        $envPath = base_path('.env');
        if (file_exists($envPath)) {
            file_put_contents($envPath, str_replace(
                'VAULT_CLIENT_TOKEN=' . config('vault.token'),
                'VAULT_CLIENT_TOKEN=' . $token,
                file_get_contents($envPath)
            ));
        }
    }
}
