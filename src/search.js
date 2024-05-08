// 영화 검색 함수 
export const movieSearch = (searchKeyword) => {
    const movieCards = document.querySelectorAll(".card");

    // 입력된 검색어가 포함된 제목의 카드만 보이게 하는 함수
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