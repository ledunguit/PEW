<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AssignProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projectId = DB::table('projects')->insertGetId([
            'project_id' => PROJECT_ID_PREFIX . Str::upper(Str::random(6)),
            'name' => 'Test Project',
            'description' => 'Test Project',
            'number_of_employees' => 1,
            'company_name' => 'Test Company',
            'start_date' => now(),
            'end_date' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('project_user')->insert([
            [
                'project_id' => $projectId,
                'user_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
