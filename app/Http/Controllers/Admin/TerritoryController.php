<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TerritoryController extends Controller
{
    public function regionList ()
    {
        $regionList = \App\Models\Admin\Territory::getRegionList();
        return response($regionList);
    }

    public function communesByRegionList (Request $request)
    {
        $communeList = \App\Models\Admin\Territory::getComunesByRegionList($request->selected_region);
        return response($communeList);
    }
}
