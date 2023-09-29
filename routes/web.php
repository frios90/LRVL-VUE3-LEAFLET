<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('main');
});

Route::get('/home', function () {
    return view('main');
});

Route::get('/test', function () {
    return view('main');
});

Route::get('/map', function () {
    return view('main');
});

Route::get('/vuetify', function () {
    return view('main');
});


Route::get('/geospatial/museums/all', [\App\Http\Controllers\Geospatial\MuseumController::class, 'all']);
Route::get('/geospatial/police/all', [\App\Http\Controllers\Geospatial\PoliceController::class, 'all']);
Route::get('/geospatial/hospitals/all', [\App\Http\Controllers\Geospatial\HospitalController::class, 'all']);
Route::get('/geospatial/firefighters/all', [\App\Http\Controllers\Geospatial\FirefighterController::class, 'all']);
Route::get('/geospatial/universities/all', [\App\Http\Controllers\Geospatial\UniversityController::class, 'all']);

Route::get('/geospatial/territory/communes/by-region', [\App\Http\Controllers\Geospatial\TerritoryController::class, 'communesByRegion']);
Route::get('/geospatial/territory/communes/commune-limit-communes', [\App\Http\Controllers\Geospatial\TerritoryController::class, 'communeLimitCommunes']);


Route::get('/admin/territories/region-list', [\App\Http\Controllers\Admin\TerritoryController::class, 'regionList']);
Route::get('/admin/territories/communes-by-region-list', [\App\Http\Controllers\Admin\TerritoryController::class, 'communesByRegionList']);


/**Rutas de colegios */
Route::get('/geospatial/schools/all', [\App\Http\Controllers\Geospatial\SchoolController::class, 'all']);
Route::get('/geospatial/schools/in-commune', [\App\Http\Controllers\Geospatial\SchoolController::class, 'inCommune']);


Route::get('/geospatial/kinder-integra/all', [\App\Http\Controllers\Geospatial\KinderIntegraController::class, 'all']);
Route::get('/geospatial/kinder-integra/close-hospital-commmune', [\App\Http\Controllers\Geospatial\KinderIntegraController::class, 'closeHospitalCommune']);


Route::get('/geospatial/touristic-circuits/by-region', [\App\Http\Controllers\Geospatial\TouristicCircuitController::class, 'byRegion']);

Route::get('/geospatial/lakes/by-region', [\App\Http\Controllers\Geospatial\LakeController::class, 'byRegion']);
