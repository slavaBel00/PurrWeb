const DOTS_MOUSE_OVER_BACKGROUND = [{background: '#ddd'},{background: '#aaa'}];
const DOTS_MOUSE_OUT_BACKGROUND = [{background: '#aaa'},{background: '#ddd'}];

let nextSlideButton = document.querySelector('.next');
let previousSlideButton = document.querySelector('.previous');
let sliderDots = document.querySelector('.slider-dots');
let slides = document.getElementsByClassName("slider__item");
let sliderButtons = document.querySelector('.slider__buttons');

let banSlide = 1;  //используется для контроля анимации, пока пред. не закончилась новая не начнётся
let buttonsHoverBan = 1;  //тоже для контроля анимации но для наведения на кнопки пред. и след. слайдов
let slideNumber = 1;  //номер слайда который показывать
showSlides(slideNumber);


//обработчик наведения на точки слайдов
sliderDots.onmouseover = function(event) {
  if (event.target.closest('span')) {
    if (event.target.focused) {      //.focused назначаем на точку текущего слайда в ф-ции showSlides() ниже
      return;
    }
    event.target.animate(DOTS_MOUSE_OVER_BACKGROUND, {
      duration: 300
    });
    event.target.style.backgroundColor = "#aaa";
  }
}

//обработчик уведения мыши с точек слайдов (обратный наведению)
sliderDots.onmouseout = function(event) {
  if (event.target.closest('span')) {
    if (event.target.focused) {
      return;
    }
    event.target.animate(DOTS_MOUSE_OUT_BACKGROUND, {
      duration: 300
    });
    event.target.style.backgroundColor = "#ddd";
  }
}

//обработчик клика на точки слайдов
sliderDots.onclick = function(event) {
  if (event.target.closest('span')) {
    if (event.target.focused) {
      return;
    }
    if (event.target.classList.contains('slider-dots_item1')) {
      currentSlide(1);
    }
    if (event.target.classList.contains('slider-dots_item2')) {
      currentSlide(2);
    }
    if (event.target.classList.contains('slider-dots_item3')) {
      currentSlide(3);
    }
    if (event.target.classList.contains('slider-dots_item4')) {
      currentSlide(4);
    }
  }
}

//обработчик наведения на кнопки след. и предыдущего слайда
sliderButtons.onmouseover = function(event) {
  if (buttonsHoverBan != 1) return;
  if (event.target.closest('button')) {
    buttonsHoverBan = 0;
    let start = Date.now();
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      event.target.style.fontSize = "24px";
      if (timePassed >= 100) {
        buttonsHoverBan = 1;
        clearInterval(timer);
        return;
      }
    }, 20);
  }
}

//обработчик уведения мыши с кнопки след. и предыдущего слайда
sliderButtons.onmouseout = function(event) {
  if (buttonsHoverBan != 1) return;
  if (event.target.closest('button')) {
    buttonsHoverBan = 0;
    let start = Date.now();
    let timer = setInterval(function() {
      let timePassed = Date.now() - start;
      event.target.style.fontSize = "18px";
      if (timePassed >= 100) {
        buttonsHoverBan = 1;
        clearInterval(timer);
        return;
      }
    }, 20);
  }
}

//клик на кнопку след. слайда
nextSlideButton.onclick = function() {
  if (banSlide != 1) return;
  showSlides(slideNumber += 1);
}

//клик на кнопку предыдущего слайда
previousSlideButton.onclick = function() {
  if (banSlide != 1) return;
  showSlides(slideNumber -= 1);
}

//функция для клика на точки
function currentSlide(n) {
  if (banSlide != 1) return;
  showSlides(slideNumber = n);
}

//основная функция показа слайдов, n - номер слайда
function showSlides(n) {
  let dots = document.getElementsByClassName("slider-dots_item");
  if (n > slides.length) {
    slideNumber = 1
  }
  if (n < 1) {
    slideNumber = slides.length
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    if (dots[i].style.backgroundColor == "rgb(170, 170, 170)") {
      dots[i].style.backgroundColor = "#ddd";
    }
    if (dots[i].focused) {
      dots[i].focused = false;
    }
  }
  slides[slideNumber - 1].style.display = "block";
  dots[slideNumber - 1].style.backgroundColor = "#aaa";
  dots[slideNumber - 1].focused = true;
  slideAnimation();
}

//функция анимации при смене слайдов
function slideAnimation() {
  banSlide = 0;
  let start = Date.now();
  let timer = setInterval(function() {
    var timePassed = Date.now() - start;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].style.display == "block") {
        slides[i].style.opacity = timePassed / 1000;
      }
    }
    if (timePassed >= 1000) {
      banSlide = 1;
      clearInterval(timer);
      return;
    }
  }, 20);
}
