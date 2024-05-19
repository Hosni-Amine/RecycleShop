<?php

namespace App\Http\Controllers;
use App\Models\Product;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Order::select('id','buyerid', 'productid','quantity','price')->get();
    }

    public function store(Request $request)
{
    // Validate incoming request data
    $request->validate([
        'buyerid'=>'required',
        'productid' => 'required',
        'quantity' => 'required',
        'price' => 'required'
    ]);

    $product = Product::where('id', $request->input('productid'))->first(); // Assuming Product is an Eloquent model
    if (!$product) {
        return response()->json([
            'message' => "Error finding the product !",
        ],500);
    }
    
    // Assuming you have sellerid associated with the product
    $sellerid = $product->sellerid;

    // Cast quantity and price to double
    $buyerid = $request->input('buyerid') ? (integer)$request->input('buyerid') : null;
    $productid = $request->input('productid') ? (integer)$request->input('productid') : null;
    $quantity = $request->input('quantity') ? (integer)$request->input('quantity') : null;
    $price = (double)$request->input('price') ? (double)$request->input('price') : null;

    $order = Order::create([
        'buyerid'=> $buyerid,
        'productid' => $productid,
        'quantity' => $quantity,
        'sellerid' => $sellerid,
        'status' => false,
        'price' => $price
    ]);

    return response()->json([
        'message' => 'Order added successfully',
        'order' => $order
    ],201);
}

public function update($id, Request $request)
{
    // Find the order by id
    $order = Order::find($id);

    // Check if the order exists
    if (!$order) {
        return response()->json([
            'message' => 'Order not found'
        ], 404);
    }

    $request->validate([
        'buyerid' => 'nullable|integer',
        'productid' => 'nullable|integer',
        'quantity' => 'nullable|integer',
        'price' => 'nullable|numeric'
    ]);

    $buyerid = $request->input('buyerid') ? (integer)$request->input('buyerid') : null;
    $productid = $request->input('productid') ? (integer)$request->input('productid') : null;
    $quantity = $request->input('quantity') ? (integer)$request->input('quantity') : null;
    $price = (double)$request->input('price') ? (double)$request->input('price') : null;

    if (!is_null($buyerid)) {
        $order->buyerid = $buyerid;
    }

    if (!is_null($productid)) {
        $order->productid = $productid;
    }

    if (!is_null($quantity)) {
        $order->quantity = $quantity;
    }

    if (!is_null($price)) {
        $order->price = $price;
    }

    // Save the updated order
    $order->save();

    return response()->json([
        'object' => $order,
        'message' => 'Order updated successfully'
    ]);
}

public function getOrderById($orderId)
{
    $order = Order::with('product', 'buyer','seller')->find($orderId);

    
    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    return response()->json([
        'order' => $order,
        'message' => 'Order retrieved successfully'
    ], 200);
}

public function getAllorders(){

    $orders = Order::with('buyer','product', 'seller')->get();

    return response()->json([
        'orders' => $orders,
        'message' => 'Orders retrieved successfully'
    ], 200);

}

public function orderByClient($buyerId)
{


    $orders = Order::where('buyerid', $buyerId)->with('product', 'seller')->get();

    return response()->json([
        'orders' => $orders,
        'message' => 'Orders retrieved successfully'
    ], 200);
}

public function orderBySeller($sellerId)
{


    $orders = Order::where('sellerid', $sellerId)->with('product', 'buyer')->get();

    return response()->json([
        'orders' => $orders,
        'message' => 'Orders retrieved successfully'
    ], 200);
}


public function show(Order $order)  
{
        return response()->json([
            'order' => $order
        ]);
}

public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message'=> 'Order indefined'],404);
        }
        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully'
        ]);

    }

    
    public function approveOrder($id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json([
            'message' => 'Order not found'
        ], 404);
    }

    if($order->status==false){
        $order->status = true;
    }else{
        $order->status = false;
    }
    $order->save();

    return response()->json([
        'message' => 'Order approved successfully',
        'order' => $order
    ]);
}
}
