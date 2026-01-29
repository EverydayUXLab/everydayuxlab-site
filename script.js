// ===============================
// Theme
// ===============================
function initTheme() {
  const theme = localStorage.getItem('daynight-theme');
  if (theme === 'carbon') {
    document.documentElement.classList.add('carbon');
    updateThemeButtons('carbon');
  } else {
    updateThemeButtons('snow');
  }
}

function setTheme(theme) {
  document.documentElement.classList.toggle('carbon', theme === 'carbon');
  localStorage.setItem('daynight-theme', theme);
  updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
  document.querySelectorAll('.theme-btn-snow')
    .forEach(btn => btn.classList.toggle('active', theme === 'snow'));
  document.querySelectorAll('.theme-btn-carbon')
    .forEach(btn => btn.classList.toggle('active', theme === 'carbon'));
}

// ===============================
// Slideshow Logic
// ===============================
const slideIndex = {};

function showSlides(n, group) {
  const slides = document.querySelectorAll(`.ux-slide.${group}`);
  const dots = document.querySelectorAll(`.slide-indicators button`);

  if (!slideIndex[group]) slideIndex[group] = 1;

  if (n > slides.length) slideIndex[group] = 1;
  if (n < 1) slideIndex[group] = slides.length;

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex[group] - 1].style.display = "block";
  dots[slideIndex[group] - 1].classList.add("active");
}

function plusSlides(n, group) {
  slideIndex[group] = (slideIndex[group] || 1) + n;
  showSlides(slideIndex[group], group);
}

function currentSlide(n, group) {
  slideIndex[group] = n;
  showSlides(n, group);
}

// ===============================
// Init
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  ["mlops", "admin"].forEach(group => showSlides(1, group));
});
