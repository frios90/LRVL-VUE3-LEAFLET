<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LakeController extends Controller
{
    public function byRegion (Request $request)
    {
        $data["lakes"] = \App\Models\Geospatial\Lake::getByRegion($request->selected_region);
        $data["center"] = \App\Models\Geospatial\Lake::getCenter($request->selected_region);
        return response($data);
    }
}
