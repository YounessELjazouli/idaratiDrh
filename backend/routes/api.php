<?php

use App\Http\Controllers\CorrespondanceController;
use App\Http\Controllers\DoctypeController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\TexteReglementaireController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[UserController::class,'login']);
Route::post('/register',[UserController::class,'register']);
Route::middleware('auth:sanctum')->get('/users',[UserController::class,'index']);
Route::middleware('auth:sanctum')->delete('/user',[UserController::class,'remove']);
Route::middleware('auth:sanctum')->post('/me',[UserController::class,'me']);
Route::middleware('auth:sanctum')->post('/logout',[UserController::class,'logout']);
Route::middleware('auth:sanctum')->post('/update_user',[UserController::class,'update']);

Route::middleware('auth:sanctum')->post('/check-login', [UserController::class,'checkLogin'])->name('checkLogin.api');
Route::middleware('auth:sanctum')->resource('textes-reglementaires', TexteReglementaireController::class);
Route::middleware('auth:sanctum')->resource('correspondances', CorrespondanceController::class);
Route::middleware('auth:sanctum')->put('/correspondance', [CorrespondanceController::class,'update']);
Route::middleware('auth:sanctum')->get('/paginate/correspondances', [CorrespondanceController::class,'paginate']);
Route::middleware('auth:sanctum')->get('/paginate/textes-reglementaires', [TexteReglementaireController::class,'paginate']);
Route::middleware('auth:sanctum')->get('/types-textes-reglementaires',[DoctypeController::class,"typeTextes"]);
Route::middleware('auth:sanctum')->get('/types-correspondances',[DoctypeController::class,"typeCorrespondances"]);

Route::middleware('auth:sanctum')->get('/stats-1',[StatController::class,"stat1"]);
Route::middleware('auth:sanctum')->get('/stats-2',[StatController::class,"stat2"]);
Route::middleware('auth:sanctum')->get('/stats-3',[StatController::class,"stat3"]);

Route::middleware('auth:sanctum')->get('/abstract',[StatController::class,"abstractStat"]);//abstract

Route::middleware('auth:sanctum')->post('/texte-update',[TexteReglementaireController::class,"update"]);
