<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Correspondance extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['reference', 'date', 'objet', 'type', 'file'];

    public function doctype(){
        return $this->belongsTo(Doctype::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
}



