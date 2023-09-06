<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Sentence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

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

    public function profile(){
        $user = Auth::user();
        return Inertia::render('Admin/Profile', [
            'user' => $user,
            'isAccount' => false
        ]);
    }

    public function profileAccount(){
        $user = Auth::user();
        return Inertia::render('Admin/Profile', [
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
            
            if($user->avatar != 'user.jpg') Storage::delete('avatar/'.$user->avatar);
            
            $image = $request->image;
            $filename = md5(Carbon::now()->format('YmdHis')).'.'.$image->extension();
            Storage::putFileAs('avatar', $image, $filename);
            $user->avatar = $filename;
        }
        $user->name = $request->name;
        $success = $user->save();

        if($success) return redirect()->back()->with('message', 'Data berhasil di perbarui');
    }

    public function updatePassword(Request $request){
        $request->validate([
            'password' => ['required', 'min:8', 'confirmed'],
        ]);

        $success = User::find($request->id)->update([
            'password' => Hash::make($request->password)
        ]);

        if($success) return redirect()->back()->with('message', 'Kata sandi pengguna berhasil diperbarui');
        return redirect()->back()->withErrors('message', 'Kata sandi pengguna gagal diperbarui');
    }

    public function deleteUser($user_id){
        $success =  User::find($user_id)->delete();

        if($success) return redirect()->back()->with('message', 'Pengguna berhasil dihapus');
        return redirect()->back()->withErrors('message', 'Pengguna gagal dihapus');
    }
}
