import { createMovieCard } from "./Card";

const titlebtn = document.querySelector('.sortbtn'); // .sortbtn 클래스로 변경
titlebtn.addEventListener('click', titlesort);

function titlesort({target}) {
    if (target === titlebtn) {
        return;
    } else if (target.matches('.grade-sort')) { // .grade-sort 클래스로 변경
        movies.sort((a, b) => b.vote_average - a.vote_average); // movies 배열을 평점에 따라 내림차순으로 정렬
        createMovieCard(movies); // 정렬된 movies 배열을 사용하여 카드를 생성
    }
}