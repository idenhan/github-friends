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

              let nameWrapper: HTMLSpanElement = document.createElement("span");
              nameWrapper.className = "col-7 result-name";
              let nameSpan: HTMLSpanElement = document.createElement("span");
              nameSpan.className = "pl-2 pr-2";
              let nameSpanChild: Text = document.createTextNode(userName);
              nameSpan.appendChild(nameSpanChild);
              nameWrapper.appendChild(nameSpan);

              imageSpan.appendChild(nameWrapper);

              // let favStarInput: HTMLInputElement = document.createElement("input");
              // favStarInput.type = "hidden";
              // favStarInput.name = "rating";
              // favStarInput.id = "rating";

              // let favStarUl: HTMLUListElement = document.createElement("ul");

              let favStarLi: HTMLLIElement = document.createElement("li");
              favStarLi.className = "col-2 fav";
              favStarLi.id = "stars";
              let favStarLiChild: Text = document.createTextNode("★");
              favStarLi.appendChild(favStarLiChild);
              fav = favStarLi;

              // favStarUl.appendChild(favStarLi);

              // imageSpan.appendChild(favStarInput);
              imageSpan.appendChild(favStarLi);

              let result: HTMLElement = document.getElementById("result");
              result.appendChild(imageSpan);

              nameSpan.ontouchmove = moveEvent;
              nameSpan.ontouchmove = leaveEvent;

              nameSpan.addEventListener("mousemove", moveEvent);
              nameSpan.addEventListener("mouseleave", leaveEvent)

              function moveEvent(e: any): void {
                e.stopPropagation();
                e.preventDefault();
                nameSpan.style.backgroundColor = "rgb(" + e.offsetX + "," + e.offsetY + ", 60)";
                nameSpan.style.borderRadius = "3px";
                nameSpan.style.color = "white";
              }
              function leaveEvent(e: any): void {
                e.stopPropagation();
                e.preventDefault();
                nameSpan.style.backgroundColor = "white";
                nameSpan.style.color = "black";
              }
            })
        })
      })
  }
})

let triggerNum: number = 0;
let textInput: HTMLElement = document.querySelector('input[type="text"]');
textInput.addEventListener("input", trigger);

function trigger() {
  triggerNum++;
  changeTitle();
}

function changeTitle() {
  let titleRoot: HTMLElement = document.createElement("h3");
  titleRoot.id = "title-root";

  let titleG: HTMLElement = document.createElement("span");
  titleG.id = "title-span";
  titleG.textContent = "G";
  let titleI: HTMLElement = document.createElement("span");
  titleI.id = "title-span";
  titleI.textContent = "I";
  let titleT: HTMLElement = document.createElement("span");
  titleT.id = "title-span";
  titleT.textContent = "T";
  let titleH: HTMLElement = document.createElement("span");
  titleH.id = "title-span";
  titleH.textContent = "H";
  let titleU: HTMLElement = document.createElement("span");
  titleU.id = "title-span";
  titleU.textContent = "U";
  let titleB: HTMLElement = document.createElement("span");
  titleB.id = "title-span";
  titleB.textContent = "B";
  let titleF: HTMLElement = document.createElement("span");
  titleF.id = "title-span";
  titleF.textContent = "F";
  let titleR: HTMLElement = document.createElement("span");
  titleR.id = "title-span";
  titleR.textContent = "R";
  let titleI2: HTMLElement = document.createElement("span");
  titleI2.id = "title-span";
  titleI2.textContent = "I";
  let titleE: HTMLElement = document.createElement("span");
  titleE.id = "title-span";
  titleE.textContent = "E";
  let titleN: HTMLElement = document.createElement("span");
  titleN.id = "title-span";
  titleN.textContent = "N";
  let titleD: HTMLElement = document.createElement("span");
  titleD.id = "title-span";
  titleD.textContent = "D";
  let titleS: HTMLElement = document.createElement("span");
  titleS.id = "title-span";
  titleS.textContent = "S";

  titleRoot.appendChild(titleG);
  titleRoot.appendChild(titleI);
  titleRoot.appendChild(titleT);
  titleRoot.appendChild(titleH);
  titleRoot.appendChild(titleU);
  titleRoot.appendChild(titleB);
  titleRoot.appendChild(titleF);
  titleRoot.appendChild(titleR);
  titleRoot.appendChild(titleI2);
  titleRoot.appendChild(titleE);
  titleRoot.appendChild(titleN);
  titleRoot.appendChild(titleD);
  titleRoot.appendChild(titleS);

  if (triggerNum === 1) {
    let h3 = document.getElementById("title-wrapper");
    h3.appendChild(titleRoot);
    let previousHeader = document.getElementById("title-preHeader");
    previousHeader.style.display = "none";
  }
}


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

