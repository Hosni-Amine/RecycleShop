<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\Admin::factory()->create([
             'username' => 'admin',
             'email' => 'admin@example.com',
             'password'=>'admin'
         ]);
         \App\Models\Client::factory()->create([
            'name' => 'client',
            'username'=>'client1',
            'email'=>'client@client.com',
            'password'=>'client',
            'address'=>'citee qjnjnqsnqsoioqis',
            'phone'=>'22347147'

        ]);
    }
}
