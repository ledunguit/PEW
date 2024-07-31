<?php

namespace App\Repositories;

use App\Interfaces\DocumentRepositoryInterface;
use App\Models\Document;

class DocumentRepository extends BaseRepository implements DocumentRepositoryInterface
{
    public function __construct(protected Document $document)
    {
        parent::__construct($document);
    }

    public function getModel(): Document
    {
        return $this->document;
    }
}
