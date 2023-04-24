// auth.js
import { urlWithoutHtml } from "./constants.js";

let info = JSON.parse(localStorage.getItem("authInfo"));
let email = "";

const urlWithoutHash = urlWithoutHtml.slice(0, urlWithoutHtml.lastIndexOf("#"));
const urlWithoutLastSlash = urlWithoutHash.slice(
  0,
  urlWithoutHash.lastIndexOf("/")
);
window.location.hash = "";

async function getUserInfo() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${info["access_token"]}`,
        },
      }
    );
    const data = await response.json();
    email = data.email;
    const res = await fetch("http://localhost:3001/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        image_url: data.picture,
      }),
    });
    const userData = await res.json();
    document.getElementById("name").innerHTML += data.name;
    document.getElementById("image").setAttribute("src", data.picture);
    return userData;
  } catch (error) {
    console.error(error);
  }
}

async function logout() {
  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/revoke?token=${info["access_token"]}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.ok) {
      location.href = `${urlWithoutHtml}/index.html`;
    } else {
      throw new Error("Error revoking access token.");
    }
  } catch (error) {
    console.error(error);
  }
}

export { getUserInfo, logout };
