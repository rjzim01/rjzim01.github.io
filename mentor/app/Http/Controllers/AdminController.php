<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    
    public function AdminLogin()
    {
        return view('admin.admin_login');
    }

    public function AdminDashboard()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('admin.1_admin_dashboard',compact('profileData'));
    }

    public function AdminProfile() 
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('admin.2_profile_admin_dash',compact('profileData'));
    }

    public function AdminFeatureAllUser() 
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $users = User::all();
        return view('admin.features.all_user',compact('profileData','users'));
    }

    public function AdminFeatureAllUserUpdate(User $user) 
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $users = User::all();
        $cid = User::find($id);
        // return view('admin.admin.features.all_user',compact('profileData','users'));
        return view('admin.features.all_user_update',['user'=>$user,],compact('profileData'));
    }

}
