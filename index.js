document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 1;
  showSlides(slideIndex);

  window.openModal = function () {
    document.getElementById("myModal").style.display = "block";
  };

  window.closeModal = function () {
    document.getElementById("myModal").style.display = "none";
  };

  window.plusSlides = function (n) {
    showSlides(slideIndex += n);
  };

  window.currentSlide = function (n) {
    showSlides(slideIndex = n);
  };

  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
      if (captionText) captionText.innerHTML = dots[slideIndex - 1].alt || "";
    }
  }
});
