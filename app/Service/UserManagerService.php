<?php

namespace App\Service;

use App\Models\User;

class UserManagerService
{
    public static function paginate($page = 1, $limit = 10)
    {
        $prevPage = $page - 1;
        $totalUser = User::count();
        $totalPage = ceil($totalUser / $limit);
        $users = User::take($limit)->skip($prevPage * $limit)->get();
        return [
            'totalPage' => $totalPage,
            'users' => $users,
            'page' => $page,
        ];
    }
}
