const form = document.getElementById("form");

let user;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = document.getElementById("username").value;

  let originalName = username.split(" ").join("");

  fetch("https://api.github.com/search/users?q=" + originalName + "+in:user&per_page=100")
    .then((result) => result.json())
    .then((data) => {
      console.log(data);

      data.items.forEach((item) => {
        user = `<img class="img-thumbnail ml-4" src="${item.avatar_url}"/>`
        const result = document.getElementById("result");

        result.append(user);
        console.log("힘들다");

      })
    })

})