<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TexteReglementaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'sujet',
        'ref',
        'date',
        'texte',
        'doctype_id'
        // Ajoutez d'autres colonnes si nécessaire
    ];
    protected $table = 'textes_reglementaires';
    public $incrementing = false;
    protected $keyType = 'integer';
    public $timestamps = false; // Si votre table n'a pas de colonnes created_at et updated_at

    public function doctype(){
        return $this->belongsTo(Doctype::class);
    }
}