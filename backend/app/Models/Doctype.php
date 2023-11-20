<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctype extends Model
{
    use HasFactory;

    public function correspondances(){
        return $this->hasMany(Correspondance::class);
    }

    public function textesreglementaires(){
        return $this->hasMany(TexteReglementaire::class);
    }

}
