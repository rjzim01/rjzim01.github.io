@include('users_dashboard.0_top_u_dash')

@include('users_dashboard.0_side_u_dash')

<main id="main" class="main" style="min-height: 600px">

    <h1>Result List</h1>
    <div class="text-center">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Quiz Score</th>
                {{-- <th scope="col">@sortablelink('quiz_score')</th> --}}
                
                {{-- 
                @if(session('user_role')=='admin')
                    <th scope="col">User Score</th>
                    <th scope="col">User Name</th>
                @else
                    <th scope="col">My Score</th>
                @endif
                 --}}
                 <th scope="col">My Score</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
            </tr>
            </thead>
            <tbody>
            @php
                $sl=1;
                $t_achieved_score = 0;
                $t_available_score = 0;
                //$grade = ( $t_achieved_score / $t_available_score ) * 100;
            @endphp
            @foreach($results as $result)
                <tr>
                    <th scope="row">{{$sl++}}</th>
                    <td>{{$result->title}}</td>
                    <td>{{$result->quiz_score}}</td>
                    <td>{{$result->achieved_score}}</td>
                    {{-- <td>{{$total += $result->achieved_score}} --}}
                    <input type="hidden" value="{{$t_achieved_score += $result->achieved_score}}">
                    <input type="hidden" value="{{$t_available_score += $result->quiz_score}}">
                    {{-- 
                    @if(session('user_role')=='admin')
                        <td>{{$result->username}}</td>
                    @endif
                     --}}
                    <td>{{$result->updated_at}}</td>
                    <td><a href="/results-detail/{{$result->quiz_id}}">Details</a></td>
                    {{-- <td><a href="/give-quiz/{{$quiz->id}}" >{{$quiz->title}}</a></td> --}}
                </tr>
            @endforeach
            </tbody>
        </table>
        <hr>
        
        <p style="text-align: end; font-size: 1.5rem;">Total Marks = {{$t_achieved_score}}/{{$t_available_score}}</p>
        {{-- <p style="text-align: end; font-size: 1.5rem;">Total Marks = {{$t_achieved_score}}/{{$t_available_score}}</p> --}}

        @php
            $grade = ( $t_achieved_score / $t_available_score ) * 100;
        @endphp
        
        @if ($grade>79)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(21, 255, 0);">A+</p>
        @elseif($grade>69)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">A</p>
        @elseif($grade>59)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">A-</p>
        @elseif($grade>69)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">B+</p>
        @elseif($grade>59)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">B</p>
        @elseif($grade>49)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">B-</p>
        @elseif($grade>39)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">C</p>
        @elseif($grade>33)
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: rgb(0, 255, 251);">Pass</p>
        @else
        <p style="text-align: center; font-size: 1.5rem; color:rgb(0, 0, 0); background-color: red;">Fail</p>
        @endif
        
        {{-- {!! $results->appends(\Request::except('page'))->render() !!} --}}
    </div>
</main>

@include('users_dashboard.0_bottom_u_dash')
