<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("users")->insert([[
            "name" => "Admin",
            "email" => "admin@ledungoqs.com",
            "role" => "admin",
            'password' => bcrypt('Aa@123456'),
        ], [
            'name' => 'Test User',
            'email' => 'test@ledungoqs.com',
            "role" => "user",
            'password' => bcrypt('Aa@123456'),
        ]]);
    }
}
