document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector(".overlay").classList.add("overlay--active");
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".overlay").classList.remove("overlay--active");
});

let currentSlide = 0;

const changingSlide = () => {
  let i;
  const slides = document.getElementsByClassName("team-slides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  currentSlide++;
  if (currentSlide > slides.length) {
    currentSlide = 1
  }
  slides[currentSlide - 1].style.display = "block";
  slides[currentSlide - 1].style.animation = "fadeIn 1.5s linear";
  setTimeout(changingSlide, 5000);
}

changingSlide();