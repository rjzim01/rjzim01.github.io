@include('admin.0_top_admin_dash')
@include('admin.0_side_admin_dash')
{{-- @include('admin.admin.2_profile_admin_dash') --}}
<main id="main" class="main">
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
            @foreach ($users as $user)
              <tr>
                 <th scope="row">{{$user->id}}</th>
                 <td>{{$user->name}}</td>
                 <td>{{$user->email}}</td>
                 <td>
                    {{-- <i style="margin-right: 10px" class="bi bi-pencil-square" ></i> --}}
                    {{-- <a href="/update-receipe/{{receipe.id}}/" class="btn btn-success m-2">Update</a> --}}
                    {{-- <a href="{{ route('all_user_update') }}" class="bi bi-pencil-square" style="text-decoration: none; margin-right: 10px;"></a> --}}
                    <a href="{{ route('all_user_update', $user->id) }}" class="" style="">
                        <i class="bi bi-pencil-square" ></i> 
                    </a>
                    {{-- <i style="margin-left: 10px" class="bi bi-trash3"></i> --}}
                    <a href="https://www.facebook.com/" style="text-decoration: none; margin-right: 10px; " class="bi bi-trash3"></a>
                 </td>
              </tr>
            @endforeach
          
        </tbody>
      </table>
</main>
@include('admin.0_bottom_admin_dash')