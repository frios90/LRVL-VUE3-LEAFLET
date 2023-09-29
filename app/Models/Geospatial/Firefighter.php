<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Firefighter extends Model
{
    use HasFactory;
    protected $table = 'compania_bomberos';
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
                ST_X (ST_Transform (cb.geom, 4326)) AS long,
                ST_Y (ST_Transform (cb.geom, 4326)) AS lat,
                cb.compañia as nombre_uni,
                (cb.cut_cia || '-' || cb.cut_cuerpo || '-' || cb.direccion) as address
            from compania_bomberos as cb, _region as rm
            where ST_Within(cb.geom, rm.geom);
        ");
    }
}
