<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuSub extends Model
{
    use HasFactory;
    protected $table = "MenuSubs";
    protected $primaryKey = "MenuSubID";

    protected $guarded = [];

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'MenuID', 'MenuID');
    }

    public function parameters()
    {
        return $this->hasMany(MenuParameter::class, 'MenuSubID', 'MenuSubID');
    }
}
