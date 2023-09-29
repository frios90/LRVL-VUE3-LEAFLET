<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;
    protected $table = 'colegios_2021';
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
                sch.longitud AS long,
                sch.latitud AS lat,
                (sch.nom_rbd || '<br>') as name,
                (sch.direccion || ' #' || sch.numero || ', ' || sch.nom_com_rb) as address
            from colegios_2021 as sch, _region as rm
            where ST_Within(sch.geom, rm.geom);
        ");
    }

    public static function getMarkersInCommune ($commune) {
        \Log::info($commune);
        return \DB::select("
            WITH _commune as (
                SELECT
                    *
                FROM comunas_2020
                WHERE comuna = '" . $commune . "'
            )
            select
                sch.longitud AS long,
                sch.latitud AS lat,
                (sch.nom_rbd || '<br>') as name,
                (sch.direccion || ' #' || sch.numero || ', ' || sch.nom_com_rb) as address
            from colegios_2021 as sch, _commune
            where ST_Within(sch.geom, _commune.geom);
        ");
    }
}
