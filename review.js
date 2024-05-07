<script>
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const reviewList = document.getElementById('reviews');

    // 저장된 리뷰 불러오기
    const savedReviews = JSON.parse(localStorage.getItem('reviews'));

    // 이전 리뷰를 아래에 표시
    savedReviews.forEach(function(review) {
        displayReview(review);
    });

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 기본 이벤트 동작 방지
        // 입력된 리뷰 정보 가져오기
        const authorName = document.getElementById('authorName').value;
        const reviewContent = document.getElementById('reviewContent').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        // 리뷰 객체 생성
        const review = {
            authorName: authorName,
            reviewContent: reviewContent,
            confirmPassword: confirmPassword
        };
        // 리뷰를 localStorage에 저장
        savedReviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(savedReviews));

        // 작성된 리뷰를 화면에 표시
        displayReview(review);

        // 입력 필드 초기화
        document.getElementById('authorName').value = '';
        document.getElementById('reviewContent').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    // 저장된 리뷰를 화면에 표시하는 함수
    function displayReview(review) {
        const li = document.createElement('li');
        li.textContent = `작성자: ${review.authorName}, 리뷰 내용: ${review.reviewContent}`;

        // 삭제 버튼 추가
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', function() {
            const index = savedReviews.findIndex(item => item.authorName === review.authorName && item.reviewContent === review.reviewContent);
            if (index !== -1) {
                // 확인 비밀번호 확인
                const inputPassword = prompt("확인 비밀번호를 입력하세요:");
                if (inputPassword === review.confirmPassword) {
                    // 비밀번호 일치 시 해당 리뷰 삭제
                    savedReviews.splice(index, 1);
                    localStorage.setItem('reviews', JSON.stringify(savedReviews));
                    // 화면에서도 삭제
                    li.remove();
                } else {
                    alert("비밀번호가 일치하지 않습니다.");
                }
            }
        });

        // 리뷰 목록에 추가
        li.appendChild(deleteButton);
        reviewList.appendChild(li);
    }
});
</script>