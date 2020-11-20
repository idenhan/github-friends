import "./styles.css";
import * as _ from "lodash";

const form = document.getElementById("form");

let user: string;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = (<HTMLInputElement>document.getElementById("username")).value;

  let originalName: string = username.split(" ").join("");

  fetch("https://api.github.com/search/users?q=" + originalName + "+in:user&per_page=100")
    .then((result: Response) => result.json())
    .then((data: any) => {
      console.log(data);

      const userData = data.items;
      userData.forEach((item: any) => {
        user = `<img class="img-thumbnail ml-4" src="${item.avatar_url}"/>`;
        // document.getElementById("result").innerHTML = user;
        let imageSpan = document.createElement("span");
        // let imageNode = document.createTextNode(user);
        // image.appendChild(imageNode);
        imageSpan.innerHTML = user;
        let result = document.getElementById("result");
        result.appendChild(imageSpan);
        // result.append(user);
        console.log(user);

      })
    })

})
