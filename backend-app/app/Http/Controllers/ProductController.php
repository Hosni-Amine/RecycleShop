<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::with('seller.location')->select('id', 'sellerid', 'name', 'description', 'quantity', 'image', 'category', 'price')->get();
    }

    public function store(Request $request)
{
    // Validate incoming request data
    $request->validate([
        'sellerid'=>'required',
        'name' => 'required',
        'description' => 'required',
        'quantity' => 'required',
        'image' => 'required|image',
        'category' => 'required',
        'price' => 'required'
    ]);

    $imageName = Str::random() . '.' . $request->image->getClientOriginalExtension();
    $request->image->storeAs('product', $imageName, 'public');
    $quantity = $request->input('quantity') ? (double)$request->input('quantity') : null;
    $price = (double)$request->input('price');

    $product = Product::create([
        'sellerid'=> $request->sellerid,
        'name' => $request->name,
        'description' => $request->description,
        'quantity' => $quantity,
        'image' => $imageName,
        'category' => $request->category,
        'price' => $price
    ]);

    return response()->json([
        'message' => 'Item added successfully',
        'product' => $product
    ]);
}

public function update($id, Request $request)
{
    // Find the product by id
    $product = Product::find($id);

    // Check if the product exists
    if (!$product) {
        return response()->json([
            'message' => 'Product not found'
        ], 404);
    }

    $request->validate([
        'sellerid' => 'nullable|integer',
        'name' => 'nullable|string',
        'description' => 'nullable|string',
        'quantity' => 'nullable|integer',
        'category' => 'nullable|string',
        'price' => 'nullable|numeric',
        'image' => 'nullable|image'
    ]);

    if ($request->filled('sellerid')) {
        $product->sellerid = $request->sellerid;
    }

    if ($request->filled('name')) {
        $product->name = $request->name;
    }

    if ($request->filled('description')) {
        $product->description = $request->description;
    }

    if ($request->filled('quantity')) {
        $product->quantity = $request->quantity;
    }

    if ($request->filled('category')) {
        $product->category = $request->category;
    }

    if ($request->filled('price')) {
        $product->price = $request->price;
    }
    // Save the updated product
    $product->save();

    return response()->json([
        'object' => $product,
        'message' => 'Product updated successfully'
    ]);
}

public function productsBySeller($id)
{
    $products = Product::where('sellerid', $id)
                        ->select('id', 'sellerid', 'name', 'description', 'quantity', 'image', 'category', 'price')
                        ->get();

    if ($products->isEmpty()) {
        return response()->json([
            'message' => 'No products found for the seller',
            'seller_id' => $id
        ], 404);
    }

    return response()->json([
        'product' => $products,
        'message' => 'Products waa retrieved successfully'
    ], 200);
}




    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product->image) {
            $exist = Storage::disk('public')->exists("product/{$product->image}");
            if ($exist) {
                Storage::disk('public')->delete("product/{$product->image}");
            }
        }
        $product->delete();
        return response()->json([
            'message' => 'Item deleted successfully'
        ]);

    }

    
}
