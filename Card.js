// 영화 카드 생성 함수
export const createMovieCard = async() => {
  const movies = await fetchPopularMovies();
  const movieCard = document.querySelector("#card-list");

  movieCard.innerHTML = movies
    .map(
      (movie) => `
    <div class="card">
          <div class = "imgbox">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" alt="${movie.title}"></div>
        <div class bodybox><div class="card-body">
            <p class="cardtitle">Title : ${movie.title}</p>
            <p class="cardoverview">Overview : ${movie.overview}</p>
        </div></div>
        <div class ="footerbox">
        <div class="card-footer">
            <p class="cardavg">Vote average : ${movie.vote_average}</p>
        </div></div>
    </div>`
    )
    .join("");

    movieCard.addEventListener("click", handleClickCard);
  // 영화카드 클릭시 처리하는 함수
  function handleClickCard({ target }){
    
    if (target === movieCard) return; // 부모 요소가 없으면 함수 종료

    if(target.matches(".card")){
      alert("hello");
    }else {
      alert("hello"); // 여기에 상세정보 창 띄우는 로직 작성하면 될거같습니다.
    }
     
  };
};

  // 메인 페이지에 출력될 카드 이미지, 데이터 가져오기
async function fetchPopularMovies(){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQzNThlMjVhZDdhNmZjNjRmMmUwYzNjZDhhNjhjMyIsInN1YiI6IjY2MjhlMThhMzk1NDlhMDEzMjAwZTk1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5CYAW4PcojiWPDCNzd7iOeZNw7Opt42dkIYC0cjTDE'
    }
  };
  
  const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

  const data = await response.json();
  return data.results;
}