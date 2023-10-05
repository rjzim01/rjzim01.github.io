@include('users_dashboard.0_top_u_dash')

@include('users_dashboard.0_side_u_dash')

<main id="main" class="main" style="min-height: 600px">

<h1>It's a Quiz Page</h1>
    <h2>Quiz Title: {{$quiz->title}}</h2>
    <h3>Exam Time: {{$quiz->duration}} Minutes or {{$quiz->duration*60}} Seconds</h3>
    <h4>Timer: <div id="timer_style"><label id="minutes">00</label>:<label id="seconds">00</label></div></h4>
    <div class="text-center">
        <form method="post" action="{{route('store.answer')}}" enctype="multipart/form-data">
            @csrf
            <input type="hidden" name="quiz_id" value="{{$quiz->id}}" readonly required>
            <input id="start_time" type="hidden" name="start_time" value="{{$start_time}}" readonly required>
            @php
            $i=1;
            @endphp
            @foreach($questions as $question)
                @if ($question->question_type==3)
                    <label for="">Question: {{$question->question}}</label>
                    <input type="text" placeholder="Fill in the blank" name="answer[{{$i++}}]"/>
                    {{-- <input type="text" placeholder="Fill in the blank" name="selected_answer"/> --}}
                @elseif ($question->question_type==4)
                    <label for="">Question: {{$question->question}}</label>
                    {{-- <input type="text" placeholder="Enter a Short Note" name="answer[{{$i++}}]"/> --}}
                    <br>
                    <textarea name="answer[{{$i++}}]" rows="4" cols="50"></textarea>
                    {{-- <textarea name="selected_answer" rows="4" cols="50"></textarea> --}}
                @elseif ($question->question_type==5)
                    <label for="">Question: {{$question->question}}</label>
                    {{-- <input type="text" placeholder="Enter a Short Note" name="answer[{{$i++}}]"/> --}}
                    <br>
                    {{-- <textarea name="answer[{{$i++}}]" rows="4" cols="50"></textarea> --}}

                    <div class="">
                        {{-- <img id="showImage" class="wd-50 rounded-circle"
                                        src="{{ (!empty($question->answer_image)) ? url('upload/answer_image/' . $question->answer_image) : url('upload/no_image.jpg') }}"
                                        alt="answee"> --}}

                        <div class="pt-2">
                            <input class="form-control" name="answer[{{$i++}}]" type="file" id="image">
                            {{-- <input class="form-control" name="selected_answer" type="file" id="image"> --}}
                        </div>
                    </div>

                @else
                    <select name="answer[{{$i++}}]" class="form-control" required>
                    {{-- <select name="selected_answer" class="form-control" required> --}}
                        <option selected disabled value>Question: {{$question->question}}</option>
                        @if ($question->question_type==1)
                            <option value="option_a">{{$question->option_a}}</option>
                            <option value="option_b">{{$question->option_b}}</option>
                            <option value="option_c">{{$question->option_c}}</option>
                            <option value="option_d">{{$question->option_d}}</option>
                        @else
                            <option value="option_a">{{$question->option_a}}</option>
                            <option value="option_b">{{$question->option_b}}</option>
                        @endif
                    </select>
                @endif
                

                <hr>
            @endforeach
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</main>

    <script>

        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        var totalSeconds = 0;
        setInterval(setTime, 1000);

        function setTime() {
            ++totalSeconds;
            secondsLabel.innerHTML = pad(totalSeconds % 60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }
        function myFunction() {
            window.setTime=null;
            window.pad=null;
            document.getElementById('timer_style').innerHTML="Time is Up!";
            document.getElementById('timer_style').style.color='red'
        }
        window.setTimeout(myFunction, {{$quiz->duration*60*1000}});

        //for image load
        $(document).ready(function() {
            $('#image').change(function(e) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#showImage').attr('src', e.target.result);
                }
                reader.readAsDataURL(e.target.files['0']);
            });
        });
    </script>


@include('users_dashboard.0_bottom_u_dash')