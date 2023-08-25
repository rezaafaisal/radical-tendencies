<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Sentence;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){
        return Inertia::render('Home');
    }

    public function sentences(){
        $sentences = Sentence::where('user_id', Auth::id())->get();
        return Inertia::render('Sentence', [
            'sentences' => $sentences
        ]);
    }


    public function profile(){
        $user = Auth::user();
        return Inertia::render('Profile', [
            'user' => $user,
            'isAccount' => false
        ]);
    }

    public function profileAccount(){
        $user = Auth::user();
        return Inertia::render('Profile', [
            'user' => $user,
            'isAccount' => true
        ]);
    }

    public function updateProfile(Request $request){
        $user = User::find(Auth::id());
        if($request->is_account){
            $request->validate([
            'password' => ['required', 'min:5', 'confirmed']
            ]);

            $user->password = Hash::make($request->password);
            $success = $user->save();
            if($success) return redirect()->back()->with('message', 'Password berhasil di perbarui');
        }

        $request->validate([
            'name' => ['required', 'min:3']
        ]);
        if($user->name == $request->name) return redirect()->back()->withErrors(['name' => 'Namanya kok nda berubah :)']);
        $user->name = $request->name;
        $success = $user->save();

        if($success) return redirect()->back()->with('message', 'Data berhasil di perbarui');

    }

    public function about(){
        return Inertia::render('About');
    }

    public function contact(){
        return Inertia::render('Contact');
    }
}
