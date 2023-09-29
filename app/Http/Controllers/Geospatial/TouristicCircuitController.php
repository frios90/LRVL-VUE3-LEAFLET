<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TouristicCircuitController extends Controller
{
    public function byRegion (Request $request)
    {
        $data["circuits"] = \App\Models\Geospatial\TouristicCircuit::getByRegion($request->selected_region);
        $data["center"] = \App\Models\Geospatial\TouristicCircuit::getCenterCircuit($request->selected_region);
        return response($data);
    }
}
