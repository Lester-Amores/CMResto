<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function sendName() 
    {
        $name = 'lester'; 
        return Inertia::render('Home', ['name' => $name]);
    }

    public function loginPage()
    {
        if (auth()->check()) {
            return Inertia::location(route('auth.dashboard'));
        }
        return Inertia::render('Login');
    }
}
