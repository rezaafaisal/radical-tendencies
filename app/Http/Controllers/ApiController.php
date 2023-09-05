<?php

namespace App\Http\Controllers;

use App\Models\Sentence;
use App\Models\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function sentences(Request $request){
        $show = $request->show;
        $keyword = $request->keyword;
        $data = User::where('name', 'like', '%'.$keyword.'%')->paginate($show)->onEachSide(0);
        $data->getCollection()->transform(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'radical' => $user->sentences->where('predict', 'radical')->count(),
                'unradical' => $user->sentences->where('predict', 'unradical')->count(),
                'count' => $user->sentences->count()
            ];
        });
        return response($data, 200);
    }

    public function users(Request $request){
        $show = $request->show;
        $keyword = $request->keyword;
        $data = User::where('name', 'like', '%'.$keyword.'%')->orderBy('name')->paginate($show)->onEachSide(0);

        if($data) return response($data, 200);
        return response('Gagal', 400);
    }
}
