import "./styles.css";
import * as _ from "lodash";
import { MY_TOKEN_NUMBERS } from "./Constants/apiConstants";

export default class AppRequestInit implements RequestInit {
  public method: string = "GET";
  public headers: Headers = new Headers();
  public mode: RequestMode = "cors";

  constructor() {
    this.headers.set("Content-Type", "text/json;charset=utf-8");
    this.headers.append("Authorization", `Bearer ${MY_TOKEN_NUMBERS}`);
  }
}

const form = document.getElementById("form");

let userImage: string = "";
let userName: string = "";
let userData: any;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = (<HTMLInputElement>document.getElementById("username")).value;

  getUserData();

  function getUserData() {
    document.getElementById("result").innerHTML = "";
    fetch("https://api.github.com/search/users?q=" + username + "+in:name&per_page=100", new AppRequestInit())
      .then((result: Response) => result.json())
      .then((data: any) => {
        console.log(data);

        userData = data.items;

        userData.map((item: any) => {
          userImage = `<a target="_blank" href="${item.html_url}"><img class="rounded-circle" width="80" height="80" src="${item.avatar_url}"/></a>`;
          userName = item.login;
          console.log(userName);

          let imageSpan: HTMLSpanElement = document.createElement("div");
          imageSpan.className = "result-image mt-3 mb-3";
          imageSpan.innerHTML = userImage;

          fetch("https://api.github.com/users/" + userName, new AppRequestInit())
            .then((nameResult: Response) => nameResult.json())
            .then((nameData: any) => {
              console.log(nameData);

              userName = nameData.name;
              console.log(userName);

              let nameSpan: HTMLSpanElement = document.createElement("span");
              nameSpan.className = "result-name";
              let nameSpanChild: Text = document.createTextNode(userName);
              nameSpan.appendChild(nameSpanChild);

              imageSpan.appendChild(nameSpan);
              let result: HTMLElement = document.getElementById("result");

              result.appendChild(imageSpan);
            })
        })
      })
  }
})

