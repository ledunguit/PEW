<?php

namespace App\Repositories;

use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(protected User $user)
    {
        parent::__construct($user);
    }

    public function getModel(): User
    {
        return $this->user;
    }
}
