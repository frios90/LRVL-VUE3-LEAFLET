<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Territory extends Model
{
    use HasFactory;
    protected $table = 'comunas_2020';
    protected $guarded = [];

    public static function getCommunesByRegion ($region) {
        return \DB::select("
            SELECT
                comuna as name,
                ST_AsGeoJSON(geom) as geometry,
                trunc((ST_Area(comunas_2020.geom, false)/1000000)::numeric,2) as area

            FROM comunas_2020
            WHERE region = '" . $region . "'");
    }

    public static function getCenterRegion ($region) {
        return \DB::select("
            SELECT

                ST_X (ST_Centroid(ST_Union(geom))) AS long,
                ST_Y (ST_Centroid(ST_Union(geom))) AS lat

            FROM comunas_2020
            WHERE region = '" . $region . "'");
    }

    public static function getCommuneLimitCommunes ($region, $commune) {
        return \DB::select("
            WITH _center_commune AS (
                SELECT geom
                from comunas_2020
                where comuna = '" . $commune . "'
            )
            SELECT
                comuna as name,
                ST_AsGeoJSON(comunas_2020.geom) as geometry,
                ST_Area(comunas_2020.geom) as area
            FROM comunas_2020, _center_commune
            WHERE ST_Touches(comunas_2020.geom, _center_commune.geom)");
    }

}
