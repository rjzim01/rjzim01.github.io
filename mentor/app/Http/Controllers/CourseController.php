<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserController;
use App\Models\User;

class CourseController extends Controller
{

    public function ShowCourseMain()
    {
        // @if (Auth::user())
        //     @if (Auth::user()->role === 'admin' )
        //         {{-- <a class="btn-get-started" href="{{ route('admin-profile') }}">
        //         <span>Get Started</span>
        //         </a> --}}
        //         <a href="{{route('show_video2_admin', ['courseid' => $rowInfo['id']])}}">
        //     @else
        //         {{-- <a class="btn-get-started" href="{{ route('users-profile') }}">
        //         <span>Get Started</span>
        //         </a> --}}
        //         <a href="{{route('show_video2_user', ['courseid' => $rowInfo['id']])}}">
        //     @endif 
        // @else
        //     {{-- <a href="{{ route('get-started') }}" class="btn-get-started">Get Started</a> --}}
        //     <a href="">
        // @endif
        //********************* */
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $courseData=Course::all()->toArray();
        //*****return view('courses.courses',compact('data','profileData'));
        //*****return view('courses.courses_dashboard_admin',compact('profileData','courseData'));
        return view('template.3_courses',compact('profileData','courseData'));
        //********************* */
        // if(Auth::user()->null){
        //     // $id = Auth::user()->id;
        //     // $profileData = User::find($id);
        //     // $courseData=Course::all()->toArray();
        //     // return view('template.3_courses',compact('profileData','courseData'));
        //     return view('template.3_courses');
        // }else{
        //     // return view('template.3_courses');
        //     $id = Auth::user()->id;
        //     $profileData = User::find($id);
        //     $courseData=Course::all()->toArray();
        //     return view('template.3_courses',compact('profileData','courseData'));
        // }
        
    }

    public function CourseDashboard_Admin()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $courseData=Course::all()->toArray();
        //return view('courses.courses',compact('data','profileData'));
        return view('courses.courses_dashboard_admin',compact('profileData','courseData'));
    }

    public function CourseDashboard_User()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $courseData=Course::all()->toArray();
        //return view('courses.courses',compact('data','profileData'));
        return view('courses.courses_dashboard_user',compact('profileData','courseData'));
    }

    public function CourseAdd()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        //return view('video.upload_video',compact('profileData'));
        return view('courses.add_courses',compact('profileData'));
    }

    public function StoreCourse(Request $request)
    {
        
        $request->validate([
            //'video' => 'required|mimes:mp4,ogx,oga,ogv,ogg,webm|max:20000028',
            'name' => 'string'
        ]);
        
       $insert=new Course();

       //$file_name = time() . '.' . request()->video->getClientOriginalExtension();
       // request()->video->move(public_path('video'), $file_name);

       //$insert->video = $file_name;
       $insert->name = $request->name;
       $insert->save();

       return redirect()->route('course_admin')->with('success', 'Course Added successfully');
        
    }

}
