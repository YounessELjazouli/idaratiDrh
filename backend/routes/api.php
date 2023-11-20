<?php

use App\Http\Controllers\CorrespondanceController;
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
Route::post('/logout',[UserController::class,'logout']);
Route::post('/check-login', [UserController::class,'checkLogin'])->name('checkLogin.api');
Route::resource('textes-reglementaires', TexteReglementaireController::class);
Route::resource('correspondances', CorrespondanceController::class);