<?php

namespace Database\Seeders;

use App\Models\Doctype;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DoctypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Doctype::create([
            "nom" => "Loi",
            "type" => "refs"
        ]);
        Doctype::create([
            "nom" => "Dahir",
            "type" => "refs"
        ]);
        Doctype::create([
            "nom" => "Décret",
            "type" => "refs"
        ]);
        Doctype::create([
            "nom" => "Patrouille",
            "type" => "refs"
        ]);
        Doctype::create([
            "nom" => "Publication",
            "type" => "refs"
        ]);
        Doctype::create([
            "nom" => "Exportations",
            "type" => "textes"
        ]);
        Doctype::create([
            "nom" => "Importations",
            "type" => "textes"
        ]);
    }
}
