const modalbut1 = document.querySelector('.modal-btn1');
const modalbut2 = document.querySelector('.modal-btn2');
const modal1 = document.querySelector('.modal-overlay1');
const modal2 = document.querySelector('.modal-overlay2');
const closebut1 = document.querySelector('.close-btn1');
const closebut2 = document.querySelector('.close-btn2');

modalbut1.addEventListener('click', function() {
    modal1.classList.add("open-modal1");
})
modalbut2.addEventListener('click', function() {
    modal2.classList.add("open-modal2");
})

closebut1.addEventListener('click', function() {
    modal1.classList.remove("open-modal1");
})

closebut2.addEventListener('click', function() {
    modal2.classList.remove("open-modal2");
})