<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class QuestionController extends Controller
{

    public function addQuestion($id){
        $uid = Auth::user()->id;
        
        return view('quiz.add_question_admin')->with('quiz_list',Quiz::where('id',$id)->first())
        ->with('questions',Question::where('quiz_id',$id)->get())
        ->with('quiz_id',$id)
        ->with('profileData',User::find($uid));
    }

    public function storeQuestion(Request $request){
        //dd($request->all());
        //$a=1;
        if (Question::create([
            'quiz_id'=>$request->quiz_id,
            'question_no'=>$request->question_no,
            //'question_no'=>$a,
            'question_type'=>$request->question_type,
            'Question'=>$request->question,
            'option_a'=>$request->option_a,
            'option_b'=>$request->option_b,
            'option_c'=>$request->option_c,
            'option_d'=>$request->option_d,
            'correct_option'=>$request->correct_option,
            
        ])){
            return redirect()->back()->with('success','Question added successfully!');
            //$a++;
        }
        return redirect()->back()->with('error','Something wrong!');
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        //
    }
}
