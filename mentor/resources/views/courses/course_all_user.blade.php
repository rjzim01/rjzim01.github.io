
<section class="section dashboard">
    <div class="row">
      
      <!-- Left side columns -->
      <div class="col-lg-12">
        <div class="row">

          @foreach($courseData as $rowInfo)
          <!-- Sales Card -->
          <div class="col-xxl-4 col-md-6" >
            
            <div class="card info-card sales-card">
              
              <div class="filter">
                <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li class="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>

                  <li><a class="dropdown-item" href="#">Today</a></li>
                  <li><a class="dropdown-item" href="#">This Month</a></li>
                  <li><a class="dropdown-item" href="#">This Year</a></li>
                </ul>
              </div>

              {{-- <a href="{{ route('show_video') }}?id={{$rowInfo['id']}}"> --}}
                {{-- <a href="{{route('show_video2', ['courseid' => $rowInfo])}}"> --}}
                  <a href="{{route('show_video2_user', ['courseid' => $rowInfo['id']])}}">
                <div class="card-body">
                  <h5 class="card-title">Sales <span>| Today</span></h5>

                  <div class="d-flex align-items-center">
                    <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i class="bi bi-cart"></i>
                    </div>
                    <div class="ps-3">
                      {{-- <h6>145</h6> --}}
                      <h6>{{$rowInfo['name']}}</h6>
                      <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">increase</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          
          </div><!-- End Sales Card -->
          @endforeach

        </div>
      </div><!-- End Left side columns -->

    </div>
  </section>
  
