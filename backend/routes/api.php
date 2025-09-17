<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
// 🔹 Routes publiques (pas besoin de token)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
