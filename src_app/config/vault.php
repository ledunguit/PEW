<?php

return [
    'base_uri' => env('VAULT_BASE_URI', 'http://127.0.0.1:8200'),
    'app_role_method_name' => env('VAULT_APPROLE_METHOD_NAME', 'internalfile'),
    'role_id' => env('VAULT_ROLE_ID', ''),
    'secret_id' => env('VAULT_SECRET_ID', ''),
    'token' => env('VAULT_CLIENT_TOKEN', ''),
    'kv_path' => env('VAULT_KV_PATH', 'kv'),
];
