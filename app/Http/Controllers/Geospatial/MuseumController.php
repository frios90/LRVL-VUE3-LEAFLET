<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MuseumController extends Controller
{
    public function all (Request $request)
    {
        $museums =  \App\Models\Geospatial\Museum::getMarkers($request->selected_region);
        return response($museums);
    }

    public function test (Request $request)
    {

        $data["provinces"] =  \App\Models\Geospatial\Province::getPolygons();

        return response($data);
    }
}
