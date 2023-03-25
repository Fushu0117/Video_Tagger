const $ = (selector) => document.querySelector(selector);

const video = $("#my-video");
const playPauseBtn = $("#play-pause-btn");
const seekBar = $("#seek-bar");
const muteBtn = $("#mute-btn");
const volumeBar = $("#volume-bar");
const addNoteBtn = $("#add-note-btn");
const noteList = $("#note-list");

playPauseBtn.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseBtn.textContent = "Pause";
  } else {
    video.pause();
    playPauseBtn.textContent = "Play";
  }
});

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progress = (currentTime / duration) * 100;
  seekBar.value = progress;
});

seekBar.addEventListener("input", () => {
  const progress = seekBar.value;
  const duration = video.duration;
  const currentTime = (progress / 100) * duration;
  video.currentTime = currentTime;
});

muteBtn.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.textContent = "Mute";
    volumeBar.value = video.volume;
  } else {
    video.muted = true;
    muteBtn.textContent = "Unmute";
    volumeBar.value = 0;
  }
});

volumeBar.addEventListener("input", () => {
  video.volume = volumeBar.value;
});

/**
 * add custom note to video in a determined timestamp and show it in the list and add css style to it
 */

addNoteBtn.addEventListener("click", () => {
  const note = prompt("Enter your note");
  const currentTime = video.currentTime;
  const noteItem = document.createElement("li");
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const time = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  noteItem.textContent = `${note} @ ${time}`;
  noteItem.style.cursor = "pointer";
  noteList.appendChild(noteItem);
});

/**
 * make custom note time stamp clickable and jump to that time
 */

noteList.addEventListener("click", (e) => {
  const noteItem = e.target;
  const noteTime = noteItem.textContent.split("@")[1].trim();
  const [minutes, seconds] = noteTime.split(":");
  const currentTime = parseInt(minutes) * 60 + parseInt(seconds);
  video.currentTime = currentTime;
});
