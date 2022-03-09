<?php

namespace App\Http\Controllers;

use App\Http\Request\LoginRequest;
use App\Models\User;
use App\Service\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        $userData = $request->validate([
            'userId' => 'required',
            'name' => 'required',
            'email' => 'required',
            'designation' => 'required',
            'password' => 'required',
            'roles' => 'required',
            'permissions' => 'required'
        ]);
        $userData['password'] = Hash::make($request->password);

        $existingUser = User::find($userData['userId']);

        if ($existingUser) {
        } else {
            $user = User::create([
                'UserID' => $userData['userId'],
                'UserName' => $userData['name'],
                'Email' => $userData['email'],
                'Designation' => $userData['designation'],
                'Password' => $userData['password']
            ]);
        }

        foreach ($userData['roles'] as $role) {
            DB::table('ModelHasRoles')->insert([
                'role_id' => $role,
                'UserID' => $user->UserID
            ]);
        }

        foreach ($userData['permissions'] as $permission) {
            DB::table('ModelHasPermissions')->insert([
                'permission_id' => $permission,
                'UserID' => $user->UserID
            ]);
        }
    }

    public function login(LoginRequest $request, MenuService $menuService)
    {

        if (!Auth::attempt([
            'UserID' => $request->UserID,
            'password' => $request->Password
        ])) {
            throw new \Exception('Wrong user id or password.');
        }

        return $this->getUser($menuService);
    }

    public function getUser(MenuService $menuService)
    {
        $user = Auth::user();
        $user->menus = $menuService->menus($user);

        return response()->json([
            'user' => Auth::user(),
            'status' => 200
        ], 200);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Logged out successfully',
            'status' => 200
        ], 200);
    }
}
