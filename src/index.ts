"use strict"
import "../public/styles.css";
import * as _ from "lodash";
import AppRequestInit from "./Classes/appRequestInit";
import IsUser from "./Interfaces/isUser";

const form: HTMLElement = document.getElementById("form");

let userImage: string = "";
let userName: string = "";
let userData: any;
let url: string = "https://api.github.com/";
let user: IsUser;
let userAll: IsUser[] = [];

form.addEventListener("submit", getUserData);

async function getUserData(e: any): Promise<void> {
  e.preventDefault();
  document.getElementById("result").textContent = "";
  const username: string | number = (<HTMLInputElement>document.getElementById("username")).value;

  try {
    const response = await fetch(url + "search/users?q=" + username + "+in:name&per_page=100", new AppRequestInit());
    const data = await response.json();
    userData = data.items;
  } catch (err) {
    err = "서버와의 연결에 실패했습니다.";
    alert(err);
  }

  getUserNameAndImage();
}

function getUserNameAndImage(): void {
  userData.map((item: any) => {
    userName = item.login;
    userImage = `<a target="_blank" href="${item.html_url}"><img class="rounded-circle" width="80" height="80" src="${item.avatar_url}"/></a>`;

    let imageSpan: HTMLSpanElement = document.createElement("div");
    imageSpan.className = "row result-wrapper pt-3 pb-3";
    let imageSpanChild: HTMLSpanElement = document.createElement("span");
    imageSpanChild.className = "col-3 result-image";
    imageSpanChild.innerHTML = userImage;
    imageSpan.appendChild(imageSpanChild);

    fetch(url + "users/" + userName, new AppRequestInit())
      .then((nameResult: Response) => nameResult.json())
      .then((nameData: any) => {
        userName = nameData.name;
        localStorage.name = JSON.stringify(userName);

        let nameWrapper: HTMLSpanElement = document.createElement("span");
        nameWrapper.className = "col-7 result-name";
        let nameSpan: HTMLSpanElement = document.createElement("span");
        nameSpan.className = "pl-3 pr-3";
        let nameSpanChild: Text = document.createTextNode(userName);
        nameSpan.appendChild(nameSpanChild);
        nameWrapper.appendChild(nameSpan);
        imageSpan.appendChild(nameWrapper);
        const hash = (username: string) => username.length;
        let favStarLi: HTMLLIElement = document.createElement("li");
        favStarLi.className = "col-2 fav";
        const starWithUserName = `${userName}-star`;
        favStarLi.id = starWithUserName;
        favStarLi.setAttribute('src', item.avatar_url);
        if (!localStorage.userAll) {
          localStorage.userAll = JSON.stringify([]);
        }
        const userArr = JSON.parse(localStorage.userAll);

        if (userArr[hash(userName)] && userName in userArr[hash(userName)]) {
          favStarLi.classList.add('sub');
        }
        favStarLi.onclick = (e) => starEvent(e);

        let favStarLiChild: Text = document.createTextNode("★");
        favStarLi.appendChild(favStarLiChild);
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

        function starEvent(e: any) {
          const uName = e.target.id.replace('-star', '');

          let userList = JSON.parse(localStorage.userAll);
          const index = hash(uName);
          let tag = document.getElementById(e.target.id);
          const url = tag.getAttribute('src');
          tag.classList.add('sub');
          if (userList[index] && uName in userList[index]) {
            tag.classList.remove('sub');
            delete userList[index][uName];
            localStorage.userAll = JSON.stringify(userList);

          } else {
            if (userList[index]) {
              userList[index][uName] = { username: uName, url: url };
              localStorage.userAll = JSON.stringify(userList);
            } else {
              userList[index] = { [uName]: { username: uName, url: url } };
              localStorage.userAll = JSON.stringify(userList);
            }
          }
        }
      })
      .catch((err: any) => {
        err = "서버와의 연결에 실패했습니다";
        alert(err);
      })
  })
}

let triggerNum: number = 0;
let textInput: HTMLElement = document.querySelector('input[type="text"]');
textInput.addEventListener("input", trigger);

function trigger(): void {
  triggerNum++;
  changeTitle();
}

function changeTitle(): void {
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