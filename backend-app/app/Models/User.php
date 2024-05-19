<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
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
        'lastname',
        'email',
        'password',
        'phone',
        'address',
        'locationid',
        'userType'
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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    public function products()
    {
        return $this->belongsTo(Product::class, 'productid');
    }
    
    public function boughtOrders()
    {
        return $this->hasMany(Order::class, 'buyerid');
    }

    public function soldOrders()
    {
        return $this->hasMany(Order::class, 'sellerid');
    }
    public function location()
    {
        // Assuming 'id' is the foreign key in the locations table referencing the id in the users table
        return $this->hasOne(Location::class,'userid');
    }
}
