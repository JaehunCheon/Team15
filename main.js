import { movieSearch } from "./search.js";
import { createMovieCard } from "./Card.js"

createMovieCard();

const searchInput = document.querySelector("search-input");

const form = document.querySelector("#search-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  movieSearch(searchInput.value);
});

