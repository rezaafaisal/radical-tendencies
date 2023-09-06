<?php

use App\Http\Controllers\AdminController;
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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('masuk', [AuthController::class, 'login'])->name('login');
Route::post('masuk', [AuthController::class, 'check']);

Route::get('lupa-kata-sandi', [AuthController::class, 'forgot']);
Route::post('lupa-kata-sandi', [AuthController::class, 'requestReset']);
Route::get('setel-ulang-kata-sandi/{token}', [AuthController::class, 'resetPassword'])->name('resetPassword');

Route::get('daftar', [AuthController::class, 'register']);
Route::post('daftar', [AuthController::class, 'registering']);
Route::get('verifikasi-email', [AuthController::class, 'verifyEmail'])->name('verify');
Route::post('verifikasi-email', [AuthController::class, 'verifyingEmail']);
Route::post('kirim-ulang-verifikasi-email', [AuthController::class, 'resendVerifyEmail']);

// admin
Route::middleware('admin')->prefix('admin')->group(function(){
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    Route::get('kalimat', [AdminController::class, 'sentence'])->name('sentence');
    Route::get('kalimat/{user_id}', [AdminController::class, 'detailSentence'])->name('detailSentence');
    Route::get('pengguna', [AdminController::class, 'user'])->name('user');
    Route::get('pengguna/{user_id}', [AdminController::class, 'userDetail'])->name('userDetail');
    Route::post('pengguna/setel-kata-sandi', [AdminController::class, 'updatePassword']);
    Route::delete('pengguna/{user_id}', [AdminController::class, 'deleteUser']);
    Route::get('profil', [AdminController::class, 'profile']);
    Route::get('profil/akun', [AdminController::class, 'profileAccount']);
    Route::post('profil', [AdminController::class, 'updateProfile']);
});

// user
Route::middleware('user')->group(function(){
    Route::get('kalimat', [SentenceController::class, 'predicted'])->name('predicted');
    Route::get('kalimat/belum-terprediksi', [SentenceController::class, 'unPredicted'])->name('unPredicted');
    Route::delete('kalimat/{id}', [SentenceController::class, 'deleteSentence'])->name('deleteSentence');
    Route::post('simpan', [SentenceController::class, 'saveSentence']);
    Route::put('perbarui', [SentenceController::class, 'updateSentence']);
    Route::post('impor', [SentenceController::class, 'import']);
    Route::get('export/{filename}', [SentenceController::class, 'export']);
    Route::get('profil', [HomeController::class, 'profile']);
    Route::get('profil/akun', [HomeController::class, 'profileAccount']);
    Route::post('profil', [HomeController::class, 'updateProfile']);
});
Route::get('keluar', [AuthController::class, 'logout'])->name('logout');