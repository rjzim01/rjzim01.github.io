<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AllUsersController extends Controller
{
    
    public function index(Request $request)
    {
        $user = User::all();
        return view('admin.allusers.index',['user' => $user]);
    }

    public function edit(User $user)
    {
        return view('admin.allusers.edit',['user' => $user]);
    }

}
