<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'name',
        "description",
        "project_id",
        "company_name",
        "number_of_employees",
        "start_date",
        "end_date"
    ];

    protected $casts = [
        "start_date" => "datetime:H:i:s d/m/Y",
        "end_date" => "datetime:H:i:s d/m/Y"
    ];

    protected $withCount = [
        "users",
        "documents"
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "project_user", "project_id", "user_id");
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
