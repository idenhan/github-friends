const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let search = document.getElementById("search").value;
  let originalName = search.split(" ").join("");

  document.getElementById("result").innerHTML = "";

  fetch("https://api.github.com/users/"+originalName)
  .then((result) => result.json())
  .then((data) => {
    console.log(data);
    document.getElementById("result").innerHTML = `
      <a target="_blank" href="https://www.github.com/${originalName}"><img src="${data.avatar_url}"/></a>
    `
  })
  // doubleathj
  // InseobJeon
})