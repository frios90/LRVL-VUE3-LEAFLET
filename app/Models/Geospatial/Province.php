<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;
    protected $table = 'provincias_2020';
    protected $guarded = [];

    public static function getPolygons () {
        return \DB::select("
            SELECT
                provincia as name,
                ST_AsGeoJSON(geom) as geometry
            FROM provincias_2020
            WHERE region = 'Metropolitana de Santiago' ;
        ");
    }
}
