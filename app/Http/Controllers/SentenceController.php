<?php

namespace App\Http\Controllers;

use App\Models\Sentence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SentenceController extends Controller
{
    public function saveSentence(Request $request){

        $request->validate([
            'text' => ['required', 'min:5', 'unique:sentences']
        ]);

        $sentence = new Sentence();
        $sentence->user_id = Auth::id();
        $sentence->text = $request->text;
        $sentence->predict = $request->predict;
        $sentence->positive = $request->positive;
        $sentence->negative = $request->negative;
        $sentence->neutral = $request->neutral;

        $success = $sentence->save();
        if($success) return to_route('home')->with('message', 'Kalimat telah berhasil disimpan');
    }
}
