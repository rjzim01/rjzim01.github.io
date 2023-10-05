@include('users_dashboard.0_top_u_dash')

@include('users_dashboard.0_side_u_dash')

    <main id="main" class="main" style="min-height: 600px">

        <h1>Leader Board</h1>
        <div class="text-center">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                    
                    {{-- @if(session('user_role')=='admin') --}}
                        {{-- <th scope="col">User Score</th> --}}
                        {{-- <th scope="col">User Name</th> --}}
                    {{-- @else
                        <th scope="col">My Score</th>
                    @endif --}}
                    
                     {{-- <th scope="col">My Score</th> --}}
                    {{-- <th scope="col">Date</th> --}}
                </tr>
                </thead>
                <tbody>
                @php
                    $sl=1;
                    $n=$profileData->name;
                @endphp
                @foreach($results as $result)
                    <tr>
                        @if ($result->name == $n)
                        
                            <th scope="row" style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(80, 255, 246);">{{$sl++}}</th>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(80, 255, 246);">{{$result->name}}</td>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(80, 255, 246);">{{$result->achieved_score}}</td>

                        @else
                            
                            @if ($sl==1)

                            <th scope="row" style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(83, 255, 80);">{{$sl++}}</th>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(83, 255, 80);">{{$result->name}}</td>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(83, 255, 80);">{{$result->achieved_score}}</td>
                            
                            @elseif ($sl==2)

                            <th scope="row" style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(128, 230, 126);">{{$sl++}}</th>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(128, 230, 126);">{{$result->name}}</td>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(128, 230, 126);">{{$result->achieved_score}}</td>

                            @elseif ($sl==3)

                            <th scope="row" style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(180, 229, 180);">{{$sl++}}</th>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(180, 229, 180);">{{$result->name}}</td>
                            <td style="font-weight: bold; color: rgb(0, 0, 0); background-color: rgb(180, 229, 180);">{{$result->achieved_score}}</td>

                            @else
                            
                            <th scope="row">{{$sl++}}</th>
                            <td>{{$result->name}}</td>
                            <td>{{$result->achieved_score}}</td>
                        
                            @endif

                        @endif
                        
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

    </main>

@include('users_dashboard.0_bottom_u_dash')
