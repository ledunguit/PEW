<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
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
        'signature',
        'created_by',
        'project_id'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
