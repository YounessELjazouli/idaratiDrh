<?php

namespace App\Http\Controllers;

use App\Models\Doctype;
use Illuminate\Http\Request;

class DoctypeController extends Controller
{
    public function typeCorrespondances(){
        $types = Doctype::where('type','refs')->get();
        return response()->json([
            "success" => true,
            "data" => $types,
        ]);
    }
    public function typeTextes(){

    }
}
