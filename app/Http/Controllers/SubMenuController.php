<?php

namespace App\Http\Controllers;

use App\Models\MenuSub;
use Illuminate\Http\Request;

class SubMenuController extends Controller
{
    public function getSubMenus()
    {
        $subMenus = MenuSub::with('menu')->get();
        return response()->json([
            'subMenus' => $subMenus,
            'status' => 200
        ]);
    }

    public function createSubMenu(Request $request)
    {
    }
}
