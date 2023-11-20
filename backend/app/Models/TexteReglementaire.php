<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TexteReglementaire extends Model
{
    use HasFactory;

    protected $fillable = [
        'numero_serie',
        'qualite_texte',
        'sujet',
        'ref',
        'date',
        'texte',
        // Ajoutez d'autres colonnes si nécessaire
    ];
    protected $table = 'textes_reglementaires';
    protected $primaryKey = 'numero_serie';
    public $incrementing = false;
    protected $keyType = 'integer';
    public $timestamps = false; // Si votre table n'a pas de colonnes created_at et updated_at

    public function doctype(){
        $this->belongsTo(Doctype::class);
    }
}