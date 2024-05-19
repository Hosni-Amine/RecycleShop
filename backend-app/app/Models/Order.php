<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['buyerid','productid','sellerid','quantity','status','price'];

    public function product()
    {
        return $this->belongsTo(Product::class, 'productid');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyerid');
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'sellerid');
    }
}