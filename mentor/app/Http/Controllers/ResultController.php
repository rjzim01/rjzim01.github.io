<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Result;
use App\Models\SelectedAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
//use App\Http\Controllers\DB;

class ResultController extends Controller
{

    public function index(){
        $uid = Auth::user()->id;
        //$results = Result::sortable()->paginate(5);

        // if (session('user_role')=='admin'){
        //     return view('user.result-page')->with('results',Result::join('quizzes','results.quiz_id','quizzes.id')
        //         ->join('users','results.user_id','=','users.id')
        //         ->get());
        // }

        return view('quiz.result_page_user')->with('profileData',User::find($uid))
        ->with('results',Result::join('quizzes','results.quiz_id','quizzes.id')
             //->where('user_id',session('user_id'))->get());
             
            ->where('user_id',$uid)->get());
    }

    public function result_admin(){
        $uid = Auth::user()->id;

        //if (session('user_role')=='admin'){
            return view('quiz.result_page_admin')->with('profileData',User::find($uid))
            ->with('results',Result::join('quizzes','results.quiz_id','quizzes.id')
                ->join('users','results.user_id','=','users.id')
                ->get());
        //}

        // return view('quiz.result_page_user')->with('profileData',User::find($uid))
        // ->with('results',Result::join('quizzes','results.quiz_id','quizzes.id')
        //      ->where('user_id',session('user_id'))->get());
             
        // ->where('user_id',Auth::user()->id)->get());
    }
    

    /**
     * Show the form for creating a new resource.
     */
    public function result_detail($id)
    {
        $uid = Auth::user()->id;
        return view('quiz.result_detail')
            //->with('selectedAnswers',SelectedAnswer::join('questions','selected_answers.quiz_id','questions.id')
            //->with('selectedAnswers',SelectedAnswer::join('questions','selected_answers.question_no','questions.question_no')
            //***->with('selectedAnswers',SelectedAnswer::join('questions','selected_answers.quiz_id','questions.quiz_id')
            //,'selected_answers.quizs_id','questions.quiz_id'
            //->select('selected_answers.quizs_id', 'questions.quiz_id')
            //***->where('user_id',$uid)
            //->where('quiz_id',$id)
            //***->where('quizs_id',$id)
            //***->get());
            ->with('profileData',User::find($uid))
            ->with('selectedAnswers', SelectedAnswer::join('questions', function ($join) {
                $join->on('selected_answers.quiz_id', '=', 'questions.quiz_id')
                     ->on('selected_answers.question_no', '=', 'questions.question_no');
            })
            ->where('user_id', $uid)
            ->where('quizs_id', $id)
            ->get());
        
            
    }

    public function leaderBoard()
    {
        $uid = Auth::user()->id;
        return view('leaderboard.leader_board')
        ->with('profileData',User::find($uid))
        ->with('results',Result::join('quizzes','results.quiz_id','quizzes.id')
        ->join('users','results.user_id','=','users.id')
        //->select('users.name', 'results.*')
        //->groupBy('users.name')
        ->orderByDesc('results.achieved_score')
        ->get());

        // $uid = Auth::user()->id;

        // $subquery = Result::join('quizzes', 'results.quiz_id', 'quizzes.id')
        //     ->join('users', 'results.user_id', '=', 'users.id')
        //     ->select('users.name', 'results.*')
        //     ->orderByDesc('results.achieved_score');

        // $results = DB::table(DB::raw("({$subquery->toSql()}) as sub"))
        //     ->mergeBindings($subquery->getQuery())
        //     ->groupBy('name') // Group by user name
        //     ->get();

        // return view('leaderboard.leader_board')
        //     ->with('profileData', User::find($uid))
        //     ->with('results', $results);
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
    public function show(Result $result)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Result $result)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Result $result)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Result $result)
    {
        //
    }
}
