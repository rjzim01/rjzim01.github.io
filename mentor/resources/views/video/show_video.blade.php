@include('admin.0_top_admin_dash')

@include('admin.0_side_admin_dash')

    <style>

        .heading{
            color: #444;
            font-size: 40px;
            text-align: center;
            padding: 10px;
        }

        .container{
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 15px;
            align-items: flex-start;
            margin-top: 0px;
        }

        .container .main-video{
            background: #fff;
            border-radius: 5px;
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
            font-size: 17px;
        }

        .count_li{
            margin-left: 600px;
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
            .count_li{
                margin-left: 250px;
            }

        }



    </style>
    
<main id="main" class="main" style="min-height: 600px">

    <div class="pagetitle">
        <h1 class="count1">Video</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item active">{{ $course_data->name }}</li>
                <li class="breadcrumb-item count_li" id="count">0</li>
                {{-- <li class="breadcrumb-item" id="t-count">0</li> --}}
            </ol>
            {{-- <p id="count">0</p> --}}
        </nav>
    </div>

    <div class="container">
        
        <div class="main-video">
            <div class="video">
                <video src="" controls autoplay muted></video>
                <h3 class="title1"></h3>
            </div>
        </div>
        <div class="video-list">
            
            @foreach($data as $row)
            <div class="vid">
                <video src="{{asset('video')}}/{{$row['video']}}" muted></video>
                <h3 class="title1">{{' - '.$row['title']}}</h3>
                {{-- <h3 class="title1 " id="status" ></h3> --}}
            </div>
            @endforeach
        </div>

    </div>

</main>

<script>

    let listVideo = document.querySelectorAll('.video-list .vid');
    let mainVideo = document.querySelector('.main-video video');
    let title = document.querySelector('.main-video .title1');
    let currentVideoIndex = 0;
    var count = document.querySelector('.pagetitle .count');
    var a = 0;
    var y = document.getElementById('count');
    // var status = document.getElementById('status');

    //status.style.display = "none";

    mainVideo.onended = function() {
        a++;
        y.innerHTML = a;
        // status.innerHTML = "_complete";
    };
    
  
    listVideo.forEach(video => {
        video.onclick = () => {
            listVideo.forEach(vid => vid.classList.remove('active'));
            video.classList.add('active');
            if(video.classList.contains('active')) {
                let src = video.children[0].getAttribute('src');
                mainVideo.src = src;
                let text = video.children[1].innerHTML;
                title.innerHTML = text;
                // if(mainVideo.ended) {
                //     count.innerHTML = "h";
                // };
            };
        };
    });

</script> 

@include('admin.0_bottom_admin_dash')


