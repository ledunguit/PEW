<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;


interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function getSigners(): Collection;
}
