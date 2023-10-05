<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\Result;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AnswerController extends Controller
{
    public function store(Request $request){

        $uid = Auth::user()->id;

        if (Carbon::now()>Carbon::parse($request->start_time)->addMinute(Quiz::where('id',$request->quiz_id)->value('duration'))){
            return redirect()->back()->with('error','Time is Over');
        }

        $i=1;
        $db_answers = Question::where('quiz_id',$request->quiz_id)->get();
        $correct=0;
        $total=0;
        foreach ($db_answers as $db_answer){
            if ($db_answer->correct_option==$request->answer[$i]){
                $correct++;
            }
            else{
            }
            $i++;
            $total++;
            Result::create([
                'user_id'=>$uid,
                'quiz_id'=>$request->quiz_id,
                'quiz_score'=>$total,
                'achieved_score'=>$correct,
                'selected_answer'=>$request->answer[$i]
             ]);
        }

        // if (Result::create([
        // Result::create([
        //     //'quiz_id'=>$request->quiz_id,
        //     //'Question'=>$request->question,
        //     //'option_a'=>$request->option_a,
        //     //'option_b'=>$request->option_b,
        //     //'option_c'=>$request->option_c,
        //     //'option_d'=>$request->option_d,
        //     //'correct_option'=>$request->correct_option,
        //     //'question_type'=>$request->question_type,
        //     'user_id'=>$uid,
        //     'quiz_id'=>$request->quiz_id,
        //     'seleted_answer'=>$request->seleted_answer
        // ]);

        // if($request->file('answer_image')){
        //     $file = $request->file('answer_image');
        //     @unlink(public_path('upload/answer_image/'.$uid->answer_image));
        //     $filename = date('YmdHi').$file->getClientOriginalName();
        //     $file->move(public_path('upload/answer_image'),$filename);
        //     $data['answer_image'] = $filename;
        // }
        //$data->save();

        // Result::create([
        //    //'user_id'=>session('user_id'),
        //    'user_id'=>$uid,
        //    'quiz_id'=>$request->quiz_id,
        //    'quiz_score'=>$total,
        //    'achieved_score'=>$correct,
        //    //'answer_image'=>$filename
        // ]);

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
