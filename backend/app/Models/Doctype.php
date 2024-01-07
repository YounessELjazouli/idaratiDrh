<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Doctype extends Model
{
    use HasFactory;
    use SoftDeletes;
    public function correspondances(){
        return $this->hasMany(Correspondance::class);
    }

    public function textesreglementaires(){
        return $this->hasMany(TexteReglementaire::class);
    }

}
