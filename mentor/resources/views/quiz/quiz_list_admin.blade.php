@include('admin.0_top_admin_dash')

@include('admin.0_side_admin_dash')

<main id="main" class="main" style="min-height: 600px">

    <div class="pagetitle">
        <h1>Quiz List</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="">Home</a></li>
                <li class="breadcrumb-item active">quiz</li>
            </ol>
        </nav>
    </div>

    <div class="text-center">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Duration</th>
                <th scope="col">Edit</th>
                <th scope="col">Deleate</th>
            </tr>
            </thead>
            <tbody>
            @php
            $sl=1;
            @endphp
            @foreach($quiz_list as $quiz)
                <tr>
                    <th scope="row">{{$sl++}}</th>
                    {{-- <td><a href="/add-question/{{$quiz->id}}" target="_blank">{{$quiz->title}}</a></td> --}}
                    <td><a href="/add-question/{{$quiz->id}}" >{{$quiz->title}}</a></td>
                    <td>{{$quiz->from_time}}</td>
                    <td>{{$quiz->to_time}}</td>
                    <td>{{$quiz->duration}} minutes</td>

                    {{-- <td> 
                        <i class="fa-solid fa-trash"></i>
                        <form method="post" action="{{route('quiz_destroy', ['quiz' => $quiz])}}">
                            @csrf 
                            @method('delete')
                            <input type="submit" value="Delete" />
                        </form>
                    </td> --}}
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

</main>

@include('admin.0_bottom_admin_dash')