@include('users_dashboard.0_top_u_dash')

  <!-- ======= Sidebar ======= -->
@include('users_dashboard.0_side_u_dash')


<style>
    
    .heading{
        color: #444;
        font-size: 40px;
        text-align: center;
        padding: 10px;
        /* margin-top: 70px; */
    }

    .container{
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 15px;
        align-items: flex-start;
        /* padding: 5px 5%; */
        margin-top: 0px;
        /* margin-left: 250px; */
    }

    .container .main-video{
        background: #fff;
        border-radius: 5px;
        /* padding: 10px; */
        /* visibility: hidden; */
    }

    .container .main-video video{
        width: 100%;
        border-radius: 5px;
    }

    .container .main-video .title{
        color: #333;
        font-size: 23px;
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .container .video-list{
        background: #fff;
        border-radius: 5px;
        height: 520px;
        overflow-y: scroll;
    }

    .container .video-list::-webkit-scrollbar{
        width: 7px;
    }

    .container .video-list::-webkit-scrollbar-track{
        background: #ccc;
        border-radius: 50px;
    }

    .container .video-list::-webkit-scrollbar-thumb{
        background: #666;
        border-radius: 50px;
    }

    .container .video-list .vid video{
        width: 100px;
        border-radius: 5px;
    }

    .container .video-list .vid{
        display: flex;
        align-items: center;
        gap: 15px;
        background: #f7f7f7;
        margin: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.1);
        cursor: pointer;
    }

    .container .video-list .vid:hover{
        background: #eee;
    }

    .container .video-list .vid.active{
        background: #2980b9;
    }

    .container .video-list .vid.active .title1{
        /* background: #fff; */
    }

    .container .video-list .vid .title1{
        /* background: #333; */
        font-size: 17px;
    }

    @media (max-width:991px){
        
        .container{
            grid-template-columns: 1.5fr 1fr;
            padding: 10px;
        }

    }

    @media (max-width:768px){
        
        .container{
            grid-template-columns: 1fr;
        }

    }
</style>
    
<main id="main" class="main" style="min-height: 600px">

    {{-- <h3 class="heading">Video Gallery</h3> --}}
    <div class="pagetitle">
        <h1>Videos</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                {{-- <li class="breadcrumb-item active">Videos</li> --}}
                <li class="breadcrumb-item active">{{ $courseid->name }}</li>
                <li class="breadcrumb-item active">Hello</li>
            </ol>
        </nav>
    </div>
    {{-- @foreach($data as $row) --}}
    {{-- <video width="320" height="240" controls autoplay > 
    <source src="{{asset('video')}}/{{$row['video']}}" type="video/mp4">
    </video>
    --}}
    {{-- @endforeach --}}
    
    <div class="container">
        
        <div class="main-video">
            
            <div class="video">
                <video src=""  controls autoplay></video>
                <h3 class="title1"></h3>
            </div>

            <div class="text">
                <h3>Video will play here</h3>
            </div>

        </div>
        
        <div class="video-list">
            @foreach($data as $row)
            
            {{-- @foreach($course_video as $row) --}}
            {{-- @foreach($course_video_a as $row) --}}
            <div class="vid">
                
                <video src="{{asset('video')}}/{{$row['video']}}" muted></video>
                {{-- <h3 class="title1">{{$row['id'].' - '.$row['title']}}</h3> --}}
                <h3 class="title1">{{' - '.$row['title']}}</h3>
            </div>
            {{--             
            <div class="vid">
                <video src="video/vid-2.mp4" muted></video>
                <h3>Video 2 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-3.mp4" muted></video>
                <h3>Video 3 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-2.mp4" muted></video>
                <h3>Video 4 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-1.mp4" muted></video>
                <h3>Video 5 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-2.mp4" muted></video>
                <h3>Video 6 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-1.mp4" muted></video>
                <h3>Video 7 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-2.mp4" muted></video>
                <h3>Video 8 title goes here</h3>
            </div>
            <div class="vid">
                <video src="video/vid-1.mp4" muted></video>
                <h3>Video 9 title goes here</h3>
            </div> 
            --}}
            @endforeach
        </div>
    </div>
</main>
    
<script>
    //#1let listVideo = document.querySelectorAll('.video-list .vid video');
    let listVideo = document.querySelectorAll('.video-list .vid');
    let mainVideo = document.querySelector('.main-video video');
    let mainText = document.querySelector('.text');
    let title = document.querySelector('.main-video .title1');
    let currentVideoIndex = 0;
  
    //1-> trying to auto play one after one but diddent change the active color for #1
    // function playNextVideo() {
    //   listVideo[currentVideoIndex].classList.remove('active');
    //   currentVideoIndex = (currentVideoIndex + 1) % listVideo.length;
    //   const nextVideo = listVideo[currentVideoIndex];
    //   nextVideo.classList.add('active');
    //   const src = nextVideo.getAttribute('src');
    //   const text = nextVideo.nextElementSibling.innerHTML;
    //   mainVideo.src = src;
    //   title.innerHTML = text;
    //   mainVideo.play();
    // }
  
    // listVideo.forEach((video, index) => {
    // video.addEventListener('ended', playNextVideo);
    // video.addEventListener('click', () => {
    //     listVideo[currentVideoIndex].classList.remove('active');
    //     currentVideoIndex = index;
    //     video.classList.add('active');
    //     const src = video.getAttribute('src');
    //     const text = video.nextElementSibling.innerHTML;
    //     mainVideo.src = src;
    //     title.innerHTML = text;
    //     mainVideo.play();
    //   });
    // });
  
    // mainVideo.addEventListener('ended', playNextVideo);

    //////////////////////////////////////////////////////
    //#2 -> without auto play video
    mainVideo.style.display = "none";
    mainText.style.display = "block";
    listVideo.forEach(video => {
        video.onclick = () => {
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            //mainVideo.show();
            mainVideo.style.display = "block";
            mainText.style.display = "none";
            if(video.classList.contains('active')){
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;
            };
        };
    });

</script>

{{-- 
</body>
</html> 
--}}

@include('users_dashboard.0_bottom_u_dash')


