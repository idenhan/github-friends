"use strict"
import "../public/styles.css";
import * as _ from "lodash";
import AppRequestInit from "./Classes/appRequestInit";

// Declare variables globally
const form: HTMLElement = document.getElementById("form");
const api: HTMLElement = document.getElementById("api");
const local: HTMLElement = document.getElementById("local");

let userImage: string = "";
let userName: string = "";
let userData: any;
let url: string = "https://api.github.com/";

// Function getUserData works when users click the search button
form.addEventListener("submit", getUserData);

// Get user data from Github api
async function getUserData(e: any) {
  // Prevent event bubbling
  e.preventDefault();

  const username: string | number = (<HTMLInputElement>document.getElementById("username")).value;

  // Get Data searched less than 100
  try {
    const response = await fetch(url + "search/users?q=" + username + "+in:name&per_page=100", new AppRequestInit());
    const data = await response.json();
    userData = data.items;

  } catch (err) {

    // 
    console.error(err);
  }
  getUserNameAndImage();
}

// Get all searched user's real name and image url then print them on browser
function getUserNameAndImage(): void {
  let front: any;
  let a = document.querySelector("#result");
  let d = document.getElementById("result2");
  d.style.display = 'none';
  let b = document.getElementById("container");
  b.removeChild(a);
  let c = document.createElement("div");
  c.id = "result";
  b.appendChild(c);

  userData.map((item: any) => {
    userName = item.login;
    // Get users image urls
    userImage = `<a target="_blank" href="${item.html_url}"><img class="rounded-circle" width="80" height="80" src="${item.avatar_url}"/></a>`;

    let imageSpan: HTMLSpanElement = document.createElement("div");
    imageSpan.className = "row result-wrapper pt-3 pb-3";
    let imageSpanChild: HTMLSpanElement = document.createElement("span");
    imageSpanChild.className = "col-3 result-image";
    imageSpanChild.innerHTML = userImage;
    imageSpan.appendChild(imageSpanChild);

    // Get users real names
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
        const hash = (username: string) => {
          let result: number = username.toLowerCase().charCodeAt(0);
          if (result > 30000) {
            let index = ((result - 44032) / 28) / 21;
            if (index > 0) {
              result = Math.floor(index + 4352);
            }
          }
          return result;
        };
        let favStarLi: HTMLLIElement = document.createElement("li");
        favStarLi.className = "col-2 fav";
        const starWithUserName = `${item.login}-star`;
        favStarLi.id = starWithUserName;
        favStarLi.setAttribute('src', item.avatar_url);
        favStarLi.setAttribute('username', userName);
        if (!localStorage.userAll) {
          localStorage.userAll = JSON.stringify([]);
        }
        const userArr = JSON.parse(localStorage.userAll);
        if (userArr[hash(userName)] && item.login in userArr[hash(userName)]) {
          favStarLi.classList.add('sub');
        }
        favStarLi.onclick = (e) => starEvent(e);
        let favStarLiChild: Text = document.createTextNode("★");
        favStarLi.appendChild(favStarLiChild);
        imageSpan.appendChild(favStarLi);
        let result: HTMLElement = document.getElementById("result");
        const dictIndex = hash(userName);
        let dictWord = document.getElementById(String.fromCharCode(dictIndex));
        if (!dictWord) {
          dictWord = document.createElement('div');
          dictWord.id = String.fromCharCode(dictIndex);
          if (dictIndex < 4352) {
            dictWord.classList.add("normalEngId")
          }
          dictWord.innerText = String.fromCharCode(dictIndex).toUpperCase();
        }

        dictWord.appendChild(imageSpan)
        const head = document.querySelector("#result [class *='normalEngId']");

        if (head && dictIndex >= 4352) {
          result.insertBefore(dictWord, head);
        } else {
          if (!head) {
            front = String.fromCharCode(dictIndex);
            result.appendChild(dictWord);
          } else {
            let arr = document.querySelectorAll("#result [class *='normalEngId']");
            if (front && front.charCodeAt(0) > dictIndex) {

              result.insertBefore(dictWord, head);
              front = String.fromCharCode(dictIndex);
            } else {
              for (let i = 0; i < arr.length; i++) {
                let tmp = arr[i];
                if (tmp.id.charCodeAt(0) > dictIndex) {
                  return result.insertBefore(dictWord, tmp);
                }
              }
              result.appendChild(dictWord);
            }
          }

        }

        nameSpan.ontouchmove = moveEvent;
        nameSpan.ontouchmove = leaveEvent;
        nameSpan.addEventListener("mousemove", moveEvent);
        nameSpan.addEventListener("mouseleave", leaveEvent);

        // nameSpan's background color changes dependinng on mouse moves.
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

        // Set up star button to control its sibling values
        function starEvent(e: any) {
          const id = e.target.id;
          const tagCatch = document.getElementById(id);

          const uName = tagCatch.getAttribute('username');
          let userList = JSON.parse(localStorage.userAll);
          const index = hash(uName);

          let tag = document.getElementById(e.target.id);
          const url = tag.getAttribute('src');
          tag.classList.add('sub');
          if (userList[index] && item.login in userList[index]) {
            tag.classList.remove('sub');
            delete userList[index][item.login];
            localStorage.userAll = JSON.stringify(userList);
          } else {
            if (userList[index]) {
              userList[index][item.login] = { username: uName, url: url, id: item.login, dictIndex: index };
              localStorage.userAll = JSON.stringify(userList);
            } else {
              userList[index] = { [item.login]: { username: uName, url: url, id: item.login, dictIndex: index } };
              localStorage.userAll = JSON.stringify(userList);
            }
          }
        }
      })
      .catch((err: any) => {

        console.error(err);
      })
  })
}
api.onclick = (e) => apiEvent(e);
local.onclick = (e) => localEvent(e);

