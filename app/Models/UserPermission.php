<?php

namespace App\Models;

use Spatie\Permission\Models\Permission;

class UserPermission extends Permission
{
    public function menus()
    {
        return $this->hasMany(Menu::class, 'PermissionID', 'id');
    }

    public function subMenus()
    {
        return $this->hasMany(MenuSub::class, 'PermissionID', 'id');
    }
}
