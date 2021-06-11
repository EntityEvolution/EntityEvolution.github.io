// Mobile devices
document.querySelector(".menu").addEventListener("click", () => {
  document.querySelector(".overlay").classList.add("overlay--active");
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".overlay").classList.remove("overlay--active");
});

// Alerts
document.getElementById("accept").addEventListener("click", () => {
  document.getElementById("alert-question").style.display = "none";
})

document.getElementById("contact").addEventListener("click", () => {
  document.getElementById("alert-question").style.display = "flex";
})

// Copy text
document.getElementById("discord-copy").addEventListener("click", () => {
  copyText("discord-copy");
})

const copyText = (element) => {
  let text = document.getElementById(element).innerText;
  const elem = document.createElement("textarea");
  document.body.appendChild(elem);
  elem.value = text;
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
  document.getElementById("alert").style.display = "block"
}

// Chancing slides
let currentSlide = 0;
let i;
let stopAnimation = false;

const allId = document.querySelectorAll("#all-images div");
const slides = document.getElementsByClassName("team-slides");

document.getElementById("after").addEventListener("click", () => {
  currentSlide++
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  if (currentSlide > slides.length) {
    currentSlide = 1
  }
  slides[currentSlide - 1].style.display = "block";
  slides[currentSlide - 1].style.animation = "fadeIn 1.5s linear";
});

document.getElementById("before").addEventListener("click", () => {
  currentSlide--
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  if (currentSlide < 1) {
    currentSlide = slides.length
  }
  slides[currentSlide - 1].style.display = "block";
  slides[currentSlide - 1].style.animation = "fadeIn 1.5s linear";
});


for (var e = 0; e < allId.length; e++) {
  const allImage = allId[e].id
  document.getElementById(allImage).onmouseover = function () {
    stopAnimation = true;
    clearTimeout(clockTime)
  }
  document.getElementById(allImage).onmouseout = function () {
    stopAnimation = false;
    clockTime = setTimeout(changingSlide, 5000);
  }
}

// Constantly moving slides
const changingSlide = () => {
  if (stopAnimation) {
    console.log("a")
    return
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  currentSlide++;
  if (currentSlide > slides.length) {
    currentSlide = 1
  }
  slides[currentSlide - 1].style.display = "block";
  slides[currentSlide - 1].style.animation = "fadeIn 1.5s linear";
  clockTime = setTimeout(changingSlide, 5000);
}

changingSlide();