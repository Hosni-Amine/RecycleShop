<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('buyerid');
            $table->foreign('buyerid')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('productid');
            $table->foreign('productid')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['productid']);
        });
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['buyerid']);
        });
    }
};
