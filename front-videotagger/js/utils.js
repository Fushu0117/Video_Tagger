export function formatTime(secondsNumber) {
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let seconds = Math.floor(secondsNumber % 60);
  return `${hours ? hours + ":" : ""}${minutes ? minutes : "0"}:${
    seconds > 9 ? seconds : "0" + seconds
  }`;
}
