<?php

namespace App\Http\Controllers;

use App\Service\UserManagerService;

class UserController extends Controller
{
    public function getUsersWithPagination($page = 1)
    {
        $response = UserManagerService::paginate($page);
        return response()->json($response);
    }
}
