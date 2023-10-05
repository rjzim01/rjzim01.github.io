<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedAnswer extends Model
{
    use HasFactory;

    protected $fillable=[
        'user_id',
        'quiz_id',
        'quizs_id',
        'selected_answer',
        'question_no',
        'created_at'
    ];

    public function result(){
        $this->belongsTo(Result::class);
    }

    public function quiz(){
        $this->belongsTo(Quiz::class);
    }

    public function user(){
        $this->belongsToMany(User::class);
    }

}
