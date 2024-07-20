<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use LDDilithium;

class DocumentController extends BaseController
{
    public function index()
    {
        $sig = new LDDilithium();
        $keyPair = $sig->generate_key_pair();

        return Inertia::render('document/index', [
            "keyPair" => [
                "public" => $keyPair[0],
                "secret" => $keyPair[1],
            ]
        ]);
    }
}
