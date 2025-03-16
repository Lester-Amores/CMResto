<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\DashBoardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware(['web'])->group(function () {

    Route::get('/', function () {
        return redirect()->route('login'); // Redirect to dashboard
    });

    // Public Routes
    Route::get('/login', [UserController::class, 'loginPage'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/home', [UserController::class, 'sendName'])->name('home');

    // Authenticated Routes
    Route::middleware(['auth'])->group(function () {
        Route::get('/dashboard', [DashBoardController::class, 'index'])->name('auth.dashboard');
        Route::post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    });
});
