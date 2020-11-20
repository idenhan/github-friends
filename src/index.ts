import "./styles.css";
import * as _ from "lodash";

const form = document.getElementById("form");

let user: string = "";
let userData: any;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = (<HTMLInputElement>document.getElementById("username")).value;

  getUserData();

  function getUserData() {
    document.getElementById("result").innerHTML = "";
    fetch("https://api.github.com/search/users?q=" + username + "+in:name&per_page=100")
      .then((result: Response) => result.json())
      .then((data: any) => {
        console.log(data);

        userData = data.items;

        userData.forEach((item: any) => {
          user = `<a target="_blank" href="${item.html_url}"><img class="rounded-circle" width="80" height="80" src="${item.avatar_url}"/></a>`;

          let imageSpan: HTMLSpanElement = document.createElement("div");
          imageSpan.className = "result-image mt-3 mb-3";
          imageSpan.innerHTML = user;

          let nameSpan: HTMLSpanElement = document.createElement("span");
          nameSpan.className = "result-name";
          let nameSpanChild: Text = document.createTextNode(username);
          nameSpan.appendChild(nameSpanChild);

          imageSpan.appendChild(nameSpan);
          let result: HTMLElement = document.getElementById("result");

          result.appendChild(imageSpan);
          // result.appendChild(nameSpan);
        })
      })
  }
})

