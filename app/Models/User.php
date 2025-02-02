<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'phone',
        'role_id',
        'email',
        'password',
        'company_id',
        'date_of_birth',          // Added date of birth
        'nationality',            // Added nationality
        'current_location',       // Added current location
        'preferred_countries',    // Added preferred countries
        'work_experience',        // Added work experience
        'education',              // Added education
        'languages',              // Added languages
        'passport_number',        // Added passport number
        'cv',                     // Added CV
        'cover_letter',           // Added cover letter
        'references',             // Added references
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function company(){
        return $this->hasOne('App\Models\Company', 'id', 'company_id');
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'date_of_birth' => 'date',      // Cast to date
        'preferred_countries' => 'array', // Cast to array if storing as JSON or array
    ];
}
