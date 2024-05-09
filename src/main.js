import { createMovieCard } from "./Card.js";
import { movieSearch } from "./search.js";


createMovieCard();

const searchInput = document.getElementById("search-input");

const form = document.getElementById("search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  movieSearch(searchInput.value);
});

const mainTitle = document.getElementById("main-title");
mainTitle.addEventListener("click",function(){
  window.location.reload();
})