// ===============================
// Theme Management
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
// Carousel Logic (Universal)
// ===============================
function moveSlide(button, direction) {
  // Find the wrapper relative to the button clicked
  const wrapper = button.closest('.carousel-wrapper');
  const slides = wrapper.querySelectorAll('.carousel-slide');
  const counter = wrapper.querySelector('.carousel-counter');
  
  let activeIndex = 0;
  
  // Find current active index
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      activeIndex = index;
      slide.classList.remove('active');
    }
  });

  // Calculate new index
  let newIndex = activeIndex + direction;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;

  // Set active
  slides[newIndex].classList.add('active');
  
  // Update counter text
  if (counter) {
    counter.textContent = `${newIndex + 1} / ${slides.length}`;
  }
}

// ===============================
// Lightbox (Image Modal)
// ===============================
function initLightbox() {
  document.body.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG' && e.target.closest('.carousel-slide')) {
      const modal = document.createElement('div');
      modal.className = 'ux-modal active';
      modal.innerHTML = `<img src="${e.target.src}">`;
      
      // Close on click
      modal.onclick = () => modal.remove();
      document.body.appendChild(modal);
    }
  });
}

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initLightbox();
});