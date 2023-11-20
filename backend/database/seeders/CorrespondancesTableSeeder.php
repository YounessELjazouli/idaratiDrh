<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Correspondance;

class CorrespondancesTableSeeder extends Seeder
{
    public function run()
    {
        for ($i = 0; $i < 100; $i++) {
            Correspondance::create([
                'reference' => 'REF' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'date' => now(),
                'objet' => 'Objet de test ' . ($i + 1),
                'type' => 'Type de test ' . ($i + 1),
                'file' => 'Chemin/vers/le/fichier' . ($i + 1),
            ]);
        }
    }
}