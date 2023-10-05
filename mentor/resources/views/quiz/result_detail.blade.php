{{-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <title>Document</title>
</head>
<body> 
--}}

@include('users_dashboard.0_top_u_dash')

@include('users_dashboard.0_side_u_dash')

<style>
    td:hover img {
        transform: scale(20,12);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
</style>

    <main id="main" class="main" style="min-height: 600px">

        <h1>Result List</h1>
        <div class="text-center">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        {{-- 
                        <th scope="col">Id</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Quiz Id</th>
                        <th scope="col">Question No</th> 
                        --}}
                        <th scope="col">Question</th>
                        <th scope="col">Option A</th>
                        <th scope="col">Option B</th>
                        <th scope="col">Option C</th>
                        <th scope="col">Option D</th>
                        <th scope="col">Correct Option</th>
                        <th scope="col">Selected Answer</th>
                        <th scope="col">Marks</th>
                        <th scope="col">Re Marks</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $sl=1;
                    @endphp
                    @foreach($selectedAnswers as $result)
                        <tr>
                            <th scope="row">{{$sl++}}</th>
                            {{-- -----------------------***------------------------------ --}}

                            {{-- 
                            <td>{{$result->id}}</td>
                            <td>{{$result->user_id}}</td>
                            <td>{{$result->quiz_id}}</td>
                            <td>{{$result->question_no}}</td> 
                            --}}
                            {{-- -----------------------***------------------------------ --}}

                            <td>{{$result->question}}</td>

                            {{-- -----------------------***------------------------------ --}}

                            @if ($result->question_type==1)
                        
                                <td>{{$result->option_a}}</td>
                                <td>{{$result->option_b}}</td>
                                <td>{{$result->option_c}}</td>
                                <td>{{$result->option_d}}</td>
                                <td style="color:rgb(255, 0, 0);">{{$result->correct_option}}</td>
                                
                            @elseif($result->question_type==2)
                                
                                <td>{{$result->option_a}}</td>
                                <td>{{$result->option_b}}</td>
                                <td>_</td>
                                <td>_</td>
                                <td style="color:rgb(204, 0, 255);">{{$result->correct_option}}</td>
                                
                            @elseif($result->question_type==3)
                                
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td style="color:rgb(21, 0, 255);">{{$result->correct_option}}</td>
                                
                            @elseif($result->question_type==4)
                                
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td style="color:rgb(255, 187, 2);">Based on Examiner evaluation</td>
                                
                            @elseif($result->question_type==5)
                                
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td>_</td>
                                <td style="color:rgb(2, 255, 103);">Based on Examiner evaluation</td>
                                
                            @endif

                            {{-- -----------------------***------------------------------ --}}

                            @if ($result->question_type==5)
                                <td><img class="" src="{{ url('upload/answer_images/' . $result->selected_answer) }}" style="height: 30px; width: 30px;"></td>
                            @else
                                <td>{{$result->selected_answer}}</td>
                            @endif
                            
                            {{-- -----------------------***------------------------------ --}}

                            @if ($result->question_type==5 || $result->question_type==4)
                                <td style="color:rgb(255, 2, 2);">_</td>
                                <td>Will be Review By Teacher</td>
                            @else
                                @if ($result->selected_answer == $result->correct_option)
                                    <td style="color:rgb(2, 19, 255);">1</td>
                                    <td>Correct</td>
                                @else
                                    <td style="color:rgb(255, 2, 2);">0</td>
                                    <td>Wrong</td>
                                @endif
                            @endif
                            {{-- -----------------------***------------------------------ --}}
                            
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

    </main>
{{-- 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
</body>

</html> 
--}}

@include('users_dashboard.0_bottom_u_dash')
