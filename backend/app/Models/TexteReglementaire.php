<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TexteReglementaire extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'id',
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
    public $timestamps = true; // Si votre table n'a pas de colonnes created_at et updated_at

    public function doctype(){
        return $this->belongsTo(Doctype::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }


}