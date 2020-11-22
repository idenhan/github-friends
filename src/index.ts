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

const form: HTMLElement = document.getElementById("form");
const local: HTMLElement = document.getElementById("local");
let fav: HTMLElement;

let userImage: string = "";
let userName: string = "";
let userData: any;

form.addEventListener("submit", function (e): void {
  e.preventDefault();

  if (typeof (localStorage) === "undefined") {
    alert("현재 웹 환경에서 작동이 제한적입니다. 크롬 혹은 다른 브라우저에서 접속해주시기 바랍니다");
  }

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
          imageSpan.className = "row result-wrapper pt-3 pb-3";
          let imageSpanChild: HTMLSpanElement = document.createElement("span");
          imageSpanChild.className = "col-3 result-image";
          imageSpanChild.innerHTML = userImage;
          imageSpan.appendChild(imageSpanChild);

          fetch("https://api.github.com/users/" + userName, new AppRequestInit())
            .then((nameResult: Response) => nameResult.json())
            .then((nameData: any) => {
              console.log(nameData);

              userName = nameData.name;
              console.log(userName);

              let nameSpan: HTMLSpanElement = document.createElement("span");
              nameSpan.className = "col-7 result-name";
              let nameSpanChild: Text = document.createTextNode(userName);
              nameSpan.appendChild(nameSpanChild);

              imageSpan.appendChild(nameSpan);

              // let favStarInput: HTMLInputElement = document.createElement("input");
              // favStarInput.type = "hidden";
              // favStarInput.name = "rating";
              // favStarInput.id = "rating";

              // let favStarUl: HTMLUListElement = document.createElement("ul");

              let favStarLi: HTMLLIElement = document.createElement("li");
              favStarLi.className = "col-2 fav";
              let favStarLiChild: Text = document.createTextNode("★");
              favStarLi.appendChild(favStarLiChild);
              fav = favStarLi;

              // favStarUl.appendChild(favStarLi);

              // imageSpan.appendChild(favStarInput);
              imageSpan.appendChild(favStarLi);

              let result: HTMLElement = document.getElementById("result");

              result.appendChild(imageSpan);
            })
        })
      })
  }
})


// local.addEventListener("submit", function (e) {
//   e.preventDefault();
//   a();

//   function a() {
//     console.log(userData);
//     console.log(111);
//   }

// fav.onclick = function (e) {
//   e.preventDefault();
// }

// function currentAddFav() {

// }
// // })
// local.onclick = function (e) {
//   e.preventDefault();

// }
// function a() {
//   local.click();
// }

// a();
