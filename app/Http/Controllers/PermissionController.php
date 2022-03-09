<?php

namespace App\Http\Controllers;

use App\Models\UserPermission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getPermmissions()
    {
        $permissions = UserPermission::all();
        return response()->json([
            'permissions' => $permissions,
            'status' => 200
        ]);
    }

    public function createPermission(Request $request)
    {
        $permission = UserPermission::create([
            'name' => $request->name
        ]);

        return response()->json([
            'permission' => $permission,
            'status' => 200
        ], 200);
    }

    public function deletePermission($permissionId)
    {
        UserPermission::find($permissionId)->delete();
        return response()->json([
            'status' => 200
        ], 200);
    }
}
