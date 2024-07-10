<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function __construct()
    {
    }

    public function response($data)
    {
        return response()->json($data, 200);
    }

    public function error($data)
    {
        return response()->json([
            'status' => 'error',
            'data' => $data
        ], 400);
    }

    public function success($data)
    {
        return response()->json([
            'status' => "success",
            'data' => $data
        ], 200);
    }

    public function unauthorized($data)
    {
        return response()->json([
            'status' => 'unauthorized',
            'data' => $data
        ], 401);
    }

    public function forbidden($data)
    {
        return response()->json([
            'status' => 'forbidden',
            'data' => $data
        ], 403);
    }

    public function not_found($data)
    {
        return response()->json([
            'status' => 'not_found',
            'data' => $data
        ], 404);
    }
}
