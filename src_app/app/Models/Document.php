<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $hidden = [
        'document_path',
        'hash',
        'created_by',
        'project_id',
        'deleted_at',
        'updated_at'
    ];

    protected $with = ['createdBy'];

    protected $fillable = [
        'document_name',
        'document_path',
        'hash',
        'created_by',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
