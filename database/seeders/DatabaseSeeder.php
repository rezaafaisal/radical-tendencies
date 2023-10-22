<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Sentence;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(50)->has(
        //     Sentence::factory(random_int(10, 50))
        // )->create();

        User::create([
                'name' => 'Admin Putri',
                'email' => 'admin@gmail.com',
                'avatar' => 'user.jpg',
                'level' => 'admin',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
            ],
        );
        User::create([
                'name' => 'Putri Buana',
                'email' => 'putri@gmail.com',
                'avatar' => 'user.jpg',
                'level' => 'user',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
            ],
        );
    }
}
