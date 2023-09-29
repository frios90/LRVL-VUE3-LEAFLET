<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PoliceController extends Controller
{
    public function all (Request $request)
    {
        $polices =  \App\Models\Geospatial\Police::getMarkers($request->selected_region);
        return response($polices);
    }
}
