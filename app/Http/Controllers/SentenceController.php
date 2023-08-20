<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sentence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SentenceController extends Controller
{
    public function index(){
        $sentences = Sentence::where('user_id', Auth::id())->get();
        return Inertia::render('Sentence', [
            'sentences' => $sentences
        ]);
    }

    public function import(Request $request){
        $request->validate([
            'file' => ['required', 'mimes:xls,xlsx,csv', 'max:1024'],
        ]);
    }
    
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

    public function deleteSentence($id){
        $success = Sentence::find($id)->delete();

        if($success) return to_route('sentence')->with('message', 'Kalimat berhasil dihapus');
    }
}
