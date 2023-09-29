<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TerritoryController extends Controller
{
    public function communesByRegion (Request $request)
    {
        \Log::info($request->all());
        $data["communes"] = \App\Models\Geospatial\Territory::getCommunesByRegion($request->selected_region);
        $data["center"] = \App\Models\Geospatial\Territory::getCenterRegion($request->selected_region);
        return response($data);
    }

    public function communeLimitCommunes (Request $request)
    {
        \Log::info($request->all());
        $data["communes"] = \App\Models\Geospatial\Territory::getCommuneLimitCommunes($request->selected_region, $request->selected_commune);
        $data["center"] = \App\Models\Geospatial\Territory::getCenterRegion($request->selected_region);
        return response($data);
    }
}
