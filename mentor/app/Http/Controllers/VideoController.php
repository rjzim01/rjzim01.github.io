<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Models\Course;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function ShowVideo()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $data=Video::all()->toArray();
        //$course_data=Course::all()->toArray();
        //$course_data='Web';
        $course_data=Course::find(1);
        // $course_video_a=Video::find('id','1')->toArray();
        //$course_video_a=Video::find(1)->toArray();
        //return view('video.show_video',compact('data','profileData','course_data','course_video_a'));
        return view('video.show_video',compact('data','profileData','course_data'));
    }

    public function ShowVideo2_admin(Course $courseid)
    //public function ShowVideo2(Video $courseid, Course $videoid)
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $vid = $courseid->id;
        //$data=Video::all()->toArray();
        $data=Video::all()->where('subid',$vid)->toArray();
        $course_video=Video::find($courseid)->toArray();
        //$course_video_a=Video::find('subid','1')->toArray();
        $course_video_a=Video::find($courseid)->toArray();
        //$course_video_a=Video::groupBy('subid')->having($courseid)->get();
        //$course_video_a=SELECT * FROM `videos` WHERE subid = 1;
        $course_data=Course::find($courseid)->toArray();
        // return view('video.show_video',['course' => $course],compact('data','profileData','course_data'));
        //return view('video.show_video', ['course' => $course]);
        return view('video.show_video2_admin',compact('data','profileData','course_data','courseid','course_video','course_video_a'));
    }

    public function ShowVideo2_user(Course $courseid)
    //public function ShowVideo2(Video $courseid, Course $videoid)
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $vid = $courseid->id;
        //$data=Video::all()->toArray();
        $data=Video::all()->where('subid',$vid)->toArray();
        $course_video=Video::find($courseid)->toArray();
        //$course_video_a=Video::find('subid','1')->toArray();
        $course_video_a=Video::find($courseid)->toArray();
        //$course_video_a=Video::groupBy('subid')->having($courseid)->get();
        //$course_video_a=SELECT * FROM `videos` WHERE subid = 1;
        $course_data=Course::find($courseid)->toArray();
        // return view('video.show_video',['course' => $course],compact('data','profileData','course_data'));
        //return view('video.show_video', ['course' => $course]);
        return view('video.show_video2_user',compact('data','profileData','course_data','courseid','course_video','course_video_a'));
    }

    public function uploadVideo()
    {
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('video.upload_video',compact('profileData'));
    }

    public function StoreVideo(Request $request)
    {
        $request->validate([
            'video' => 'required|mimes:mp4,mkv,ogx,oga,ogv,ogg,webm|max:20000028',
            'title' => 'string',
            'name' => 'string',
            'subid' => 'int'
        ]);

       $insert=new Video();

       $file_name = time() . '.' . request()->video->getClientOriginalExtension();
        request()->video->move(public_path('video'), $file_name);

       $insert->video = $file_name;
       $insert->title = $request->title;
       $insert->name = $request->name;
       $insert->subid = $request->subid;
       $insert->save();

        //return view('video.show_video');
        return redirect()->route('show_video')->with('success', 'Video Added successfully');
    }

}
