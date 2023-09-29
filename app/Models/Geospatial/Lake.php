<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lake extends Model
{
    use HasFactory;
    protected $table = 'lagos';
    protected $guarded = [];

    public static function getByRegion ($region) {
        return \DB::select("
            WITH _region as (
                SELECT
                    ST_Union(comunas_2020.geom) as geom
                FROM comunas_2020
                WHERE region = '" . $region . "'
            )
            SELECT
                lagos.nombre as name,
                ST_AsGeoJSON(lagos.geom) as geometry,
                trunc((ST_Area(lagos.geom, false)/1000000)::numeric,2) as area,
                lagos.area_km2,
                lagos.tipo as type
            FROM lagos, _region as rm
            where ST_Within(lagos.geom, rm.geom);");
    }

    public static function getCenter ($region) {
        return \DB::select("
        WITH _region as (
            SELECT
                ST_Union(comunas_2020.geom) as geom

            FROM comunas_2020
            WHERE region = '" . $region . "'
        )
            SELECT
                ST_X (ST_Centroid(ST_Union(lagos.geom))) AS long,
                ST_Y (ST_Centroid(ST_Union(lagos.geom))) AS lat
            FROM lagos, _region as rm
            where ST_Within(lagos.geom, rm.geom);");
    }
}
