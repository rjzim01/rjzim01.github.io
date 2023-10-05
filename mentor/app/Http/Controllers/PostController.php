<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('post/postIndex');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Retrieve a specific Post instance from the database
        $post = Post::all(); // Replace '1' with the ID of the post you want to retrieve

        // Get the 'created_at' timestamp from the Post instance
        $createdAt = $post->created_at;

        // Format the timestamp in 12-hour format with AM/PM
        $formattedTime = Carbon::parse($createdAt)->format('h:i A');
        // if (Post::create([
        //     'name'=>$request->name,
        // ])){
        //     return redirect()->back();
        // }
        Post::create([
            'name'=>$request->name,
            'created_at'=>$formattedTime
        ]);
        return redirect()->back();
        
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
