<?php

namespace App\Exports;

use App\Models\Sentence;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;

class SentenceExport implements FromCollection, WithHeadings, WithColumnWidths, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */

    
    public function collection()
    {
        $sentences = Sentence::select('text', 'predict', 'radical', 'unradical')->where('user_id', Auth::id())->whereNotNull('predict')->orderBy('predict')->get();
        $sentences = $sentences->map(function($row){
            return [
                'text' => $row->text,
                'predict' => ($row->predict == 'radical') ? 'Cenderung Radikal' : 'Tidak Radikal',
                'radical' => (string)$row->radical.'%', 
                'unradical' => (string)$row->unradical.'%', 
            ];
        });
        
        return $sentences;
    }

    public function headings(): array
    {
        return ["Kalimat", "Prediksi", "Cenderung Radikal", "Tidak Radikal"];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 80,          
        ];
    }
}
