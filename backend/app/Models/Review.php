<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{

    protected $fillable = ['ratedValue', 'name', 'title', 'email', 'description', 'base64Image'];
    use HasFactory;
}
