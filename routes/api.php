<?php

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

Route::group(['prefix'=>'auth','namespace'=>'auth','as'=>'auth.'],function (){
    Route::post('login',[\App\Http\Controllers\api\auth\indexController::class,'login'])->name('login');
    Route::post('register',[\App\Http\Controllers\api\auth\indexController::class,'register'])->name('register');

    Route::group(["prefix"=>"forget","namespace"=>"forget","as"=>"forget."],function (){
        Route::post("",[\App\Http\Controllers\api\forget\indexController::class,"getPassword"])->name("getPassword");
        Route::post("resetpassword",[\App\Http\Controllers\api\forget\indexController::class,"resetPassword"])->name("resetPassword");
    });

    Route::get("user",[\App\Http\Controllers\api\user\indexController::class,"index"])->name("user")->middleware("auth:api");
});
