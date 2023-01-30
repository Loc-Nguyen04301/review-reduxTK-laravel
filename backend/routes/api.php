<?php

use Illuminate\Http\Request;
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


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/refresh', [UserController::class, 'refresh']);
    Route::get('/user-profile', [UserController::class, 'userProfile']);
    Route::post('/change-pass', [UserController::class, 'changePassWord']);
});
