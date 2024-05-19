<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    
    protected $fillable = ['sellerid','name','description','quantity','image','category','price'];
    
    public function seller()
    {
        return $this->belongsTo(User::class, 'sellerid');
    }
    public function orders()
    {
        return $this->hasMany(Order::class, 'productid');
    }
}