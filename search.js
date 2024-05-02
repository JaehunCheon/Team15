export const movieSearch = (searchKeyword) => {
    const movieCards = document.querySelectorAll(".movie-card");
  
    movieCards.forEach((card) => {
      const title = card.querySelector(".cardtitle").textContent.toLowerCase();
      const searchedValue = searchKeyword.toLowerCase();
  
      if (title.includes(searchedValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };