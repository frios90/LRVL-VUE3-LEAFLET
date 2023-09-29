<?php

namespace App\Models\Geospatial;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Museum extends Model
{
    use HasFactory;
    protected $table = 'museos';
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
                *
            from museos as ms, _region as rm
            where ST_Within(ms.geom, rm.geom);
        ");
    }
}
