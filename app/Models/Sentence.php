<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sentence extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['user_id', 'text', 'percentage', 'description'];

    protected function text() : Attribute {
        return Attribute::make(
            set: fn (string $value) => strtolower($value),
        );
    }

    protected function description() : Attribute{
        return Attribute::make(
            set: fn(string $value) => strtolower($value),
        );
    }
}
