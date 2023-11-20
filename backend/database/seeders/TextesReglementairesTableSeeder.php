<?php


namespace Database\Seeders;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use App\Models\TexteReglementaire;
use Faker\Factory as Faker;

class TextesReglementairesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 100; $i++) {
            TexteReglementaire::create([
                'numero_serie' => $faker->unique()->randomNumber,
                'qualite_texte' => $faker->word,
                'sujet' => $faker->sentence,
                'ref' => $faker->word,
                'date' => $faker->date,
                'texte' => $faker->paragraph,
            ]);
        }
    }
}

