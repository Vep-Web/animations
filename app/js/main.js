const point = document.getElementById("point");
const slide = document.querySelectorAll(".swiper__slide");
const btnPrev = document.getElementById("participantsPrevBtn");
const btnNext = document.getElementById("participantsNextBtn");
const swiperList = document.getElementById("swiper");
const screenWidth = window.screen.width;
const stagesBtnPrev = document.getElementById("stagesBtnPrev");
const stagesBtnNext = document.getElementById("stagesBtnNext");
const stageSlide = document.querySelectorAll(".stages__item");
const navBtn = document.querySelectorAll(".stages__btn-nav");
btnPrev.disabled = true;
stagesBtnPrev.disabled = true;
let counter = 0;
let enumerator = 0;
let slideCount = 3;
if (screenWidth <= 1250) {
  slideCount = 2;
  point.textContent = counter + slideCount;
}
if (screenWidth <= 850) {
  slideCount = 1;
  point.textContent = counter + slideCount;
}
stagesBtnNext.addEventListener("click", NextSlide);
stagesBtnPrev.addEventListener("click", PrevSlide);
for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", () => {
    enumerator = i;
    calculation(stageSlide, enumerator);
    activeBtnList();
  });
}
btnNext.addEventListener("click", Next);
btnPrev.addEventListener("click", Prev);
function calculation(listSlide, count) {
  for (let i = 0; i < listSlide.length; i++) {
    listSlide[i].style.transform = `translateX(${
      -count * (listSlide[i].offsetWidth + 20)
    }px)`;
  }
}
function activeBtnList() {
  for (let i = 0; i < navBtn.length; i++) {
    if (i === enumerator) {
      navBtn[i].classList.add("btn-nav--active");
    } else {
      navBtn[i].classList.remove("btn-nav--active");
    }
  }
  if (enumerator >= stageSlide.length - 3) {
    disabledAdd(stagesBtnNext);
  }
  if (enumerator >= 0) {
    disabledRemove(stagesBtnPrev);
  }
  if (enumerator === 0) {
    disabledAdd(stagesBtnPrev);
  }
  if (enumerator >= 0 && enumerator <= stageSlide.length - 4) {
    disabledRemove(stagesBtnNext);
  }
}
function disabledRemove(btn) {
  btn.classList.remove("btn-dis");
  btn.disabled = false;
}
function disabledAdd(btn) {
  btn.classList.add("btn-dis");
  btn.disabled = true;
}
function NextSlide() {
  enumerator++;
  calculation(stageSlide, enumerator);
  if (enumerator === stageSlide.length - 3) {
    disabledAdd(stagesBtnNext);
  }
  if (enumerator >= 0) {
    disabledRemove(stagesBtnPrev);
  }
  activeBtnList();
}
function PrevSlide() {
  enumerator--;
  calculation(stageSlide, enumerator);
  if (enumerator === 0) {
    disabledAdd(stagesBtnPrev);
  }
  if (enumerator >= 0) {
    disabledRemove(stagesBtnNext);
  }
  activeBtnList();
}
function Next() {
  counter++;
  calculation(slide, counter);
  point.textContent = counter + slideCount;
  if (counter === slide.length - slideCount) {
    disabledAdd(btnNext);
  }
  if (counter >= 1) {
    disabledRemove(btnPrev);
  }
  examinationBtnPrev();
}
function Prev() {
  counter--;
  calculation(slide, counter);
  point.textContent = counter + slideCount;
  examinationBtnPrev();
}
function examinationBtnPrev() {
  if (counter < slide.length - slideCount) {
    disabledRemove(btnNext);
  }
  if (counter === 0) {
    disabledAdd(btnPrev);
  }
}
setInterval(() => {
  if (counter >= slide.length - slideCount) {
    counter = -1;
  }
  Next();
}, 4000);
