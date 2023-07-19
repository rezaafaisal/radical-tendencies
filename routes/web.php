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

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('masuk', [AuthController::class, 'login'])->name('login');
Route::post('masuk', [AuthController::class, 'check']);


Route::get('keluar', [AuthController::class, 'logout'])->name('logout');
Route::post('simpan', [SentenceController::class, 'saveSentence']);

Route::get('about', [HomeController::class, 'about']);
Route::get('contact', [HomeController::class, 'contact']);