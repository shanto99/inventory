<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function getMenus()
    {
        $menus = Menu::all();
        return response()->json([
            'menus' => $menus,
            'status' => 200
        ], 200);
    }

    public function createMenu(Request $request)
    {
        $menuData = $request->validate([
            'name' => 'required',
            'title' => 'required',
            'icon' => 'required',
            'routeName' => 'required_unless:permission,null|string',
            'permission' => 'required_unless:routeName,null'
        ]);

        $menu = Menu::create([
            'Name' => $menuData['name'],
            'Title' => $menuData['title'],
            'Icon' => $menuData['icon'],
            'RouteName' => $menuData['routeName'] ?: null,
            'PermissionID' => $menuData['permission'] ?: null
        ]);

        return response()->json([
            'menu' => $menu,
            'status' => 200
        ], 200);
    }

    public function deleteMenu($id)
    {
        Menu::find($id)->delete();
        return response()->json([
            'status' => 200
        ], 200);
    }
}
