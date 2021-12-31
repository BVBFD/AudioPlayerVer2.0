let track = document.createElement("audio");
let play = document.querySelector("#playSong");
let musicTitle = document.querySelector("#musicTitle");
let musicSinger = document.querySelector("#musicSinger");
let musicImg = document.querySelector("#musicImg");
let durationSlider = document.querySelector("#durationSlider");
let volume = document.querySelector("#volume");
let volume_show = document.querySelector("#volume_show");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let autoPlayBtn = document.querySelector("#autoPlay");

let playingSong = false;
let indexNum = 0;
let autoPlay = false;
let timer;
let volumeTrueFalse = true;

let allSong = [
  {
    name: "Plastic Love.mp3",
    path: "music/타케우치 마리야 - Plastic Love.mp3",
    img: "img/bg.png",
    singer: "타케우치 마리야",
  },
  {
    name: "second song",
    path: "music/타케우치 마리야 - Plastic Love.mp3",
    img: "img/bg.png",
    singer: "2",
  },
  {
    name: "third song",
    path: "music/song3.mp3",
    img: "img/img3.jpg",
    singer: "3",
  },
  {
    name: "fourth song",
    path: "music/song4.mp3",
    img: "img/img4.jpg",
    singer: "4",
  },
  {
    name: "fifth song",
    path: "music/song5.mp3",
    img: "img/img5.jpg",
    singer: "5",
  },
];

const autoPlaySong = () => {
  if (autoPlay === false) {
    autoPlay = true;
    autoPlayBtn.style.background = "#ff8a65";
  } else {
    autoPlay = false;
    autoPlayBtn.style.background = "#798591";
  }
};

const volumeOnOffBtn = () => {
  if (volumeTrueFalse === true) {
    volumeTrueFalse = false;
    muteSound();
  } else {
    volumeTrueFalse = true;
    resetSound();
  }
};

const muteSound = () => {
  track.volume = 0;
  volume.value = 0;
  volume_show.innerHTML = 0;
};

const resetSound = () => {
  track.volume = 0.9;
  volume.value = 90;
  volume_show.innerHTML = 90;
};

const loadTrack = (indexNum) => {
  track.src = allSong[indexNum].path;
  musicImg.src = allSong[indexNum].img;
  musicTitle.innerHTML = allSong[indexNum].name;
  musicSinger.innerHTML = allSong[indexNum].singer;

  total.innerHTML = allSong.length;
  present.innerHTML = indexNum + 1;
};

loadTrack(indexNum);

const playSong = () => {
  playingSong = true;
  play.innerHTML = '<i class="fa fa-pause"></i>';
  timer = setInterval(range_slider, 1000);
  track.play();
};

const stopSong = () => {
  playingSong = false;
  clearInterval(timer);
  play.innerHTML = '<i class="fa fa-play"></i>';
  track.pause();
};

const justPlay = () => {
  if (playingSong === false) {
    playSong();
  } else {
    stopSong();
  }
};

const previousSong = () => {
  if (indexNum > 0) {
    indexNum -= 1;
    loadTrack(indexNum);
    playSong();
  } else {
    indexNum = allSong.length;
    loadTrack(indexNum);
    playSong();
  }
};

const nextSong = () => {
  if (indexNum < allSong.length - 1) {
    indexNum += 1;
    loadTrack(indexNum);
    playSong();
  } else {
    indexNum = 0;
    loadTrack(indexNum);
    playSong();
  }
};

const changeDuration = () => {
  durationSliderPosition = track.duration * (durationSlider.value / 100);
  track.currentTime = durationSliderPosition;
};

const changeVolume = () => {
  volume_show.innerHTML = volume.value;
  track.volume = volume.value / 100;
};

const range_slider = () => {
  let position = 0;
  // update slider position
  if (!isNaN(track.duration)) {
    console.log(track.currentTime);
    console.log(track.duration);
    position = track.currentTime * (100 / track.duration);
    durationSlider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    play.innerHTML = '<i class="fa fa-play"></i>';
    if (autoPlay === true) {
      indexNum += 1;
      loadTrack(indexNum);
      playSong();
    } else {
      stopSong();
    }
  }
};
