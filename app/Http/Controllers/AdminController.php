<?php

namespace App\Http\Controllers;

use App\Models\Sentence;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
        $sentences = Sentence::with('user')->whereNotNull('predict')->orderBy('updated_at', 'desc')->take(10)->get();
        $sentences = $sentences->map(function($row){
            return [
                'name' => $row->user->name,
                'email' => $row->user->email,
                'avatar' => asset('avatar/'.$row->user->avatar),
                'text' => $row->text,
                'predict' => $row->predict,
                'date' => Carbon::parse($row->updated_at)->format('d M Y, H:i').' WITA',
            ];
        });
        return Inertia::render('Admin/Dashboard', [
            'counts' => [
                'user' => User::whereNot('level', 'admin')->count(),
                'sentence' => Sentence::count(),
                'radical' => Sentence::where('predict', 'radical')->count(),
                'unradical' => Sentence::where('predict', 'unradical')->count(),
            ],
            'sentences' => $sentences
        ]);
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
