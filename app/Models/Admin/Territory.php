<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Territory extends Model
{
    use HasFactory;
    protected $table = 'comunas_2020';
    protected $guarded = [];

    public static function getRegionList () {
        return \DB::select("
            SELECT
                distinct(region)
            FROM comunas_2020");
    }

    public static function getComunesByRegionList ($region) {
        return \DB::select("
            SELECT
                *
            FROM comunas_2020
            WHERE region = '" . $region . "'
            ORDER BY comuna");
    }
}
