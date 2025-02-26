<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function sendName() 
    {
        $name = 'lester'; 
        return Inertia::render('home', ['name' => $name]);
    }

    public function loginPage()
    {
        return Inertia::render('login');
    }
}
