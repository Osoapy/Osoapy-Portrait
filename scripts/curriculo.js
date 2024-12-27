const images = ["./assets/curriculo/1.png", "./assets/curriculo/2.png", "./assets/curriculo/3.png", "./assets/curriculo/4.png"];
let currentIndex = 0;

const curriculoImage = document.getElementById("curriculoImage");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");

function changeImage(index) {
    if (index < 0 || index >= images.length) return;
    curriculoImage.classList.add("hidden");

    
}

arrowRight.addEventListener("click", () => {
    currentIndex = Math.abs((currentIndex + 1) % images.length);
    setTimeout(() => {
      curriculoImage.src = images[currentIndex];
      curriculoImage.classList.remove("hidden");
  }, 121);
});

arrowLeft.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    curriculoImage.src = images[currentIndex];
});
