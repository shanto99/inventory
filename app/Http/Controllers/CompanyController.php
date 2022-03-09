<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function getCompanies()
    {
        return response()->json([
            'companies' => Company::all(),
            'status' => 200
        ], 200);
    }
}
