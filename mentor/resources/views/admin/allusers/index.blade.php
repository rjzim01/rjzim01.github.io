<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <h1>All User</h1>
    <table class="table" style="border:1px solid">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
            @foreach ($user as $user)
              <tr>
                 <th scope="row">{{$user->id}}</th>
                 <td>{{$user->name}}</td>
                 <td>{{$user->email}}</td>
                 <td>
                    {{-- <i style="margin-right: 10px" class="bi bi-pencil-square" ></i> --}}
                    {{-- <a href="/update-receipe/{{receipe.id}}/" class="btn btn-success m-2">Update</a> --}}
                    {{-- <a href="{{ route('all_user_update') }}" class="bi bi-pencil-square" style="text-decoration: none; margin-right: 10px;"></a> --}}
                    <a href="{{ route('allusers.edit', $user->id) }}" class="" style="">
                        <i class="bi bi-pencil-square" ></i>h
                    </a>
                    {{-- <i style="margin-left: 10px" class="bi bi-trash3"></i> --}}
                    <a href="https://www.facebook.com/" style="text-decoration: none; margin-right: 10px; " class="bi bi-trash3"></a>
                 </td>
              </tr>
            @endforeach
          
        </tbody>
      </table>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>