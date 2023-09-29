<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    use HasFactory;
    protected $table = 'establecimientos_salud_2021';
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
                ST_X (ST_Transform (e_salud.geom, 4326)) AS long,
                ST_Y (ST_Transform (e_salud.geom, 4326)) AS lat,
                e_salud.nombre,
                e_salud.tipo
            from establecimientos_salud_2021 as e_salud, _region as rm
            where ST_Within(e_salud.geom, rm.geom);
        ");
    }
}
