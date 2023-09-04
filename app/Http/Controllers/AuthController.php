<?php

namespace App\Http\Controllers;

use App\Mail\RequestReset;
use App\Mail\ResetPassword;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Mail\VerifyMail;
use App\Models\ActiveRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(){
        return Inertia::render('Auth/Login');
    }

    public function check(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:4']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            if(Auth::user()->level == 'admin') return redirect()->route('dashboard');
            return redirect()->route('home');
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function register(){
        return Inertia::render('Auth/Register');
    }

    public function registering(Request $request){
        $request->validate([
            'fullname' => ['required', 'min:3'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed']
        ]);

        $code = Crypt::encryptString(random_int(100000, 999999));

        $data = [
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        
        Mail::to($request->email)->send(new VerifyMail([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'code' => $code
        ]));
        
        Session::put('user', $data);
        Session::put('expired',  Carbon::now()->addMinutes(10)->format('d M Y H:i'));
        Cookie::queue('code', $code, 10);

        return to_route('verify');
    }

    public function forgot(){
        return Inertia::render('Auth/Forgot', []);
    }

    public function requestReset(Request $request){
        $request->validate([
            'email' => ['required', 'email']
        ]);
        
        // check if email exist
        if(!User::where('email', $request->email)->exists()){
            return back()->withErrors([
                'email' => 'Email belum terdaftar, silahkan buat akun baru saja ygy :)',
                ])->onlyInput('email');
        }

        // make request token
        $token = $this->randomStrings(20);
        $active_request = new ActiveRequest();
        $active_request->email = $request->email;
        $active_request->token = $token;
        $success = $active_request->save();

        if($success){
            Mail::to($request->email)->send(new RequestReset([
                'fullname' => $request->name,
                'email' => $request->email,
                'link' => route('resetPassword', ['token' => $token])
            ]));
            return to_route('login')->with('message', 'Konfirmasi setel ulang kata sandi Akun anda pada email '.$request->email.' untuk menyetel ulang kata sandi');
        }
        return back()->with('message', 'Terjadi kesalahan');

    }
    
    public function resetPassword($token){
        if(!ActiveRequest::where('token', $token)->exists()){
            to_route('login')->with('message', 'Link konfirmasi untuk menyetel ulang kata sandi sudah kadaluarsa :(');
        }
        $new_password = $this->randomStrings(8);
        $active_request = ActiveRequest::where('token', $token)->first();
        $user = User::where('email', $active_request->email)->first();
        $user->password = Hash::make($new_password);
        $success = $user->save();
        
        if($success){
            // send mail
            Mail::to($user->email)->send(new ResetPassword([
                'fullname' => $user->name,
                'email' => $user->email,
                'password' => $new_password
            ]));
            // delete token in database
            ActiveRequest::where('token', $token)->delete();
            // redirect
            return to_route('login')->with('message', 'Kata sandi untuk email '.$user->email.' telah disetel ulang, gunakan kata sandi yang dikirim melalui email anda');
        }
    }
    
    public function verifyEmail(){
        if(!Session::get('user')) return redirect()->back();

        $expired = Session::get('expired');

        return Inertia::render('Auth/Verify', [
            'expired' => $expired,
            'email' => Session::get('user')['email']
        ]);
    }
    public function verifyingEmail(Request $request){
        $request->validate([
            'verification_code' => ['required', 'digits:6']
        ]);

        $data = Session::get('user');
        $code = Crypt::decryptString(Cookie::get('code'));
        if($code === $request->verification_code){
            $user = new User();
            $user->name = $data['fullname'];
            $user->email = $data['email'];
            $user->password = $data['password'];
            $success = $user->save();
            if($success){
                Session::forget(['user', 'expired']);
                Cookie::forget('code');
                return to_route('login')->with('message', 'Akun berhasil dibuat dengan email '.$data['email'].', silahkan masuk menggunakan akun tersebut');
            }
        }

        return back()->withErrors([
            'verification_code' => 'Kode tidak sama, silahkan cek email anda',
        ]);
    }

    public function resendVerifyEmail(){
        $data = Session::get('user');
        $code = Crypt::encryptString(random_int(100000, 999999));
        Mail::to($data['email'])->send(new VerifyMail([
            'fullname' => $data['fullname'],
            'email' => $data['email'],
            'code' => $code
        ]));
        
        Session::put('expired',  Carbon::now()->addMinutes(10)->format('d M Y H:i'));
        Cookie::queue('code', $code, 10);

        return to_route('verify');
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }

    private function randomStrings($length){
        // String of all alphanumeric character
        $str_result = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        // Shuffle the $str_result and returns substring
        // of specified length
        return substr(str_shuffle($str_result), 0, $length);
    }
}
