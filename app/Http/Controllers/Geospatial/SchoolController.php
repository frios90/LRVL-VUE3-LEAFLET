<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function all (Request $request)
    {
        $schools =  \App\Models\Geospatial\School::getMarkers($request->selected_region);
        return response($schools);
    }

    public function inCommune (Request $request)
    {
        \Log::info($request->all());
        $schools =  \App\Models\Geospatial\School::getMarkersInCommune($request->selected_commune);
        return response($schools);
    }
}
