const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const forwardBtn = document.getElementById("forward-btn");
const backwardBtn = document.getElementById("backward-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// play and pause
let isPlaying = false;
function playVideo() {
  video.play();
  progressUpdate();
  pauseBtn();
}

function pauseVideo() {
  video.pause();
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "Play";
}

function pauseBtn() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.title = "Pause";
}

playBtn.addEventListener("click", function () {
  isPlaying ? pauseVideo() : playVideo();
});

video.addEventListener("click", function () {
  isPlaying ? pauseVideo() : playVideo();
});
// video.addEventListener("dblclick", toggleFullscreen);

// speed change
speed.addEventListener("change", function (e) {
  video.playbackRate = e.target.value;
});

// full screen
let isFullscreen = false;

function toggleFullscreen() {
  isFullscreen ? closeFullscreen() : openFullscreen();
}

function openFullscreen() {
  isFullscreen = true;
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.webkitRequestFullscreen) {
    /* Safari */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) {
    /* IE11 */
    player.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);

// setting time 00:00 / 00:00

function convertTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 9 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

function changeTime() {
  currentTime.textContent = convertTime(video.currentTime);
  duration.textContent = `/ ${convertTime(video.duration)}`;
  updateProgressbar();
}

video.addEventListener("timeupdate", changeTime);

if (video.ended) {
  pauseBtn();
}

function updateProgressbar() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

// control volume
function volumeControl(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volumeBar.style.width = volume * 100 + "%";
  if (volume === 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (volume > 0 && volume <= 0.6) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
  video.volume = volume;
}

volumeRange.addEventListener("click", volumeControl);

// mute / unmute

function toggleSound() {
  video.muted ? unmuteVideo() : muteVideo();
}

function muteVideo() {
  video.muted = true;
  volumeBar.style.width = 0 + "%";
  volumeIcon.className = "fas fa-volume-mute";
  volumeIcon.title = "unmute";
}
function unmuteVideo() {
  video.muted = false;
  volumeIcon.className = "fas fa-volume-up";
  volumeIcon.title = "mute";
  volumeBar.style.width = 100 + "%";
}

volumeIcon.addEventListener("click", toggleSound);

// update progressbar
function progressUpdate() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
}

function seekProgressbar(e) {
  let seek = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${seek * 100}%`;
  video.currentTime = seek * video.duration;
}

progressRange.addEventListener("click", seekProgressbar);

// forward backward
function forwardProgress() {
  video.currentTime = video.currentTime + 5;
}
function bakwardProgress() {
  video.currentTime = video.currentTime - 5;
}
forwardBtn.addEventListener("click", forwardProgress);
backwardBtn.addEventListener("click", bakwardProgress);
