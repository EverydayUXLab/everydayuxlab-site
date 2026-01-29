// ===============================
// Theme Handling
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
// Image Modal (Portfolio)
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  document.querySelectorAll('.ux-carousel img').forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'ux-modal';
      modal.innerHTML = `<img src="${img.src}" />`;
      modal.onclick = () => modal.remove();
      document.body.appendChild(modal);
    });
  });
});
