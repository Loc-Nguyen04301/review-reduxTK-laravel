<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/;

Route::post("/create", [ReviewController::class, 'store']);
Route::get('/readOne/{id}', [ReviewController::class, 'show']);
Route::get("/readAll", [ReviewController::class, 'index']);
Route::get("/readAllBySearch/{search}", [ReviewController::class, 'getAllBySearch']);
Route::put("/update/{id}", [ReviewController::class, 'update']);
Route::delete("/delete/{id}", [ReviewController::class, 'destroy']);
Route::delete("/deleteAll", [ReviewController::class, 'destroyAll']);


Route::post("/register", [UserController::class, 'register']);
Route::post("/login", [UserController::class, 'login']);
// all the incoming requests are authenticated
//Route::group(['middleware' => 'auth:sanctum'], function () {
//    Route::post('/logout', [UserController::class, 'logout']);
//    Route::post('/me', [UserController::class, 'me']);
//});
