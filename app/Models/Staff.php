<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'birthdate', 'start_date', 'phone', 'address',
        'position_id', 'salary', 'employment_status', 'emergency_contact',
        'gender'
    ];

    protected $casts = [
        'birthdate' => 'date',
        'start_date' => 'date',
    ];
}
