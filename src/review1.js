const form = document.querySelector('form');
const ul = document.querySelector('ul');
const clrbtn = document.querySelector('#clear');
const addbtn = document.querySelector('#add');
const id = document.querySelector('#name');
const pwd = document.querySelector('#pwd');
const newreview = document.querySelector('#review');

let itemsArray = localStorage.getItem('review') ? JSON.parse(localStorage.getItem('review')) : [];

localStorage.setItem('review', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('review'));

const liMaker = (id, pwd, newreview) => {
    const li = document.createElement('li');
    li.innerHTML = `작성자: ${id},  비밀번호: ${pwd}</br>내용: ${newreview}`;
    ul.appendChild(li);
}

data.forEach(item => {
    liMaker(item);
});

addbtn.addEventListener('click', function (e) {
    e.preventDefault();

    const idValue = id.value;
    const pwdValue = pwd.value;
    const revValue = newreview.value;

    const revobj = {
        id: idValue,
        pwd: pwdValue,
        review: revValue,
    }
    itemsArray.push(revobj);
    localStorage.setItem('review', JSON.stringify(itemsArray));
    liMaker(idValue, pwdValue, revValue);
});

clrbtn.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});