// Show api results and doesn't show local results when its clicked
function apiEvent(e: any) {
  let result = document.getElementById("result");
  result.style.display = "inline";
  let result2 = document.getElementById("result2");
  result2.style.display = "none";
}

// Show local results and doesn't show api results when its clicked
function localEvent(e: any) {
  let result2 = document.getElementById("result2");
  result2.style.display = "inline";
  let result = document.getElementById("result");
  result.style.display = "none";
  let favArr = JSON.parse(localStorage.userAll);
  favArr = favArr.filter((el: any) => {
    if (el) {
      return el;
    }
  });

  // init result2
  let b2 = document.getElementById("container");
  b2.removeChild(result2);
  let c2 = document.createElement("div");
  c2.id = "result2";
  b2.appendChild(c2);

  favArr.map((el: any, index: number) => {
    const hash = (username: string) => {
      let result: number = username.toLowerCase().charCodeAt(0);
      if (result > 30000) {
        let index = ((result - 44032) / 28) / 21;
        if (index > 0) {
          result = Math.floor(index + 4352);
        }
      }
      return result;
    };
    let result2: HTMLElement = document.getElementById("result2");

    for (let i in el) {
      let dictDiv = document.getElementById(el[i].dictIndex);

      if (!dictDiv) {

        dictDiv = document.createElement('div');
        dictDiv.id = el[i].dictIndex;
        if (el[i].dictIndex < 4352) {
          dictDiv.classList.add("normalEngId")
        }
        dictDiv.innerText = String.fromCharCode(el[i].dictIndex).toUpperCase();
      }



      userImage = `<a target="_blank" href="#"><img class="rounded-circle" width="80" height="80" src="${el[i].url}"/></a>`;
      let imageSpan: HTMLSpanElement = document.createElement("div");
      imageSpan.className = "row result-wrapper pt-3 pb-3";
      imageSpan.id = el[i].id;
      imageSpan.setAttribute('username', el[i].username)
      let imageSpanChild: HTMLSpanElement = document.createElement("span");
      imageSpanChild.className = "col-3 result-image";
      imageSpanChild.innerHTML = userImage;
      imageSpan.appendChild(imageSpanChild);
      let nameWrapper: HTMLSpanElement = document.createElement("span");
      nameWrapper.className = "col-7 result-name";
      let nameSpan: HTMLSpanElement = document.createElement("span");
      nameSpan.className = "pl-3 pr-3";
      let nameSpanChild: Text = document.createTextNode(el[i].username);
      nameSpan.appendChild(nameSpanChild);
      nameWrapper.appendChild(nameSpan);
      imageSpan.appendChild(nameWrapper);
      let favStarLi: HTMLLIElement = document.createElement("li");
      favStarLi.className = "col-2 fav";
      const starWithUserName = `${el[i].id}-star`;
      favStarLi.id = starWithUserName;
      favStarLi.setAttribute('src', el[i].url);
      favStarLi.setAttribute('username', el[i].username)
      const userArr = JSON.parse(localStorage.userAll);
      if (userArr[hash(el[i].username)] && el[i].id in userArr[hash(el[i].username)]) {
        favStarLi.classList.add('sub');
      }
      favStarLi.onclick = (e) => starEvent(e);
      let favStarLiChild: Text = document.createTextNode("★");
      favStarLi.appendChild(favStarLiChild);

      imageSpan.appendChild(favStarLi);
      dictDiv.appendChild(imageSpan)
      const head = document.querySelector("#result2 [class *='normalEngId']");


      if (head && el[i].dictIndex >= 4352) {
        result2.insertBefore(dictDiv, head);
      } else {
        result2.appendChild(dictDiv);
      }
    }
    function starEvent(e: any) {
      const uName = e.target.id.replace('-star', '');
      let tagWrapper = document.getElementById(uName);

      const name = tagWrapper.getAttribute('username');
      console.log(uName, name);

      let dictIndex = tagWrapper.parentElement;
      let newWrapper = document.getElementById("result2")
      console.log(dictIndex);
      dictIndex.removeChild(tagWrapper);
      if (dictIndex.children.length === 0) {
        newWrapper.removeChild(dictIndex);
      }
      let userList = JSON.parse(localStorage.userAll);
      const index = hash(name);
      let testtest = document.querySelector(`#result  [id*="${uName}"]`);

      if (testtest) testtest.classList.remove("sub");
      console.log(`this is ${index}`);
      if (userList[index] && uName in userList[index]) {
        delete userList[index][uName];

        localStorage.userAll = JSON.stringify(userList);
      }
    }
  })
  // Alert message when there is no data added in Local
  if (!localStorage.userAll) {
    alert('새로운 친구를 추가해보세요!');
  }
}
// Change Main title when users start to type in seach bar
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