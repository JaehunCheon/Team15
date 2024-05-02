const apiKey = '964358e25ad7a6fc64f2e0c3cd8a68c3';
const mainContainer = document.getElementById('card-list');
let movies = [];

// 메인 페이지에 출력될 카드 이미지, 데이터 가져오기
const fetchPopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    movies = data.results;
    displayPopularMovies();
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// 메인 페이지에 카드 리스트 출력
const displayPopularMovies = () => {
  mainContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    mainContainer.appendChild(movieCard);
  });
}

// 영화 카드 생성 함수
const createMovieCard = (movie) => {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');  // class생성
  movieCard.addEventListener('click', function () {
    alert(`Title : ${movie.title},  ID : ${movie.id}`);
  });
  const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';


  movieCard.innerHTML = `
  <div class="card">
        <div class = "imgbox">
      <img src="${imageUrl}" class="card-img-top" alt="${movie.title}"></div>
      <div class bodybox><div class="card-body">
          <p class="cardtitle">Title : ${movie.title}</p>
          <p class="cardoverview">Overview : ${movie.overview}</p>
      </div></div>
      <div class ="footerbox">
      <div class="card-footer">
          <p class="cardavg">Vote average : ${movie.vote_average}</p>
      </div></div>
  </div>`;
  return movieCard;
}

// 입력된 검색어 기반으로 영화 검색 하는 함수
const searchMovies = (searchTerm)=> {
  const moviefilter = movies.filter(movie => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  displaySearchResults(moviefilter);
}

// 검색결과 출력 함수
const displaySearchResults = (results) => {

  mainContainer.innerHTML = ''; // 결과 창 비우기

  if (results.length === 0) {  // results 값 
    mainContainer.innerHTML = '';
    return;
  }

  results.forEach(movie => {
    const movieCard = createMovieCard(movie);
    mainContainer.appendChild(movieCard);
  });
}

document.getElementById('SM').innerHTML = `영화 검색 : `;
document.getElementById('reloadButton').addEventListener('click', function () {
  location.reload();
});


// 메인페이지 로드시 데이터 가져오기
document.addEventListener('DOMContentLoaded',fetchPopularMovies);
  // 검색 버튼 누를시 영화 검색
  document.getElementById('search-button').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm === '') {
      alert('검색어를 입력하세요');
      location.reload();
    } else {
      searchMovies(searchTerm);
    }
  });

  document.getElementById('search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const searchTerm = document.getElementById('search-input').value.trim();
      if (searchTerm === '') {
        alert('검색어를 입력하세요');
        location.reload();
      } else {
        searchMovies(searchTerm);
      }
    }
  });


