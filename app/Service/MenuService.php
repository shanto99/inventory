<?php

namespace App\Service;

use App\Models\User;

class MenuService
{
    public function menus(User $user)
    {
        $allPermissions = collect([]);
        $roles = $user->roles ?: [];
        $permissions = $user->permissions ?: [];

        foreach ($roles as $role) {
            $allPermissions = $allPermissions->merge($role->permissions);
        }

        foreach ($permissions as $permission) {
            $allPermissions->push($permission);
        }

        $menus = [];

        $uniqueKey = 0;

        foreach ($allPermissions as $permission) {
            $permissionMenus = $permission->menus ?: [];
            foreach ($permissionMenus as $index => $menu) {
                $parameters = $menu->parameters ?: [];
                $params = [];
                foreach ($parameters as $parameter) {
                    $params[$parameter->ParamKey] = $parameter->ParamValue;
                }
                $menus[$menu->Name] = [
                    'title' => $menu->Title,
                    'icon' => $menu->Icon,
                    'route' => $menu->Route,
                    'params' => $params,
                    'id' => $uniqueKey
                ];

                $uniqueKey += 1;
            }

            $menuCount = count($menus);

            $permissionSubMenus = $permission->subMenus ?: [];

            foreach ($permissionSubMenus as $index => $subMenu) {
                $menu = $subMenu->menu;
                if (!isset($menus[$menu->Name])) {
                    $menus[$menu->Name] = [
                        'title' => $menu->Title,
                        'icon' => $menu->Icon,
                        'sub_menu' => [],
                        'id' => $uniqueKey
                    ];

                    $uniqueKey += 1;
                }
                $parameters = $subMenu->parameters ?: [];
                $params = [];
                foreach ($parameters as $parameter) {
                    $params[$parameter->ParamKey] = $parameter->ParamValue;
                }

                $menus[$menu->Name]['sub_menu'][$subMenu->Name] = [
                    'title' => $subMenu->Title,
                    'icon' => $subMenu->Icon,
                    'route' => $subMenu->Route,
                    'params' => $params,
                    'id' => $menuCount + $index
                ];
            }
        }

        return $menus;
    }
}
