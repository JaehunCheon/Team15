export const createMovieCard = async () => {
  const movies = await fetchPopularMovies();
  const movieCard = document.querySelector("#card-list");
  const sortbtn = document.querySelector("#sort-btn");

  makeCard(movieCard, movies);

  //버튼별 정렬 기능
  sortbtn.addEventListener("click", function ({ target }) {
    if (target === sortbtn) return; //버튼 외 구역 클릭 시 리턴
    //평점순으로 정렬
    else if (target.matches("#grade-sort")) {
      movies.sort((a, b) => b.vote_average - a.vote_average);
      makeCard(movieCard, movies);
    }
    //제목순으로 정렬
    else if (target.matches("#title-sort")) {
      movies.sort((a, b) => {
        const Atitle = a.title;
        const Btitle = b.title;
        if (Atitle > Btitle) {
          return 1;
        } else if (Atitle < Btitle) {
          return -1;
        }
        return 0;
      });
      makeCard(movieCard, movies);
    }
    //인기순으로 정렬
    else if (target.matches("#fame-sort")) {
      movies.sort((a, b) => b.popularity - a.popularity);
      makeCard(movieCard, movies);
    }
  });
  // 영화카드 클릭시 처리하는 함수
  movieCard.addEventListener("click", function (event) {
    const target = event.target.closest(".card");
    if (!target) return; // 부모 요소가 없으면 함수 종료

    const movieId = target.dataset.movieId;
    const detailPageURL = `detail.html?id=${movieId}`;
    window.location.href = detailPageURL;
  });
};

//정렬 클릭 때마다 호출해야돼서 함수로 변경
const makeCard = function (movieCard, movies) {
  movieCard.innerHTML = movies
    .map(
      (movie) => `
  <div class="card" data-movie-id="${movie.id}">
    <div class="imgbox">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="${movie.title}">
    </div>
    <div class="bodybox">
      <div class="card-body">
        <p class="cardtitle">Title : ${movie.title}</p>
        <p class="cardoverview">Overview : ${movie.overview}</p>
      </div>
    </div>
    <div class="footerbox">
      <div class="card-footer">
        <p class="cardavg">Vote average : ${movie.vote_average}</p>
        <p class="cardpop">Popularity : ${movie.popularity}</p>
      </div>
    </div>
  </div>`
    )
    .join("");
};

// 메인 페이지에 출력될 카드 이미지, 데이터 가져오기
async function fetchPopularMovies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQzNThlMjVhZDdhNmZjNjRmMmUwYzNjZDhhNjhjMyIsInN1YiI6IjY2MjhlMThhMzk1NDlhMDEzMjAwZTk1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5CYAW4PcojiWPDCNzd7iOeZNw7Opt42dkIYC0cjTDE",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  );
  const data = await response.json();
  return data.results;
}
