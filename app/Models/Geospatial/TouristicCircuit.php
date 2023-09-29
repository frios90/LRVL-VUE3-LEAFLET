<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TouristicCircuit extends Model
{
    use HasFactory;
    protected $table = 'circuitos_turisticos_2015';
    protected $guarded = [];

    public static function getByRegion ($region) {
        $data = \DB::select("
            WITH _region as (
                SELECT
                    ST_Union(comunas_2020.geom) as geom
                FROM comunas_2020
                WHERE region = '" . $region . "'
            )
            SELECT
                ct.circuito as name,
                ST_AsGeoJSON(ST_Buffer(ct.geom::geography, 10, 'endcap=round join=round')) as geometry,
                trunc((ST_Length(ct.geom))::numeric,2) as length
            FROM circuitos_turisticos_2015 as ct, _region as r
            where ST_Within(ct.geom, r.geom)
        ");
        \Log::info($data);
        return $data;
    }

    public static function getCenterCircuit ($region) {
        $data = \DB::select("
            WITH _region as (
                SELECT
                    *
                FROM comunas_2020
                WHERE region = '" . $region . "'
            ),
            _circuits as (
                SELECT
                    ct.circuito as name,
                    ct.geom as geom
                FROM circuitos_turisticos_2015 as ct, _region as r
                where ST_Within(ct.geom, r.geom)
            ),
            _union as (
                select ST_Union(_circuits.geom) as union
                from _circuits
            )
            SELECT

                ST_X (ST_Centroid(_union.union)) AS long,
                ST_Y (ST_Centroid(_union.union)) AS lat

            from _union


        ");
        return $data;
    }
}
