<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('products',[ProductController::class,'index']);
Route::post('products',[ProductController::class,'store']);
Route::get('productsBySeller/{id}',[ProductController::class,'productsBySeller']);
Route::put('products/{id}',[ProductController::class,'update']);
Route::delete('products/{id}', [ProductController::class, 'destroy']);

Route::post('/location', [LocationController::class, 'store']);
Route::get('/location/{id}', [LocationController::class, 'show']);
Route::get('/location', [LocationController::class, 'index']);
Route::post('/updatelocation', [LocationController::class, 'update']);
Route::delete('/location/{id}', [LocationController::class, 'destroy']);
Route::delete('/locationbyuser/{id}', [LocationController::class, 'destroyuserlocation']);

Route::get('users', [UserController::class,'index']);
Route::get('users', [UserController::class,'index']);
Route::post('login', [UserController::class,'login']);
Route::post('register',[UserController::class,'store']);
Route::post('updateuser',[UserController::class,'update']);
Route::delete('users/{id}',[UserController::class,'destroy']);
Route::get('https://www.gps-coordinates.net');

Route::get('getOrderById/{id}', [OrderController::class,'getOrderById']);
Route::get('orders', [OrderController::class,'index']);
Route::get('orders/{id}', [OrderController::class,'index']);
Route::get('ordersBySeller/{id}', [OrderController::class,'orderBySeller']);
Route::get('ordersByClient/{id}', [OrderController::class,'orderByClient']);
Route::post('orders',[OrderController::class,'store']);
Route::put('orders/{id}',[OrderController::class,'update']);
Route::delete('orders/{id}',[OrderController::class,'destroy']);
Route::post('approveOrder/{id}',[OrderController::class,'approveOrder']);
Route::get('getAllorders',[OrderController::class,'getAllorders']);

