export function addReview(movieId) {
  const reviewBtn = document.getElementById("review-btn");
  const reviewDataString = localStorage.getItem(`${movieId}_리뷰`);

  reviewBtn.addEventListener("click", function () {
    const username = document.getElementById("name-input").value;
    const password = document.getElementById("pw-input").value;
    const reviewInput = document.getElementById("review-input").value;

    if(username && password && reviewInput){
    const reviewData = {
      작성자: username,
      비밀번호: password,
      리뷰: reviewInput,
    };

    let existReviews = [];
    if (reviewDataString) {
      existReviews = JSON.parse(reviewDataString);
      
    }
    existReviews.push(reviewData);

    localStorage.setItem(`${movieId}_리뷰`, JSON.stringify(existReviews));

}   
  });
}
