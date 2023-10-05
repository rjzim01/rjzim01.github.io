<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\Result;
use App\Models\SelectedAnswer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AnswerController extends Controller
{
    public function store(Request $request){
        //dd($request->all());

        //$post=SelectedAnswer::all();
        // Assuming you have a model instance with a 'created_at' timestamp
        //$createdAt = $post->created_at;
        // Format the timestamp in 12-hour format with AM/PM
        //$formattedTime = Carbon::parse($createdAt)->format('h:i A');

        $uid = Auth::user()->id;

        if (Carbon::now()>Carbon::parse($request->start_time)->addMinute(Quiz::where('id',$request->quiz_id)->value('duration'))){
            return redirect()->back()->with('error','Time is Over');
        }

        
        //$a='';
        $i=1;
        $db_answers = Question::where('quiz_id',$request->quiz_id)->get();
        $correct=0;
        $total=0;
        // foreach ($db_answers as $db_answer){
        //     $a=$request->answer[$i];
            
        //     if ($db_answer->correct_option==$request->answer[$i]){
        //         $correct++;
        //     }
        //     else{
        //     }
        //     $i++;
        //     $total++;
        //     $s=$i-1;
            
        //     SelectedAnswer::create([
        //         'user_id'=>$uid,
        //         'quiz_id'=>$request->quiz_id,
        //         'question_no'=>$s,
        //         'selected_answer'=>$a
        //     ]);
        // }
        foreach ($db_answers as $db_answer){
            $a='';
            // $a=$request->answer[$i];
            // if($request->file('selected_answer')){
            //     $file = $request->file('selected_answer');
            //     @unlink(public_path('upload/answer_images/'.$uid->selected_answer));
            //     $filename = date('YmdHi').$file->getClientOriginalName();
            //     $file->move(public_path('upload/answer_images'),$filename);
            //     $uid['selected_answer'] = $filename;
            //     $a=$uid['selected_answer'];
            // }
            // if(isset($request->ans_img)){
            if($request->hasFile('ans_img')){
                $imageName = time().'.'.$request->ans_img->extension();
                $request->ans_img->move(public_path('upload/answer_images'), $imageName);
                $a= $imageName;
                $total+=5;
                $correct+=5;
            }
            //$extension = pathinfo(answer[$i], PATHINFO_EXTENSION);
            // if($request->hasFile('answer[$i]')){
            //     $imageName = time().'.'.$request->answer[$i]->extension();
            //     $request->answer[$i]->move(public_path('upload/answer_images'), $imageName);
            //     $a= $imageName;
            // }
            else{
                if ($db_answer->correct_option==$request->answer[$i]){
                    $correct++;
                }
                $a=$request->answer[$i];
                $total++;
            }
            
            $i++;
            //$total++;
            $s=$i-1;
            
            SelectedAnswer::create([
                'user_id'=>$uid,
                'quiz_id'=>$request->quiz_id,
                'quizs_id'=>$request->quizs_id,
                'question_no'=>$s,
                'selected_answer'=>$a
                //'created_at'=>$formattedTime
            ]);
        }
        Result::create([
            //'user_id'=>session('user_id'),
            'user_id'=>$uid,
            'quiz_id'=>$request->quiz_id,
            //'quizs_id'=>$request->quiz_id,
            'quiz_score'=>$total,
            'achieved_score'=>$correct
            //'selected_answer'=>$a,
            //'question_no'=>$i
            //'selected_answer'=>$ans
        ]);
        
        

        return redirect()->route('results')->with('success','Quiz done and result published');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
