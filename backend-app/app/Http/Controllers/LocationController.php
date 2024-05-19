<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;

class LocationController extends Controller
{

    public function index()
    {
       return Location::select('longitude','latitude','userid')->get();

    }
    public function store(Request $request)
    {
        $request->validate([
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'userid' => 'nullable|integer'
        ]);
    $user = User::find($request->userid);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $location = Location::create([
            'longitude' => $request->longitude,
            'latitude' => $request->latitude,
            'userid' => $request->userid
        ]);

        return response()->json(['message' => 'Location created successfully', 'location' => $location], 201);
    }

    public function update(Request $request)
    {
        $request->validate([
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'userid' => 'nullable|integer'
        ]);
        $location = Location::find($request->userid);
            if (!$location) {
                $location = Location::create([
                    'longitude' => $request->longitude,
                    'latitude' => $request->latitude,
                    'userid' => $request->userid
                ]);
                return response()->json(['message' => 'Location created successfully', 'location' => $location], 201);          
            }
            else{
                $location->longitude = $request->longitude;
                $location->latitude = $request->latitude;
                $location->save();
                return response()->json(['message' => 'Location updated successfully', 'location' => $location], 201);          
            }
    }

    public function show($id)
    {
        $location = Location::findOrFail($id);
        return response()->json(['location' => $location], 200);
    }


    public function destroy($id)
    {
        $location = Location::findOrFail($id);
        $location->delete();

        return response()->json(['message' => 'Location deleted successfully'], 200);
    }
    public function destroyuserlocation($id)
    {
        $user = User::with('product', 'buyer','locationid')->find($id);

    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $location = Location::findOrFail($user->locationid);

        $location->delete();

        return response()->json(['message' => 'Location deleted successfully'], 200);
    }
}
