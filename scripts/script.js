const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".bar-progres");
const currentProgress = document.querySelector(".current-progres");
const playButton = document.querySelector("#play-button i");

var buttonPlayTrue = true;

const songList = [
  'assets/music/audio1.mp3',
  'assets/music/audio2.mp3',
  'assets/music/audio3.mp3',
  'assets/music/audio4.mp3'
]

const songListLength = songList.length;
var songListIndex = 0;

audio.src = songList[0];

function pausar(){
  audio.pause()
}

function tocar(){
  if(!buttonPlayTrue == false){
    playButton.classList.remove('fa-play')
    playButton.classList.add('fa-pause')
    buttonPlayTrue = false
    audio.play()
  }else {
    playButton.classList.add('fa-play')
    playButton.classList.remove('fa-pause')
    buttonPlayTrue = true
    pausar()
  }
}

function nextSong(){

  if(songListIndex >= songListLength-1){
    songListIndex = 0
  }else {
    songListIndex += 1;
  }

  buttonPlayTrue = true

  audio.src = songList[songListIndex]
  if(!buttonPlayTrue == false){
    playButton.classList.remove('fa-play')
    playButton.classList.add('fa-pause')
    buttonPlayTrue = false
    audio.play()
  }
}

function previousSong(){
  if(songListIndex <= 0){
    songListIndex = songListLength-1
  }else {
    songListIndex -= 1;
  }

  buttonPlayTrue = true

  audio.src = songList[songListIndex]
  if(!buttonPlayTrue == false){
    playButton.classList.remove('fa-play')
    playButton.classList.add('fa-pause')
    buttonPlayTrue = false
    audio.play()
  }
}