<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

use App\Services\PermissionService;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $table = "UserManager";

    protected $primaryKey = "UserID";
    public $incrementing = false;

    protected $fillable = ['UserID', 'UserName', 'Designation', 'Email', 'Password', 'CreatedBy', 'Route'];

    protected $hidden = [
        'Password', 'remember_token',
    ];

    public function getPhotoUrlAttribute()
    {
        return url('media-example/no-image.png');
    }

    public function getAuthPassword()
    {
        return $this->Password;
    }

    public function permissions()
    {
        return $this->belongsToMany(UserPermission::class, "ModelHasPermissions", "UserID", "permission_id");
    }

    public function roles()
    {
        return $this->belongsToMany(UserRole::class, 'ModelHasRoles', 'UserID', 'role_id');
    }
}
