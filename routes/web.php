<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SentenceController;
use App\Http\Controllers\User\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('tes', function(){
    return Inertia::render('Tes');
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('masuk', [AuthController::class, 'login'])->name('login');
Route::post('masuk', [AuthController::class, 'check']);
Route::get('daftar', [AuthController::class, 'register']);
Route::post('daftar', [AuthController::class, 'registering']);
Route::get('verifikasi-email', [AuthController::class, 'verifyEmail'])->name('verify');
Route::post('verifikasi-email', [AuthController::class, 'verifyingEmail']);
Route::post('kirim-ulang-verifikasi-email', [AuthController::class, 'resendVerifyEmail']);


// sentence
Route::get('kalimat', [SentenceController::class, 'index'])->name('sentence');
Route::delete('kalimat/{id}', [SentenceController::class, 'deleteSentence'])->name('deleteSentence');
Route::post('simpan', [SentenceController::class, 'saveSentence']);
Route::put('perbarui', [SentenceController::class, 'updateSentence']);
Route::post('impor', [SentenceController::class, 'import']);
Route::get('export', [SentenceController::class, 'export']);
Route::get('profil', [HomeController::class, 'profile']);
Route::get('profil/akun', [HomeController::class, 'profileAccount']);
Route::post('profil', [HomeController::class, 'updateProfile']);

Route::get('keluar', [AuthController::class, 'logout'])->name('logout');

Route::get('about', [HomeController::class, 'about']);
Route::get('contact', [HomeController::class, 'contact']);