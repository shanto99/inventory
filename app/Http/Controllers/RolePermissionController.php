<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class RolePermissionController extends Controller
{
    public function getRolesWithPermissions()
    {
        $roles = UserRole::with('permissions')->get();
        $roles = $roles->map(function ($role) {
            $permissions = $role->permissions;
            $role->permissionIds = $permissions->map(function ($permission) {
                return $permission->id;
            });

            return $role;
        });
        return response()->json([
            'roles' => $roles,
            'status' => 200
        ]);
    }
}
