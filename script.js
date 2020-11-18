const form = document.getElementById("myForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let search = document.getElementById("search").value;

  alert(search);
})