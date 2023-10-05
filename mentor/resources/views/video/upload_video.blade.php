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
    <h1>Upload Video</h1>
    <div class="drag-area">
        <form method="post" action="{{ Route('store_video') }}" enctype="multipart/form-data">
        @csrf
            <label for="">Video Category Name</label>
            <input type="text" name="name"/>
            <br><br>
            <label for="">Video Category Subid as course id</label>
            <input type="text" name="subid"/>
            <hr>
            <label for="">Add title</label>
            <input type="text" name="title"/>
            <br><br>
            <label for="">Add video</label>
            <input type="file" name="video"/>
            <br><br>
            <p>
            @if($errors->has('video'))
            {{ $errors->first('video') }}
            @endif
            </p>
            <input type="submit" name="click"/>
        </form>
    </div>
</main>

{{-- @include('users_dashboard.0_bottom_u_dash') --}}
@include('admin.0_bottom_admin_dash')