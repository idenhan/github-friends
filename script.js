const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let search = document.getElementById("search").value;
  let originalName = search.split(" ").join("");

  alert(originalName);
  fetch("https://api.github.com/users/"+originalName); 
})