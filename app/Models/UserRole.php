<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role;

class UserRole extends Role
{
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(UserPermission::class, 'RoleHasPermissions', 'role_id', 'permission_id');
    }
}
