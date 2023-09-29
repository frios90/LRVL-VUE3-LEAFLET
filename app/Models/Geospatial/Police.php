<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Police extends Model
{
    use HasFactory;
    protected $table = 'cuarteles_carabineros';
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
                cc.point_y as lat,
                cc.point_x as long,
                cc.nombre_uni,
                cc.tipo_de_un,
                (cc.tipo_de_vi || ' ' || cc.nombre_de || ' ' || cc.numero || ', ' || cc.nombre_com) as address
            from cuarteles_carabineros as cc, _region as rm
            where ST_Within(cc.geom, rm.geom);
        ");
    }
}