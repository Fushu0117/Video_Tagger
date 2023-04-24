// constants.js
const url = window.location.href;
const urlWithoutHtml = url.slice(0, url.lastIndexOf("/"));
const urlWithoutHash = urlWithoutHtml.slice(0, urlWithoutHtml.lastIndexOf("#"));
const urlWithoutLastSlash = urlWithoutHash.slice(
  0,
  urlWithoutHash.lastIndexOf("/")
);
const regex = /([^&=]+)=([^&]*)/g;
const params = {};
const videos = document.querySelector("#videos");
const videoDb = document.querySelector("#video-db");
let result = document.querySelector("#result");
const app = document.querySelector("#app");
const info = JSON.parse(localStorage.getItem("authInfo"));
const ACCESS_TOKEN = info["access_token"];

export {
  url,
  urlWithoutHtml,
  urlWithoutHash,
  urlWithoutLastSlash,
  regex,
  params,
  videos,
  videoDb,
  result,
  app,
  ACCESS_TOKEN,
};
