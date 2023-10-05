<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function UserDashboard()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('users_dashboard.1_u_dashboard',compact('profileData'));
    }

    public function UserProfile() 
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('users_dashboard.2_profile_u_dash',compact('profileData'));
    }

    
    public function UserProfileStore(Request $request)
    {
        $id = Auth::user()->id;
        $data = User::find($id);
        // $data->username = $request->username;
        $data->name = $request->name;
        $data->email = $request->email;
        $data->job = $request->job;
        $data->phone = $request->phone;
        $data->address = $request->address;
        $data->about = $request->about;

        if($request->file('photo')){
            $file = $request->file('photo');
            @unlink(public_path('upload/admin_images/'.$data->photo));
            $filename = date('YmdHi').$file->getClientOriginalName();
            $file->move(public_path('upload/admin_images'),$filename);
            $data['photo'] = $filename;
        }
        $data->save();

        $notification = array(
            'message' => 'Admin Profile Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    }

    public function UserUpdatePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|confirmed'
        ]);

        if(!Hash::check($request->old_password, auth::user()->password)){
            $notification = array(
                'message' => 'Old Password Does not Match!',
                'alert-type' => 'error'
            );
    
            return back()->with($notification);

        }

        User::whereId(auth()->user()->id)->update([
            'password' => Hash::make($request->new_password)
        ]);

        $notification = array(
            'message' => 'Password Change Successfully',
            'alert-type' => 'success'
        );

        return back()->with($notification);
    }

    public function CoursesDashboard()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('courses.courses',compact('profileData'));
    }


}
