@include('admin.0_top_admin_dash')

@include('admin.0_side_admin_dash')

<main id="main" class="main" style="min-height: 600px">

    <div class="pagetitle">
        <h1>Add New Quiz</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="">Home</a></li>
                <li class="breadcrumb-item active">quiz</li>
            </ol>
        </nav>
    </div>

    <div>
        <div>
            <div>
                <form method="post" action="{{route('store_quiz')}}">
                    @csrf
                    <div class="form-group mb-3 mt-3">
                        <input type="text" placeholder="Quiz Title" name="title" required class="form-control">
                        <br>
                        <label>Valid From</label>
                        <input name="from_time" type="datetime-local">

                        <label>Valid Till</label>
                        <input name="to_time" type="datetime-local">
                    </div>

                    <div class="form-group mb-3">
                        <input class="form-control" placeholder="Duration in Minute" name="duration" type="number" required>
                    </div>

                    <button class="btn btn-primary" type="submit">Submit</button>

                </form>
            </div>
        </div>
    </div>

</main>

@include('admin.0_bottom_admin_dash')