<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        return Inertia::render('Home');
    }

    public function about(){
        return Inertia::render('About');
    }

    public function contact(){
        return Inertia::render('Contact');
    }
}
