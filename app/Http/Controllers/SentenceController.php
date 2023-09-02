<?php

namespace App\Http\Controllers;

use App\Exports\SentenceExport;
use Inertia\Inertia;
use App\Models\Sentence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\Sentence as ImportsSentence;

class SentenceController extends Controller
{
    public function predicted(){
        if(!Auth::user()) return to_route('home');
        return Inertia::render('Sentence', [
            'sentences' => Sentence::where('user_id', Auth::id())->where('predict', '!=', null)->orderBy('created_at', 'DESC')->paginate(25)->onEachSide(0),
            'is_predicted' => true
        ]);
    }
    public function unPredicted(){
        if(!Auth::user()) return to_route('home');
        return Inertia::render('Sentence', [
            'sentences' => Sentence::where(['user_id' => Auth::id(), 'predict' => null])->paginate(25)->onEachSide(0),
            'is_predicted' => false
        ]);
    }

    public function import(Request $request){
        $request->validate([
            'file' => ['required', 'mimes:xlsx,csv', 'max:1024'],
        ]);

        $success = Excel::import(new ImportsSentence, $request->file);

         if($success) return redirect()->back()->with('message', 'Kalimat berhasil diunggah');
    }

    public function export(Request $request){
        return Excel::download(new SentenceExport, $request->filename.'.xlsx');
    }
    
    public function saveSentence(Request $request){
        $request->validate([
            'text' => ['required', 'min:5', 'unique:sentences']
        ]);

        $sentence = new Sentence();
        $sentence->user_id = Auth::id();
        $sentence->text = $request->text;
        $sentence->predict = $request->predict;
        $sentence->radical = $request->radical;
        $sentence->unradical = $request->unradical;

        $success = $sentence->save();
        if($success) return to_route('home')->with('message', 'Kalimat telah berhasil disimpan');
    }

    public function updateSentence(Request $request){
        $sentence = Sentence::find($request->id);
        $sentence->predict = $request->predict;
        $sentence->radical = $request->radical;
        $sentence->unradical = $request->unradical;

        $success = $sentence->save();
        if($success) return redirect()->back()->with('message', 'Kalimat telah berhasil diprediksi, buka tab "Sudah Diprediksi" untuk melihat kalimat');
    }

    public function deleteSentence($id){
        $sentence = Sentence::find($id);

        $success = $sentence->delete();
        if($success) return redirect()->back()->with('message', 'Kalimat berhasil dihapus');
    }
}
