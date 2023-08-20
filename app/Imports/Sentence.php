<?php

namespace App\Imports;

use App\Models\Sentence as ModelsSentence;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;

class Sentence implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $sentences = $collection->map(function($row){
            return $row[0];
        })->filter()->toArray();

        foreach ($sentences as $sentence) {
            ModelsSentence::create([
                'user_id' => Auth::id(),
                'text' => $sentence
            ]);
        }
    }
}
