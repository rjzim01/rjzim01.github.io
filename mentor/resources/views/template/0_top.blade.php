<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Mentor</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  
  <link href="{{ asset('assets/img/study.jpg') }}" rel="icon">
  <link href="{{ asset('assets/img/study.jpg') }}" rel="apple-touch-icon"> 


  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="{{ asset('assets/vendor/animate.css/animate.min.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/aos/aos.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/remixicon/remixicon.css') }}" rel="stylesheet">
  <link href="{{ asset('assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="{{ asset('assets/css/style.css') }}" rel="stylesheet">

</head>

<body>

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
          {{-- <li><a href="{{ route('courses') }}">courses</a></li> --}}
          @if (Auth::check())
            <li><a href="{{ route('courses') }}">courses</a></li>
          @else

          <li><a href="{{ route('coursess') }}">courses</a></li>

          @endif
          {{-- <li><a href="{{ route('courses') }}">courses</a></li> --}}
          {{-- <li><a href="trainers.html">Trainers</a></li> --}}
          {{-- <li><a href="{{ route('trainers') }}">Trainers</a></li> --}}
          {{-- <li><a href="events.html">Events</a></li> --}}
          {{-- <li><a href="{{ route('events') }}">Events</a></li> --}}
          {{-- <li><a href="pricing.html">Pricing</a></li> --}}
          {{-- <li><a href="{{ route('pricing') }}">Pricing</a></li> --}}

          {{-- 
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
           --}}

          {{-- <li><a href="{{ route('contact') }}">Contact</a></li> --}}
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
      

      <nav class="header-nav ms-auto" style="margin-left: 20px;">
        <ul class="d-flex align-items-center" style="margin-top: 0px; margin-bottom: 0px;">
          @if (Auth::check())

            {{-- <li style="margin-left: 70px;" class="nav-item dropdown pe-3" > --}}

            <a style="margin-left: 20px;" class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">

              <img style="height: 30px; width: 30px;" class="wd-100 rounded-circle" src="{{ !empty(Auth::user()->photo) ? url('upload/admin_images/' . Auth::user()->photo) : url('assets2/img/profile-img.jpg') }}" alt="profile">

              <span class="d-none d-md-block dropdown-toggle ps-2">{{ Auth::user()->name }}</span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li class="dropdown-header">
                <h6>{{ Auth::user()->name }}</h6>
                <span>Web Designer</span>
              </li>

              <li>
                <hr class="dropdown-divider">
              </li>

              {{-- <li>
                <a class="dropdown-item d-flex align-items-center" href="{{ route('users-profile') }}">
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li> --}}
              @if (Auth::user()->role === 'admin' )
                <a class="dropdown-item d-flex align-items-center" href="{{ route('admin-profile') }}">
                  {{-- <a href="{{ route('courses') }}" class="get-started-btn">Get Started</a> --}}
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              @else
                <a class="dropdown-item d-flex align-items-center" href="{{ route('users-profile') }}">
                  {{-- <a href="{{ route('courses') }}" class="get-started-btn">Get Started</a> --}}
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              @endif
                
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <form method="POST" action="{{ route('logout') }}">
                @csrf
                  <a class="dropdown-item d-flex align-items-center" href="route('logout')" onclick="event.preventDefault(); this.closest('form').submit();">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </form> 
              </li>

            </ul>
            {{-- </li> --}}

          @endif

        </ul>
      </nav>

      @if (Auth::check())

      @else

      <a href="{{ route('get-started') }}" class="get-started-btn-top" >Get Started</a>

      @endif

    </div>
  </header>
