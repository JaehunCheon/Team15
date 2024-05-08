export function addReview(movieId) {
  // 클릭, 엔터 이벤트 위치지정
  const reviewBtn = document.getElementById("review-btn");
  const reviewInput = document.getElementById("review-input");
  //저장된 리뷰 불러오기
  const existReviews = JSON.parse(localStorage.getItem(`${movieId}_리뷰`))
    ? JSON.parse(localStorage.getItem(`${movieId}_리뷰`))
    : [];
  // 이전 리뷰를 아래에 표시
  existReviews.forEach(function (reviewData) {
    displayReview(reviewData, movieId, existReviews);
  });
  // 클릭, 엔터 입력시 데이터 추가 (addData => 데이터 추가하는 함수)
  reviewBtn.addEventListener("click", () => addData(movieId, existReviews));
  reviewInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addData(movieId, existReviews);
    }
  });
}

// 저장된 리뷰를 화면에 표시하는 함수
function displayReview(reviewData, movieId, existReviews) {
  const reviewBox = document.getElementById("review-box");
  const reviewList = document.createElement("li");
  reviewList.textContent = `${reviewData.작성자} : ${reviewData.리뷰} `;

  //삭제 버튼 추가
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.addEventListener("click", function () {
    const index = existReviews.findIndex(
      (item) =>
        item.작성자 === reviewData.작성자 && item.리뷰 === reviewData.리뷰
    );
    if (index !== -1) {
      // 비밀번호 확인
      const inputPW = prompt("비밀번호를 입력하세요 : ");
      if (inputPW === reviewData.비밀번호) {
        // 비밀번호 일치시 해당 리뷰 삭제
        existReviews.splice(index, 1);
        localStorage.setItem(`${movieId}_리뷰`, JSON.stringify(existReviews));
        // 화면에서도 삭제
        reviewList.remove();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  });

  //수정 버튼 추가
  const changeBtn = document.createElement("button");
  changeBtn.textContent = "수정";

  changeBtn.addEventListener("click", function () {
    const index = existReviews.findIndex(
      (item) =>
        item.작성자 === reviewData.작성자 && item.리뷰 === reviewData.리뷰
    );
    if (index !== -1) {
      // 비밀번호 확인
      const inputPW = prompt("비밀번호를 입력하세요 : ");
      if (inputPW === reviewData.비밀번호) {
        // 비밀번호 일치시 해당 리뷰 수정
        const changeR = prompt("수정할 내용: ");
        
        let newReview = existReviews.map((obj) => {
          if (obj.작성자 === reviewData.작성자 && obj.리뷰 === reviewData.리뷰) {
            return {
              ...obj,
              리뷰: changeR,
            };
          }else {
            return obj;
          }
        });
        JSON.stringify(newReview);
        localStorage.setItem(`${movieId}_리뷰`, JSON.stringify(newReview));
        // 새로고침 후 수정
        alert("수정되었습니다.");
        location.reload();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    }
  });

  // 리뷰 목록에 추가
  reviewList.appendChild(changeBtn);
  reviewList.appendChild(deleteBtn);
  reviewBox.appendChild(reviewList);
}

function addData(movieId, existReviews) {
  //입력된 정보 가져오기
  const username = document.getElementById("name-input").value;
  const password = document.getElementById("pw-input").value;
  const reviewInput = document.getElementById("review-input").value;

  //리뷰 객체 생성
  if (username && password && reviewInput) {
    const reviewData = {
      작성자: username,
      비밀번호: password,
      리뷰: reviewInput,
    };
    // 리뷰를 localStorage에 저장
    existReviews.push(reviewData);
    localStorage.setItem(`${movieId}_리뷰`, JSON.stringify(existReviews));

    displayReview(reviewData, movieId, existReviews);
    // 입력 필드 초기화
    document.getElementById("name-input").value = "";
    document.getElementById("pw-input").value = "";
    document.getElementById("review-input").value = "";
  }
}

// 메인페이지로 이동하는 함수
export function toMain() {
  const toMainBtn = document.getElementById("btn1");
  toMainBtn.addEventListener("click", function () {
    const mainPageURL = `Index.html`;
    window.location.href = mainPageURL;
  });
}
