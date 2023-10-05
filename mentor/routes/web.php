<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AllUsersController;
use App\Http\Controllers\AnswerControllerC;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\PostController;

Route::get('/w', function () {
    return view('welcome');
})->name('welcome');

Route::get('/', function () {
    return view('template.1_home');
})->name('home1');

// Route::view('/welcome', 'welcome', ['name' => 'Taylor']);

// Route::view('/', 'template.1_home', ['name' => 'home1']);

// Route::view('/w', 'welcome', ['name' => 'welcome']);

////////////////////////////////////////////////////////////

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::view('/dashboard', 'dashboard', ['name' => 'dashboard'])->middleware(['auth', 'verified']);

Route::get('/error', function () {
    return view('error');
})->name('error');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::get('/guest', function () { return view('layouts.navigation'); })->name('guest');

Route::get('/home', function () { return view('template.1_home'); })->name('home');

Route::get('/about', function () { return view('template.2_about'); })->name('about');

Route::get('/coursess', function () { return view('template.3_coursess'); })->name('coursess');

Route::get('/courses', [CourseController::class, 'ShowCourseMain'])->name('courses');

//Route::get('/courses/enroll', function () {
    // This route is only accessible to users with 'admin' role
//})->middleware('admin');

// Route::get('/trainers', function () { return view('template.4_trainers'); })->name('trainers');

// Route::get('/events', function () { return view('template.5_events'); })->name('events');

// Route::get('/pricing', function () { return view('template.6_pricing'); })->name('pricing');

// Route::get('/contact', function () { return view('template.7_contact'); })->name('contact');


Route::middleware(['auth', 'verified'])->group(function(){
    // Route::get('/get-started', function () {
    //     return view('template.3_courses');
    // })->name('get-started');
    Route::get('/get-started', [CourseController::class, 'ShowCourseMain'])->name('get-started');
});

Route::get('/admin/login', [AdminController::class, 'AdminLogin'])->name('admin.login');


//////////////////////////////////////////////////---User---/////////////////////////////////////////////////////////////////

Route::middleware(['auth', 'role:user'])->group(function(){

    Route::get('/user/dashboard', [UserController::class, 'UserDashboard'])->name('user-dashboard');
    Route::get('/user/profile', [UserController::class, 'UserProfile'])->name('users-profile');
    Route::post('/users/profile/store', [UserController::class, 'UserProfileStore'])->name('users-profile.store');
    Route::post('/users/profile/update/password', [UserController::class, 'UserUpdatePassword'])->name('users-profile.password');
    
//////////////////////////////-----------Video--------------//////////////////////////////////////

    // Route::get('/video1', [VideoController::class, 'ShowVideo'])->name('show_video');
    Route::get('/user/video2/{courseid}', [VideoController::class, 'ShowVideo2_user'])->name('show_video2_user');
    // Route::get('/upload-video', [VideoController::class, 'uploadVideo'])->name('upload_video');
    // Route::post('/store-video', [VideoController::class, 'StoreVideo'])->name('store_video');

//////////////////////////////-----------course--------------//////////////////////////////////////

    Route::get('/user/course', [CourseController::class, 'CourseDashboard_User'])->name('course_user');
    // Route::get('/add-course', [CourseController::class, 'CourseAdd'])->name('course_add');
    // Route::post('/store-course', [CourseController::class, 'StoreCourse'])->name('course_store');

    Route::get('/quiz-listu',[QuizController::class,'index'])->name('listu_quiz');

    Route::get('/give-quiz/{id}',[QuizController::class,'joinQuiz'])->name('join.quiz');

    Route::post('/store-answer',[AnswerController::class,'store'])->name('store.answer');

    Route::get('/results',[ResultController::class,'index'])->name('results');
    
    Route::get('/results-detail/{id}', [ResultController::class, 'result_detail'])->name('result_detail');

    Route::get('/leaderboard',[ResultController::class,'leaderBoard'])->name('leader_board');

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////---Admin---////////////////////////////////////////////////////////////////

Route::middleware(['auth', 'role:admin'])->group(function(){

    Route::get('/admin/dashboard', [AdminController::class, 'AdminDashboard'])->name('admin_dashboard');
    Route::get('/admin/profile', [AdminController::class, 'AdminProfile'])->name('admin-profile');
    Route::get('/admin/allusers', [AdminController::class, 'AdminFeatureAllUser'])->name('all_user');
    Route::get('/admin/allusers/{id}/update', [AdminController::class, 'AdminFeatureAllUserUpdate'])->name('all_user_update');

    //////////////////////////////-----------Video--------------//////////////////////////////////////

    Route::get('/admin/video1', [VideoController::class, 'ShowVideo'])->name('show_video');
    Route::get('/admin/video2/{courseid}', [VideoController::class, 'ShowVideo2_admin'])->name('show_video2_admin');
    Route::get('/admin/upload-video', [VideoController::class, 'uploadVideo'])->name('upload_video');
    Route::post('/admin/store-video', [VideoController::class, 'StoreVideo'])->name('store_video');

//////////////////////////////-----------course--------------//////////////////////////////////////

    Route::get('/admin/course', [CourseController::class, 'CourseDashboard_Admin'])->name('course_admin');
    Route::get('/admin/add-course', [CourseController::class, 'CourseAdd'])->name('course_add');
    Route::post('/admin/store-course', [CourseController::class, 'StoreCourse'])->name('course_store');


///////////////////...quiz...////////////////////

Route::get('/quiz',[QuizController::class,'showQuiz'])->name('list_quiz');

Route::get('/add-quiz',[QuizController::class,'addQuiz'])->name('add_quiz');

Route::post('/store-quiz',[QuizController::class,'storeQuiz'])->name('store_quiz');

// Route::get('/quiz/{quiz}/edit', [QuizController::class, 'edit'])->name('quiz.edit');

// Route::put('/quiz/{quiz}/update', [QuizController::class, 'update'])->name('product.update');

// Route::delete('/quiz/{quiz}/destroy', [QuizController::class, 'destroy'])->name('quiz_destroy');

Route::get('/add-question/{id}',[QuestionController::class,'addQuestion'])->name('add_question');

Route::post('/store-question',[QuestionController::class,'storeQuestion'])->name('store_question');

Route::get('/resultsa',[ResultController::class,'result_admin'])->name('results_admin');

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::resource('allusers', AllUsersController::class);

Route::get('/post', [PostController::class, 'index'])->name('post');
Route::post('/add-post', [PostController::class, 'store'])->name('store_post');








