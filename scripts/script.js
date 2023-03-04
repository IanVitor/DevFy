const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".bar-progres");
const currentProgress = document.querySelector(".current-progres");
const playButton = document.querySelector("#play-button i");
const playButtonPress = document.querySelector("#play-button");
const audioImg = document.querySelector("#audio-img");
const audioTitle = document.querySelector("#music-title span");
const audioAuthor = document.querySelector("#author-name span");
const audioduration = document.querySelector("#audio-duration span");
const audiocurrent = document.querySelector("#audio-current span");

const db = {"music": [
  {
    "image": "assets/images/FlyMeToTheMoon.jpeg",
    "audio": "assets/music/FlyMeToTheMoon_audio.mp3",
    "title": "Fly Me To The Moon",
    "author": "Frank Sinatra",
    "duration": "147"
  },
  {
    "image": "assets/images/Enemy.jpg",
    "audio": "assets/music/Enemy_audio.mp3",
    "title": "Enemy",
    "author": "Imagine Dragons",
    "duration": "173"
  },
  {
    "image": "assets/images/LandOfFire.jpg",
    "audio": "assets/music/LandOfFire_audio.mp3",
    "title": "Land of fire",
    "author": "Kordheell",
    "duration": "160"
  },
  {
    "image": "assets/images/Sunflower.jpg",
    "audio": "assets/music/Sunflower_audio.mp3",
    "title": "Sunflower",
    "author": "Post Malone, Swae Lee",
    "duration": "162"
  }
]}

const songListLength = db.music.length;
var buttonPlayTrue = true;
var songListIndex = 0;

audio.src = db.music[0].audio;

setData()

function pausar(){
  audio.pause()
}

function play(){
  audio.play()
}

function setData(){
  audio.src = db.music[songListIndex].audio
  audioImg.src = db.music[songListIndex].image
  audioTitle.innerText = db.music[songListIndex].title
  audioAuthor.innerText = db.music[songListIndex].author
  audioduration.innerText = timeConverter(db.music[songListIndex].duration)
}

function tocar(){

  if(!buttonPlayTrue == false){
    playButton.classList.remove('fa-play')
    playButton.classList.add('fa-pause')
    buttonPlayTrue = false
    play()
  }else {
    playButton.classList.add('fa-play')
    playButton.classList.remove('fa-pause')
    buttonPlayTrue = true
    pausar()
  }
}

function changeButtonPlay(){
  if(!buttonPlayTrue == false){
    playButton.classList.remove('fa-play')
    playButton.classList.add('fa-pause')
    buttonPlayTrue = false
    play()
  }
}

function nextSong(){

  if(songListIndex >= songListLength-1){
    songListIndex = 0
  }else {
    songListIndex += 1;
  }

  buttonPlayTrue = true

  setData()
  changeButtonPlay()
}

function previousSong(){
  if(songListIndex <= 0){
    songListIndex = songListLength-1
  }else {
    songListIndex -= 1;
  }

  buttonPlayTrue = true

  setData()
  changeButtonPlay()
}

function updateBar(){
  const audioDuration = db.music[songListIndex].duration
  const barWidth = audio.currentTime/audioDuration*100
  currentProgress.style.setProperty('--progress', `${barWidth}%`)
  audiocurrent.innerText = timeConverter(audio.currentTime)
}

function JumpTo (event){
  const width = progressContainer.clientWidth;
  const audioDuration = db.music[songListIndex].duration
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition/width)* audioDuration;
  audio.currentTime = jumpToTime;
}

function timeConverter(number){
  let hours = Math.floor(number / 3600);
  let min = Math.floor((number - hours * 3600) / 60);
  let secs = Math.floor(number - hours * 3600 - min * 60);

  return `${min}:${secs.toString().padStart(2, '0')}`
}

progressContainer.addEventListener('click', JumpTo);
audio.addEventListener('timeupdate', updateBar);
audio.addEventListener('ended', nextSong);

window.addEventListener('keyup', (e) => {
  if(e.code === 32) {
    tocar()
  }
});