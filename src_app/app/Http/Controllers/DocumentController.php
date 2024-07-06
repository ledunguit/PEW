<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use LDSignature;

class DocumentController extends Controller
{
    public function index()
    {
        $sig = new LDSignature();
        $keyPair = $sig->generate_key_pair();

        return Inertia::render('document/index', [
            "keyPair" => [
                "public" => $keyPair[0],
                "secret" => $keyPair[1],
            ]
        ]);
    }
}
