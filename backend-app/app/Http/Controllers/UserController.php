<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return User::select('id', 'name','lastname','email','password','phone','address','userType')->get();
    }

    public function login(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
    
        // Find the user by email
        $user = User::where('email', $request->email)->first();

        if ($user && $request->password === $user->password) {
            
            $location = Location::where('id', $request->locationid)->get();

            if ($location && $user) {
                $user = User::where('email', $request->email)->with("location")->first();
                
                return response()->json([
                    'message' => 'Login successful',
                    'user' => $user
                ],200); 
            }

            return response()->json([
                'message' => 'Login successful',
                'user' => $user
            ], 200); // HTTP status code 200 for "OK"
        }

        return response()->json([
            'message' => 'Invalid email or password'
        ]); // HTTP status code 401 for "Unauthorized"
    }
    
    public function store(Request $request)
    {
        if (!$request->coords) {
            return response()->json([
                'message' => 'Location not found try later !'
            ], 400);
        }

        // Validate incoming request data
        $request->validate([
            'name' => 'nullable',
            'email' => 'nullable|email',
            'lastname' => 'nullable',
            'password' => 'nullable',
            'phone' => 'nullable',
            'address' => 'nullable',
            'userType' => 'nullable'
        ]);
    
        // Check if email already exists
        if ($request->email && User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email already exists'
            ], 400); // HTTP status code 400 for "Bad Request"
        }
    
        // Check if phone already exists
        if ($request->phone && User::where('phone', $request->phone)->exists()) {
            return response()->json([
                'message' => 'Phone number already exists'
            ], 400); // HTTP status code 400 for "Bad Request"
        }

            $user = User::create([
                'name' => $request->name,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => $request->password,
                'phone' => $request->phone,
                'address' => $request->address,
                'userType' => $request->userType
            ]);
    
            $position = Location::create([
                'userid' => $user->id,
                'latitude' => request()->coords['latitude'],
                'longitude' => request()->coords['longitude']
            ]);

            if (!$position) {
                return response()->json([
                    'user' => $user,
                    'message' => 'Error creating location !'
                ], 400);
            }

            return response()->json([
                'message' => 'User added successfully',
                'user' => $user
            ]);
    }


        public function show(User $user)
    {
        return response()->json([
            'user' => $user,
            'message' => "Account created successfully"
        ],201);
    }

    public function update(Request $request)
    {
        $user = User::find($request->id);
        if (!$user) {
            return response()->json([
                'message' => $user
            ], 404);
        }

        $request->validate([
            'name' => 'nullable',
            'email' => 'nullable|email',
            'lastname' => 'nullable',
            'password' => 'nullable',
            'phone' => 'nullable',
            'address' => 'nullable',
            'userType' => 'nullable'
        ]);
    
        if ($request->email && $request->email!==$user->email && User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email already exists'
            ], 400);
        }else{
            $user->email = $request->email;
        }
    
        if ($request->phone && $request->phone!==$user->phone && User::where('phone', $request->phone)->exists()) {
            return response()->json([
                'message' => 'Phone number already exists'
            ], 400);
        }else{
            $user->phone = $request->phone;
        }

    
        if ($request->filled('name')) {
            $user->name = $request->name;
        }
        if ($request->filled('userType')) {
            $user->userType = $request->userType;
        }
    
        if ($request->filled('password') && $request->filled('password')!="") {
            $user->password = $request->password;
        }
    
        if ($request->filled('lastname')) {
            $user->lastname = $request->lastname;
        }
    
        $user ->update();
        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'message' => 'user deleted successfully'
        ]);

    }
}
