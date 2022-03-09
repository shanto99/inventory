<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SubMenuController;

Route::get('/inventory', function () {
    return view('app');
});
Route::prefix('inventory')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth')->group(function () {
        Route::post('/create_user', [AuthController::class, 'createUser']);
        Route::get('/user', [AuthController::class, 'getUser']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/users_pagination/{page?}', [UserController::class, 'getUsersWithPagination']);
        Route::get('/roles', [RoleController::class, 'getRoles']);
        Route::post('/create_role', [RoleController::class, 'createRole']);
        Route::delete('/delete_role/{roleId}', [RoleController::class, 'deleteRole']);

        Route::get('/permissions', [PermissionController::class, 'getPermmissions']);
        Route::post('/create_permission', [PermissionController::class, 'createPermission']);
        Route::delete('/delete_permission/{permissionId}', [PermissionController::class, 'deletePermission']);
        Route::get('/roles_permissions', [RolePermissionController::class, 'getRolesWithPermissions']);

        Route::post('/create_menu', [MenuController::class, 'createMenu']);
        Route::delete('/delete_menu/{menuId}', [MenuController::class, 'deleteMenu']);
        Route::get('/menus', [MenuController::class, 'getMenus']);
        Route::get('/sub_menus', [SubMenuController::class, 'getSubMenus']);
        Route::post('/create_sub_menu', [SubMenuController::class, 'createSubMenu']);

        Route::get('companies', [CompanyController::class, 'getCompanies']);
    });
});

Route::fallback(function () {
    return redirect("/inventory");
});
