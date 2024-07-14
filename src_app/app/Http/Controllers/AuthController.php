<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends BaseController
{
    public function loginView()
    {
        if (Auth::check()) {
            switch (Auth::user()->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard.index');
                default:
                    return redirect()->route('dashboard.index');
            }
        }

        return Inertia::render("auth/login");
    }

    public function register(Request $request)
    {
    }

    public function handleLogin(LoginRequest $loginRequest)
    {
        $credentials = $loginRequest->only(["email", "password"]);

        $remember = $loginRequest->only(['remember']) && $loginRequest->remember ?? false;

        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();

            switch ($user->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard.index');
                default:
                    return redirect()->route('dashboard.index');
            }
        }

        return Inertia::render("auth/login", [
            "errors" => [
                "email" => ["Invalid email or password"],
            ],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect()->route('web.auth.login');
    }
}
