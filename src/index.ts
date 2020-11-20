import "./styles.css";
import * as _ from "lodash";

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // var inputValue = (<HTMLInputElement>document.getElementById(elementId)).value;
  let username = (<HTMLInputElement>document.getElementById("username")).value;
  alert(username);
  let originalName = username.split(" ").join("");

  fetch("https://api.github.com/users/" + originalName)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    })
})
