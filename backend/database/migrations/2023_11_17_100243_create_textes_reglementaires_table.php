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
            $table->text('sujet');
            $table->text('ref');
            $table->date('date');
            $table->text('texte');
            $table->unsignedBigInteger('doctype_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            

            $table->foreign('doctype_id')->references('id')->on('doctypes')->onDelete('set null');            // Ajoutez d'autres colonnes si nécessaire
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');             // Ajoutez d'autres colonnes si nécessaire
            
            $table->timestamps(); // Ajoute des colonnes created_at et updated_at automatiquement

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


