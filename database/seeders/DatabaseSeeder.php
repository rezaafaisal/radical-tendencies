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
        User::factory(50)->has(
            Sentence::factory(random_int(10, 50))
        )->create();

        User::insert(
            [
                'name' => 'Andi Engku Putribuana',
                'email' => 'test@example.com',
                'avatar' => 'user.jpg',
                'level' => 'admin',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
            ],
            [
                'name' => 'Jake Sully',
                'email' => 'jake@example.com',
                'avatar' => 'user.jpg',
                'level' => 'user',
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
            ],
        );
    }
}
