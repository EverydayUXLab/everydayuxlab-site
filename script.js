// ===============================
// 1. Theme Management
// ===============================

// Run immediately to set state on buttons (Color is already set by head script)
function initTheme() {
  const savedTheme = localStorage.getItem('daynight-theme');
  const isCarbon = savedTheme === 'carbon';
  
  // Ensure the class is present (redundancy for safety)
  document.documentElement.classList.toggle('carbon', isCarbon);
  
  // Update the toggle buttons visual state
  updateThemeButtons(isCarbon ? 'carbon' : 'snow');
}

// Called by the HTML buttons: onclick="setTheme('carbon')"
function setTheme(themeName) {
  const isCarbon = themeName === 'carbon';
  
  // Toggle the HTML class
  document.documentElement.classList.toggle('carbon', isCarbon);
  
  // Save to LocalStorage
  localStorage.setItem('daynight-theme', themeName);
  
  // Update button active states
  updateThemeButtons(themeName);
}

function updateThemeButtons(activeTheme) {
  // Remove 'active' from all theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add 'active' to the specific button clicked
  if (activeTheme === 'carbon') {
    document.querySelectorAll('.theme-btn-carbon').forEach(b => b.classList.add('active'));
  } else {
    document.querySelectorAll('.theme-btn-snow').forEach(b => b.classList.add('active'));
  }
}

// ===============================
// 2. Carousel Logic (For Projects Page)
// ===============================
function moveSlide(button, direction) {
  const wrapper = button.closest('.carousel-wrapper');
  if (!wrapper) return; // Guard clause

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

  // Calculate new index with loop
  let newIndex = activeIndex + direction;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;

  // Set active
  slides[newIndex].classList.add('active');
  
  // Update counter text if it exists
  if (counter) {
    counter.textContent = `${newIndex + 1} / ${slides.length}`;
  }
}

// ===============================
// 3. Lightbox (Image Zoom)
// ===============================
function initLightbox() {
  document.body.addEventListener('click', (e) => {
    // Only trigger on images inside carousel slides or specific zoomable areas
    if (e.target.tagName === 'IMG' && e.target.closest('.carousel-slide')) {
      
      const modal = document.createElement('div');
      modal.className = 'ux-modal';
      
      // Create image element
      const img = document.createElement('img');
      img.src = e.target.src;
      
      modal.appendChild(img);
      
      // Close on click (anywhere)
      modal.onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300); // Fade out delay
      };

      document.body.appendChild(modal);
      
      // Trigger animation
      requestAnimationFrame(() => {
        modal.classList.add('active');
      });
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

// ===============================
// @author EverydayUXLab
// @site everydayuxlab.com
// @year 2026
// ===============================