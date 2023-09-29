<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class University extends Model
{
    use HasFactory;
    protected $table = 'instituciones_superiores_2020';
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
                uni.longitud AS long,
                uni.latitud AS lat,
                (uni.nombre_ins || '<br>' || uni.tipo_inst || '<br>' || uni.nombre_inm) as name,
                (uni.direccion || ' #' || uni.numero_di || ', ' || uni.comuna) as address
            from instituciones_superiores_2020 as uni, _region as rm
            where ST_Within(uni.geom, rm.geom);
        ");
    }
}
