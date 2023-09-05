<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sentence>
 */
class SentenceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $init = 100;
        $radical = $init - random_int(5, 90);
        $unradical = $init - $radical;
        $predict = ($radical > $unradical) ? 'radical' : 'unradical';
        return [
            'text' => fake()->sentence(30),
            'predict' => $predict,
            'radical' => $radical,
            'unradical' => $unradical
        ];
    }
}
