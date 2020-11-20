import "./styles.css";
import * as _ from "lodash";

const form = document.getElementById("form");

let user: string = "";
let userData: any;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = (<HTMLInputElement>document.getElementById("username")).value;

  let originalName: string = username.split(" ").join("");

  getUserData();

  function getUserData() {
    document.getElementById("result").innerHTML = "";
    fetch("https://api.github.com/search/users?q=" + originalName + "+in:user&per_page=100")
      .then((result: Response) => result.json())
      .then((data: any) => {
        console.log(data);

        userData = data.items;

        userData.forEach((item: any) => {
          user = `<a target="_blank" href="${item.html_url}"><img class="rounded-circle m-4" width="100" height="100" src="${item.avatar_url}"/></a>`;

          let imageSpan: HTMLSpanElement = document.createElement("span");
          imageSpan.innerHTML = user;

          let result: HTMLElement = document.getElementById("result");

          result.appendChild(imageSpan);
        })
      })
  }
})

