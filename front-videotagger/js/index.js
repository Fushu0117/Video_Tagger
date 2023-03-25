import CustomRange from "./CustomRange.js";
import VideoPlayer from "./VideoPlayer.js";

let player = new VideoPlayer();

customElements.define("custom-range", CustomRange);

const dropZone = document.querySelector(".drop-zone");
let fs;
dropZone.addEventListener("drop", (e) => {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  fs = files;
  let video = document.querySelector(".armas-videoplayer__video");
  video.src = URL.createObjectURL(fs[0]);
  video.load();
  player.reset();
});
dropZone.addEventListener("dragover", (e) => {
  e.stopPropagation();
  e.preventDefault();
});
dropZone.addEventListener("dragenter", (e) => {
  e.stopPropagation();
  e.preventDefault();
});
