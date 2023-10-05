
  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets2/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets2/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets2/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets2/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets2/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets2/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets2/vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets2/css/style.css" rel="stylesheet">



<!-- ======= Header ======= -->
<header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">
    
      {{-- <h1 class="logo me-auto"><a href="index.html">Mentor</a></h1> --}}
      <h1 class="logo me-auto"><a href="{{ route('home') }}">Mentor</a></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo me-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar order-last order-lg-0">
        <ul>
          {{-- <li><a class="active" href="index.html">Home</a></li> --}}
          {{-- <a href="{{ route('welcome') }}"> --}}
          <li><a href="{{ route('home') }}">Home</a></li>
          {{-- <li><a href="about.html">About</a></li> --}}
          <li><a href="{{ route('about') }}">About</a></li>
          {{-- <li><a href="courses.html">Courses</a></li> --}}
          <li><a href="{{ route('courses') }}">courses</a></li>
          {{-- <li><a href="trainers.html">Trainers</a></li> --}}
          <li><a href="{{ route('trainers') }}">Trainers</a></li>
          {{-- <li><a href="events.html">Events</a></li> --}}
          <li><a href="{{ route('events') }}">Events</a></li>
          {{-- <li><a href="pricing.html">Pricing</a></li> --}}
          <li><a href="{{ route('pricing') }}">Pricing</a></li>

          <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                <ul>
                    <li><a href="#">Drop Down 1</a></li>
                        <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                                <ul>
                                    <li><a href="#">Deep Drop Down 1</a></li>
                                    <li><a href="#">Deep Drop Down 2</a></li>
                                    <li><a href="#">Deep Drop Down 3</a></li>
                                    <li><a href="#">Deep Drop Down 4</a></li>
                                    <li><a href="#">Deep Drop Down 5</a></li>
                                </ul>
                        </li>
                    <li><a href="#">Drop Down 2</a></li>
                    <li><a href="#">Drop Down 3</a></li>
                    <li><a href="#">Drop Down 4</a></li>
                </ul>
          </li>
          {{-- <li><a href="contact.html">Contact</a></li> --}}
          <li><a href="{{ route('contact') }}">Contact</a></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

      @if (Auth::check())

      {{-- <a href="courses.html" class="get-started-btn">Get Started</a> --}}
      {{-- <a href="{{ route('courses') }}" class="get-started-btn">Get Started</a> --}}

      @else

      <a href="{{ route('get-started') }}" class="get-started-btn">Get Started</a>

      @endif
    

      <!----------------profile part------------ -->
      {{-- <div style="background-color: #ffffff00; margin-top: 13px;" id="header" class="header fixed-top d-flex align-items-center"> --}}

      <nav class="header-nav ms-auto" style="margin-left: 20px;">
        <ul class="d-flex align-items-center" style="margin-left: 20px;">
          {{-- /////1 --}}
          @if (Auth::check())

          <li style="margin-left: 70px;" class="nav-item dropdown pe-3" >

            <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              {{-- <img src="assets2/img/profile-img.jpg" 'upload/no_image.jpg' alt="Profile" class="rounded-circle"> --}}
              <img class="wd-100 rounded-circle"
                                    src="{{ !empty(Auth::user()->photo) ? url('upload/admin_images/' . Auth::user()->photo) : url('assets2/img/profile-img.jpg') }}"
                                    alt="profile">
              {{-- <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span> --}}
              {{-- <span class="d-none d-md-block dropdown-toggle ps-2">{{ Auth::user()->name }}</span> --}}
              {{-- @if (Auth::check()) --}}
              <span class="d-none d-md-block dropdown-toggle ps-2">{{ Auth::user()->name }}</span>
              {{-- @else --}}
              {{-- <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span> --}}
              {{-- @endif --}}
              {{-- <div>{{ Auth::user()->name }}</div> --}}
            </a><!-- End Profile Iamge Icon -->

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                {{-- <h6>Kevin Anderson</h6> --}}
                {{-- @auth
                <h6>{{ Auth::user()->name }}</h6>
                @endauth --}}

                {{-- @if (Auth::check()) --}}
                <h6>{{ Auth::user()->name }}</h6>
                {{-- @else --}}
                {{-- <h6>Kevin Anderson</h6> --}}
                {{-- @endif --}}
                
                {{-- <h6>{{ Auth::user()->name }}</h6> --}}
                
                
                <span>Web Designer</span>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="{{ route('users-profile') }}">
                  {{-- <a href="{{ route('courses') }}" class="get-started-btn">Get Started</a> --}}
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              {{-- 
              <li>
                <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                  <i class="bi bi-gear"></i>
                  <span>Account Settings</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>

              <li>
                <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                  <i class="bi bi-question-circle"></i>
                  <span>Need Help?</span>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li> 

              {{-- //////////////////////////////////////// --}}

              {{-- <li>
                <a class="dropdown-item d-flex align-items-center">
                  <i class="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li> 
              --}}
              <li>
                <form method="POST" action="{{ route('logout') }}">
                @csrf
                  <a class="dropdown-item d-flex align-items-center" href="route('logout')" onclick="event.preventDefault(); this.closest('form').submit();">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </form> 
              </li>

              <!-- Authentication -->
              {{-- <form method="POST" action="{{ route('logout') }}">
                @csrf
                <x-dropdown-link :href="route('logout')" onclick="event.preventDefault();this.closest('form').submit();">
                    {{ __('Log Out') }}
                </x-dropdown-link>
              </form>  --}}

              
              {{-- ///////////////////////////////////// --}}

            </ul><!-- End Profile Dropdown Items -->
          </li><!-- End Profile Nav -->

          {{-- /////2 --}}

          {{-- @else --}}

          {{-- if you do somethis else --}}

          @endif

        </ul>
      </nav><!-- End Icons Navigation -->

    {{-- </div><!-- End Header --> --}}
        
  </div>
  </header><!-- End Header -->