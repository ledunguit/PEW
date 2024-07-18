<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        "description",
        "project_id",
        "company_name",
        "number_of_employees",
        "start_date",
        "end_date"
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, "project_user", "project_id", "user_id");
    }
}
