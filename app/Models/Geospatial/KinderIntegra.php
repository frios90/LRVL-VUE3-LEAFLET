<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KinderIntegra extends Model
{
    use HasFactory;
    protected $table = 'est_parv';
    protected $guarded = [];

    public static function getMarkers ($region) {
        return \DB::select("
            WITH _region as (
                SELECT
                    ST_Union(comunas_2020.geom) as geom

                FROM comunas_2020
                WHERE region = '" . $region . "'
            )
            select
                jii.nom_estab,
                jii.longitud AS long,
                jii.latitud AS lat
            from est_parv as jii, _region as rm
            where ST_Within(jii.geom, rm.geom);
        ");
    }

    public static function getMarkersCloseHospitalCommune ($commune) {

        return \DB::select("
            WITH _region as (
                SELECT
                    geom
                FROM comunas_2020
                WHERE comuna = '" . $commune . "'
            )
            select
                jii.nom_estab,
                jii.longitud AS long,
                jii.latitud AS lat,
                ST_AsGeoJSON(ST_Buffer(jii.geom::geography, 200, 'endcap=round join=round')) as geometry

            from
                est_parv as jii,
                _region as rm,
                establecimientos_salud_2021 as e_salud
            where ST_Within(jii.geom, rm.geom)
            and ST_Within(e_salud.geom, ST_Buffer(jii.geom::geography, 200, 'endcap=round join=round')::geometry);
        ");
    }
}
