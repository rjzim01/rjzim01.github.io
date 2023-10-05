{{-- @include('users_dashboard.0_top_u_dash') --}}
@include('admin.0_top_admin_dash')

  {{-- @include('users_dashboard.0_side_u_dash') --}}
  @include('admin.0_side_admin_dash')

  <main id="main" class="main" style="min-height: 600px">

    <div class="pagetitle">
      <h1>Courses</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">All Courses</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    @include('courses.course_all_admin')

  </main><!-- End #main -->

  {{-- @include('users_dashboard.0_bottom_u_dash') --}}
@include('admin.0_bottom_admin_dash')

{{-- 
@include('admin.admin.0_top_admin_dash')
@include('admin.admin.0_side_admin_dash')
@include('admin.admin.0_bottom_admin_dash')
--}}