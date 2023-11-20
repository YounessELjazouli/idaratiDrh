<?php
// Dans le fichier de migration, par exemple, create_textes_reglementaires_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTextesReglementairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('textes_reglementaires', function (Blueprint $table) {
            $table->id();
            $table->string('qualite_texte', 20);
            $table->text('sujet');
            $table->text('ref');
            $table->date('date');
            $table->text('texte');
            // Ajoutez d'autres colonnes si nécessaire
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('textes_reglementaires');
    }
}


