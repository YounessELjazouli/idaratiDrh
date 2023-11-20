<?php 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCorrespondancesTable extends Migration
{
    public function up()
    {
        Schema::create('correspondances', function (Blueprint $table) {
            $table->id();
            $table->string('reference', 20);
            $table->date('date');
            $table->string('objet');
            $table->text('file');
            $table->unsignedBigInteger('doctype_id');
            $table->foreign('doctype_id')->references('id')->on('doctypes'); 
            $table->timestamps(); // Ajoute des colonnes created_at et updated_at automatiquement
        });
    }

    public function down()
    {
        Schema::dropIfExists('correspondances');
    }
}