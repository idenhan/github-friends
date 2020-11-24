import "../public/styles.css";
import * as _ from "lodash";
import AppRequestInit from "./Classes/appRequestInit";
import IsUser from "./Interfaces/isUser";


// https://gomakethings.com/preventing-cross-site-scripting-attacks-when-using-innerhtml-in-vanilla-javascript/
// innerHTML 지워야되고.
// 렌더 속도 개선
// 타입 문법 interface, return 값 void.
// 검색결과 없을 때 sort
// 로딩창
// 헤더
// async
// try catch (error handler 무조건!!!!)
// 한글 먼저 근데 한글 먼저를 왜하지? 검색어가 어차피 한글로 치거나 영어로 칠텐데 둘중 하난데
// getElementById 로 통일
// 같은 내용 안놓치고 변수로.

// interfaces

// let user1: isUser;
// let user2: isUser;
// let allUsers: isUser[] = [];
// allUsers.push(user1); allUsers.push(user2);

const form: HTMLElement = document.getElementById("form");
const local: HTMLElement = document.getElementById("local");
let fav: HTMLElement;

let userImage: string = "";
let userName: string = "";
let userData: any;
let user: IsUser;
let userAll: IsUser[] = [];

//user 객채 변수에 이름과 이미지(url)을 넣기
//맵 메소드로 userAll 배열에 다 푸쉬해줌
//버튼 클릭시, save / delete 기능인데.
//지금 이걸 어떻게 찾아가야되는지 모르겠음 조건을.

//해시테이블로, 

// function saveUserData(e) {
//   const username: string | number = (<HTMLInputElement>document.getElementById("username")).value;
//   const userOther = document.getElementById('userOther').value;

//   if (!userName || !userOther) {
//     alert('Please fill in the form');
//     return false;
//   }

//   // 검색어 Validate는 따로.

//   let userData = {
//     name: userName,
//     url: userOther
//   }

//   if (localStorage.getItem('userDatas') === null) {
//     //init array
//     let userDatas = [];
//     userDatas.push(userData);
//     //set to localstorage
//     localStorage.setItem("userDatas", JSON.stringify(userDatas));
//   } else {
//     // Get userDatas from localstorage
//     let userDatas = JSON.parse(localStorage.getItem('userDatas'));
//     // Add Userdata to array
//     userDatas.push(userData);
//     // Re-set back to localstorage
//     localStorage.setItem("userDatas", JSON.stringify(userDatas));
//   }

//   // Clear form
//   document.getElementById('myForm').reset();

//   // Re-fetch userDatas
//   fetchUserDatas();

//   e.preventDefault();
// }

// // Delete userData
// function deleteUserData() {
//   // Get userDatas from localstorage
//   let userDatas = JSON.parse(localStorage.getItem('userDatas'));
//   // Loop throught userDatas
//   for (let i = 0; i < userDatas.length; i++) {
//     if (userDatas[i].url === url) {
//       // Remove from array
//       userDatas.splice(i, 1);
//     }
//   }
//   localStorage.setItem("userDatas", JSON.stringify(userDatas));

//   // Re-fetch userDatas
//   fetchUserDatas();
// }

// function fetchUserDatas() {
//   // Get userDatas from localstorage
//   // <body onload="fetchUserDatas()>"
//   let userDatas = JSON.parse(localStorage.getItem('userDatas'));

//   // Get output id
//   let userDatasResults = document.getElementById('userDatasResults');
//   // Build output
//   userDatasResults.innerHTML = '';
//   for (let i = 0; i < userDatas.length; i++) {
//     let name = userDatas[i].name;
//     let url = userDatas[i].url;

//     userDatasResults.innerHTML +=
//       '<div class="well">' +
//       '<h3>' + name +
//       ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
//       ' <a onclick="deleteUserData(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' +
//       '</h3>' +
//       '</div>';
//   }
// }

// form.addEventListener("submit", function (e): void {
//   e.preventDefault();

//   // if (typeof (localStorage) === "undefined") {
//   //   alert("현재 웹 환경에서 작동이 제한적입니다. 크롬 혹은 다른 브라우저에서 접속해주시기 바랍니다");
//   // }

//   getUserData().then((data: any) => {
//     userData = data.items;
//   })
//   getUserNameAndImage();
// })
form.addEventListener("submit", getUserData);
// 즐겨찾기 저장..


async function getUserData(e: any) {
  e.preventDefault();
  document.getElementById("result").innerHTML = "";
  const username: string | number = (<HTMLInputElement>document.getElementById("username")).value;

  const response = await fetch("https://api.github.com/search/users?q=" + username + "+in:name&per_page=100", new AppRequestInit());
  const data = await response.json();
  userData = data.items;
  getUserNameAndImage();
  // .then((result: Response) => result.json())
  // .then((data: any) => {
  //   // console.log(data);

  //   userData = data.items;
  //   console.log(userData);
  // })
}
// function getUserData() {
//   document.getElementById("result").innerHTML = "";
//   const username: string | number = (<HTMLInputElement>document.getElementById("username")).value;

//   fetch("https://api.github.com/search/users?q=" + username + "+in:name&per_page=100", new AppRequestInit())
//     .then((result: Response) => result.json())
//     .then((data: any) => {
//       // console.log(data);

//       userData = data.items;
//       console.log(userData);
//     })
// }

//검색시 로컬스토리지에 데이터를 탐색해 해당 데이터 있을 경우
//별 버튼 색상 변경해 출력
//


// api를 받아와서, 
function getUserNameAndImage() {
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
        // console.log(nameData);

        userName = nameData.name;
        localStorage.name = JSON.stringify(userName);
        // console.log(userName);

        let nameWrapper: HTMLSpanElement = document.createElement("span");
        nameWrapper.className = "col-7 result-name";
        let nameSpan: HTMLSpanElement = document.createElement("span");
        nameSpan.className = "pl-3 pr-3";
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
        const starWithUserName = `${userName}-star`;
        favStarLi.id = starWithUserName;
        favStarLi.onclick = () => starEvent(userName);

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

        function starEvent(userName: any) {

          return console.log(this);

        }
      })
  })
}

let triggerNum: number = 0;
let textInput: HTMLElement = document.querySelector('input[type="text"]');
textInput.addEventListener("input", trigger);

function trigger() {
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

