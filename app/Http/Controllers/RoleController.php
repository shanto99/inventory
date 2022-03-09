<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function getRoles()
    {
        $roles = UserRole::all();
        return response()->json([
            'roles' => $roles,
            'status' => 200
        ], 200);
    }

    public function createRole(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        $role = UserRole::create([
            'name' => $request->name
        ]);

        return response()->json([
            'data' => [
                'role' => $role
            ],
            'message' => 'Role saved successfully',
            'status' => 200
        ]);
    }

    public function deleteRole($roleId)
    {
        return UserRole::find($roleId)->delete();
    }
}
