<?php

namespace App\Http\Controllers\Geospatial;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UniversityController extends Controller
{
    public function all (Request $request)
    {
        $universities =  \App\Models\Geospatial\University::getMarkers($request->selected_region);
        return response($universities);
    }
}
