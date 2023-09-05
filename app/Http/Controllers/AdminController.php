<?php

namespace App\Http\Controllers;

use App\Models\Sentence;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

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
        $user = User::find($user_id);
        $sentences = Sentence::where('user_id', $user_id)->paginate(25);

        return Inertia::render('Admin/DetailSentence', [
            'user' => $user,
            'sentences' => $sentences
        ]);
    }

    public function user(){
        return Inertia::render('Admin/User');
    }

    public function userDetail($user_id){
        $user = User::find($user_id);
        $data = [
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'registered' => Carbon::parse($user->created_at)->format('d M Y, H:i').' WITA',
            'login' => (is_null($user->last_login) ) ? 'Belum pernah login' :  Carbon::parse($user->last_login)->format('d M Y, H:i').' WITA',
            'sentences' => $user->sentences->count(),
            'predicts' => $user->sentences->whereNotNull('predict')->count(),
            'radical' => $user->sentences->where('predict', 'radical')->count(),
            'unradical' => $user->sentences->where('predict', 'unradical')->count(),
        ];
        return Inertia::render('Admin/UserDetail', [
            'user' => $data
        ]);
    }
}
