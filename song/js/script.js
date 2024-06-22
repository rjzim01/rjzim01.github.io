let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let e1 = document.querySelector('#e1');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

let timer;
let autoplay = 0;
let loop = 0;

let index_no = 0;
let Playing_song = false;

let track = document.createElement('audio');

let All_song = [{
        name: "Only Music",
        path: "music/1_theme.mp3",
        img: "img/1_img.png",
        singer: "just wow"
    },
    {
        name: "Majhe Majhe",
        path: "music/2_Majhe_Majhe_Tobo_Arindom.mp3",
        img: "img/2_img.png",
        singer: "!sad"
    },
    {
        name: "Samajagavana",
        path: "music/3_samajagavana.mp3",
        img: "img/3_img.png",
        singer: "telegu"
    },
    {
        name: "Evaly",
        path: "music/4_evaly.mp3",
        img: "img/4_img.png",
        singer: "!marketing"
    },
    {
        name: "Sundor Konna",
        path: "music/5_sundor_konna.mp3",
        img: "img/5.jpg",
        singer: "!important"
    },
    {
        name: "Dhoro Jodi",
        path: "music/6_dhorojodi.mp3",
        img: "img/6_dhoro.png",
        singer: "!Sad"
    },
    {
        name: "Lamborgini",
        path: "music/7_lamborgini.mp3",
        img: "img/7_lamborgini.jpg",
        singer: "!Strong"
    },
    {
        name: "Srotoshinni",
        path: "music/8_srotoshini.mp3",
        img: "img/8_Srotoshinni.png",
        singer: "!Strong"
    },
    {
        name: "jannat",
        path: "music/9_jannat.mp3",
        img: "img/9_jannat.jpg",
        singer: "forLove"
    },
    {
        name: "jokhon",
        path: "music/10_jokhon_porbe_na_mor.mp3",
        img: "img/10_jodiAmar.png",
        singer: "Revealed"
    },
    {
        name: "BeSuccessFull",
        path: "music/11_theme.mp3",
        img: "img/11_music2.png",
        singer: "AchieveTheGoal"
    },
    {
        name: "LoL",
        path: "music/12_lol.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Gangstar",
        path: "music/13_gangstar.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "khoparBadhon",
        path: "music/14_Alga_korogo_khopar_badhon.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Komolay",
        path: "music/15_Komolay_Nrityo_Kore.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Butapomma",
        path: "music/16_butapomma.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Ramulo",
        path: "music/17_ramulo.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Dhundne",
        path: "music/18_dhundne.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    },
    {
        name: "Abaro",
        path: "music/19_abaro.mp3",
        img: "img/12_lol.jpg",
        singer: "AchieveTheGoal"
    }
];

function load_track(index_no) {
    clearInterval(timer);
    reset_slider();

    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
}

load_track(index_no);

function mute_sound() {
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

function justplay() {
    if (Playing_song == false) {
        playsong();

    } else {
        pausesong();
    }
}

function reset_slider() {
    slider.value = 0;
}

function playsong() {
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pausesong() {
    track.pause();
    Playing_song = false;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        load_track(index_no);
        playsong();
    } else {
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        load_track(index_no);
        playsong();

    } else {
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
}

function volume_change() {
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function autoplay_switch() {
    if (autoplay == 1) {
        autoplay = 0;
        auto_play.style.background = "rgba(255,255,255,0.2)";
    } else {
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}

function range_slider() {
    let position = 0;

    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }

    if (track.ended) {
        play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if (autoplay == 1) {
            index_no += 1;
            load_track(index_no);
            playsong();
        }
    }
}

function enableLoop() { 
    if (loop == 1) {
        loop = 0;
        track.loop = false;
        e1.style.background = "rgba(161, 161, 161, 0.2)";
        document.getElementById("e1").innerHTML = "Enable loop";
    } else {
        loop = 1;
        track.loop = true;
        e1.style.background = "rgba(104, 103, 103, 0.2)";
        document.getElementById("e1").innerHTML = "Disable loop";
    }
} 

