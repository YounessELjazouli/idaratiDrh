<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Correspondance extends Model
{
    use HasFactory;
    protected $fillable = ['reference', 'date', 'objet', 'type', 'file'];

    public function doctype(){
        return $this->belongsTo(Doctype::class);
    }
}



