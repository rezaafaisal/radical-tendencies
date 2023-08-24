<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sentence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\Sentence as ImportsSentence;

class SentenceController extends Controller
{
    public function index(){
        return Inertia::render('Sentence', [
            'sentences' => Sentence::where('user_id', Auth::id())->where('predict', '!=', null)->get(),
            'unpredict' => Sentence::where(['user_id' => Auth::id(), 'predict' => null])->get()
        ]);
    }

    public function import(Request $request){
        $request->validate([
            'file' => ['required', 'mimes:xlsx,csv', 'max:1024'],
        ]);

        $success = Excel::import(new ImportsSentence, $request->file);

         if($success) return redirect()->back()->with('message', 'File kallimat berhasil diunggah');
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
        $sentence->radical = $request->radical;
        $sentence->neutral = $request->neutral;

        $success = $sentence->save();
        if($success) return to_route('home')->with('message', 'Kalimat telah berhasil disimpan');
    }

    public function updateSentence(Request $request){
        $sentence = Sentence::find($request->id);
        $sentence->predict = $request->predict;
        $sentence->positive = $request->positive;
        $sentence->radical = $request->radical;
        $sentence->neutral = $request->neutral;

        $success = $sentence->save();
        if($success) return redirect()->back()->with('message', 'Kalimat telah berhasil diprediksi, buka tab "Sudah Diprediksi" untuk melihat kalimat');
    }

    public function deleteSentence($id){
        $success = Sentence::find($id)->delete();

        if($success) return to_route('sentence')->with('message', 'Kalimat berhasil dihapus');
    }
}
