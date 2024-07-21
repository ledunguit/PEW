<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaultSetting extends Model
{
    protected $fillable = [
        'user_id',
        'vault_key_pair_path'
    ];
}
