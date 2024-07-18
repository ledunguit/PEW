<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BaseController;
use App\Http\Requests\Admin\UserManagement\FindUserWithEmailRequest;
use App\Interfaces\UserRepositoryInterface;
use Inertia\Inertia;

class UserManagementController extends BaseController
{
    public function __construct(protected UserRepositoryInterface $userRepository)
    {
    }

    public function index()
    {
        return Inertia::render("admin/user-management/index");
    }

    public function getUserLikeByName(FindUserWithEmailRequest $request)
    {
        if (!$request->input('email')) {
            return $this->success([]);
        }

        $users = $this->userRepository->getModel()
            ->where(function ($query) use ($request) {
                $query->where('email', $request->input('email'))->orWhere('email', 'like', '%' . $request->input('email') . '%');
            })->where('role', 'user')->get()->toArray();

        return $this->success([
            "users" => $users
        ]);
    }
}
