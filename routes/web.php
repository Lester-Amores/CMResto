<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('home', ['name' => 'User']);
})->name('home'); 

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
});
