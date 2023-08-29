<?php

namespace App\Exports;

use App\Models\Sentence;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class SentenceExport implements FromCollection, WithHeadings, WithColumnWidths
{
    /**
    * @return \Illuminate\Support\Collection
    */

    
    public function collection()
    {
        return Sentence::select('text', 'predict')->where('user_id', Auth::id())->whereNotNull('predict')->get();
    }

    public function headings(): array
    {
        return ["Kalimat", "Prediksi"];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 80,
            'B' => 30,            
        ];
    }
}
