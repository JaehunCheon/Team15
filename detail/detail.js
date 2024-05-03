// URL에서Id를 가져오는 함수
function getMovieId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

//
async function displayMovieDetail() {
  const movieId = getMovieId();
  const movie = await fetchMoviesDetail(movieId);

  const movieDetails = document.getElementById("movieDetails");
  movieDetails.innerHTML = `<img id="movieImg"
  src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="image"/>
<ul id="detailCard">
  <h2 id="movieTitle">Title : ${movie.title}</h2>
  <div class="date-avg">
    <p id="releaseDate">개봉일 : <br>
      ${movie.release_date}</p>
    <p> </p>
    <p>영화 평점 : ${movie.vote_average}</p>
  </div>
  <div class = "fontBox">
  <p>영화 줄거리 <br> ${movie.overview}</p>
  </div>
</ul>`;
}

async function fetchMoviesDetail(movieId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjQzNThlMjVhZDdhNmZjNjRmMmUwYzNjZDhhNjhjMyIsInN1YiI6IjY2MjhlMThhMzk1NDlhMDEzMjAwZTk1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5CYAW4PcojiWPDCNzd7iOeZNw7Opt42dkIYC0cjTDE",
    },
  };
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`,
    options
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details : ${response.status}`);
  }
  return data;
}

document.addEventListener('DOMContentLoaded',displayMovieDetail);
