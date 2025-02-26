<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\DashBoardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['web'])->group(function () {
    // Public Routes
    Route::get('/login', [UserController::class, 'loginPage'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/', [UserController::class, 'sendName']);

    // Authenticated Routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [DashBoardController::class, 'index'])->name('auth.dashboard');
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });
});
