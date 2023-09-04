<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Dashboard');
    }

    public function sentence(){
        return Inertia::render('Admin/Sentence');
    }

    public function detailSentence($user_id){
        return Inertia::render('Admin/DetailSentence');
    }

    public function user(){
        return Inertia::render('Admin/User');
    }
}
