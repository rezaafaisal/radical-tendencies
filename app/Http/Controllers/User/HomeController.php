<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Sentence;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index(){
        if(Auth::user()?->level == 'admin') return redirect()->route('dashboard');

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
            'avatar' => '/avatar/'.$user->avatar,
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
            'name' => ['required', 'min:3'],
            'image' => ['nullable', 'mimes:png,jpg,jpeg']
        ]);

        if($request->image){
            Storage::delete('avatar/'.$user->avatar);
            $image = $request->image;
            $filename = md5(Carbon::now()->format('YmdHis')).'.'.$image->extension();
            Storage::putFileAs('avatar', $image, $filename);
            $user->avatar = $filename;
        }
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
