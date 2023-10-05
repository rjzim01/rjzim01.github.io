<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Quiz;
use App\Models\Result;
use App\Models\Question;
use App\Models\ExamCandidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class QuizController extends Controller
{
    //$id = Auth::user()->id;

    public function addQuiz(){
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('quiz.add_quiz_admin',compact('profileData'));
    }
    
    public function storeQuiz(Request $request){
        if (Quiz::create([
            'title'=>$request->title,
            'from_time'=>$request->from_time,
            'to_time'=>$request->to_time,
            'duration'=>$request->duration,
        ])){
            return redirect()->back()->with('success','Quiz: '.$request->title.' added successfully!');
        }
        return redirect()->back()->with('error','Quiz: '.$request->title.' was not added. Something wrong!');
    }

    public function edit(Quiz $quiz){
        // $id = Auth::user()->id;
        // $profileData = User::find($id);
        // return view('quiz.add_quiz_admin',compact('profileData'));
        return view('quiz.quiz_edit', ['quiz' => $quiz]);
    }

    public function update(){
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('quiz.add_quiz_admin',compact('profileData'));
    }

    public function destroy(Quiz $quiz){
        $quiz->delete();
        return redirect(route('list_quiz'))->with('success', 'Quiz deleted Succesffully');
    }

    public function showQuiz(){
        // if (session('user_role')=='admin'){
        //     return view('admin.quiz-list')->with('quiz_list',Quiz::all());
        // }
        // return view('user.quiz-list')->with('quiz_list',Quiz::join('questions','quizzes.id','=','questions.quiz_id')->distinct('quizzes.id')
        //         ->select('quizzes.id as quiz_id','quizzes.*')
        //         ->get());
        // if (session('user_role')=='admin'){
        //     return view('admin.quiz-list');
        // }
        $id = Auth::user()->id;
        $profileData = User::find($id);
        $quiz_list = Quiz::all();
        return view('quiz.quiz_list_admin',compact('profileData','quiz_list'));
    }

    public function index(){
        /*
        if (session('user_role')=='admin'){
            return view('admin.quiz-list')->with('quiz_list',Quiz::all());
        }
        */
        $id = Auth::user()->id;
        $profileData = User::find($id);
        return view('quiz.quiz_list_user',compact('profileData'))->with('quiz_list',Quiz::join('questions','quizzes.id','=','questions.quiz_id')->distinct('quizzes.id')
                ->select('quizzes.id as quiz_id','quizzes.*')
                ->get());
    }

    public function joinQuiz($id){

        $uid = Auth::user()->id;
        //$profileData = User::find($uid);

        date_default_timezone_set("Asia/Dhaka");
        //echo "The time is " . date("Y-m-d h:i:sa");
        $t = date("Y-m-d h:i:sa");
        $s = strtotime($t);
        
        // if (count(ExamCandidate::where('quiz_id',$id)->where('user_id','=',session('user_id'))->get())>0){
        if (count(ExamCandidate::where('quiz_id',$id)->where('user_id','=',$uid)->get())>0){
            return redirect()->back()->with('error','You already participated this quiz');
        }

        // if (time()>=strtotime(Quiz::where('id',$id)->value('to_time'))){
        if ($s>=strtotime(Quiz::where('id',$id)->value('to_time'))){
            return redirect()->back()->with('error','Quiz is no longer available');
        }
        if ($s<strtotime(Quiz::where('id',$id)->value('from_time'))){
            return redirect()->back()->with('error','Quiz is not available now. Wait for its availability ');
        }

        // if (session('user_role')=='user'&&count(Result::where('user_id',session('user_id'))->get())>0){
        //     return redirect()->back()->with('error','You already participated this quiz');
        // }

        //$uid = Auth::user()->id;
        ExamCandidate::create([
            //'user_id'=>session('user_id'),
            'user_id'=>$uid,
           
            //'user_id'=> $uid;
            'quiz_id'=>$id
        ]);

         return view('quiz.give_quiz_user')->with('quiz',Quiz::where('id',$id)->first())
        //return view('quiz.give_quiz_user_c')->with('quiz',Quiz::where('id',$id)->first())
            ->with('questions',Question::where('quiz_id',$id)->get())
            ->with('start_time',Carbon::now())
            ->with('profileData',User::find($uid));
    }

}
