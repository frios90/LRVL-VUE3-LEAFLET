<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class KinderIntegraController extends Controller
{
    public function all (Request $request)
    {
        $kinder =  \App\Models\Geospatial\KinderIntegra::getMarkers($request->selected_region);
        return response($kinder);
    }

    public function closeHospitalCommune (Request $request)
    {
        $kinder =  \App\Models\Geospatial\KinderIntegra::getMarkersCloseHospitalCommune($request->selected_commune);
        \Log::info($kinder);
        return response($kinder);
    }
}
