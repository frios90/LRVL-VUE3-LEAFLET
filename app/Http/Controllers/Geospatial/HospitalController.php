<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HospitalController extends Controller
{
    public function all (Request $request)
    {
        $hospitals =  \App\Models\Geospatial\Hospital::getMarkers($request->selected_region);
        return response($hospitals);
    }
}
