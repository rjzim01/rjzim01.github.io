{{-- @include('users_dashboard.0_top_u_dash') --}}
@include('admin.0_top_admin_dash')

  {{-- @include('users_dashboard.0_side_u_dash') --}}
@include('admin.0_side_admin_dash')

  <style>        

    .drag-area{
    margin: 35px 0px 0px 0px;
    }

</style>

  <main id="main" class="main" style="min-height: 600px">

    <div class="pagetitle">
      <h1>Courses</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Add Course</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <div class="drag-area">
      <form method="post" action="{{ Route('course_store') }}" enctype="multipart/form-data">
      @csrf
          <label for="">Course Name</label>
          <input type="text" name="name"/>
          <br><br>
          <p>
          @if($errors->has('course'))
          {{ $errors->first('course') }}
          @endif
          </p>
          <input type="submit" name="click"/>
      </form>
  </div>

  </main><!-- End #main -->
  
  {{-- @include('users_dashboard.0_bottom_u_dash') --}}
@include('admin.0_bottom_admin_dash')