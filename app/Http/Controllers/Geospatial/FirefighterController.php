<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FirefighterController extends Controller
{
    public function all (Request $request)
    {
        $polices =  \App\Models\Geospatial\Firefighter::getMarkers($request->selected_region);
        return response($polices);
    }
}
