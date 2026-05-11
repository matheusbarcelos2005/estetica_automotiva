// ---- Navbar scroll ----
const mainNav = document.getElementById('mainNav');

function updateNavbar() {
  mainNav.classList.toggle('is-scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// ---- Before/After slider ----
const slider   = document.querySelector('[data-slider]');
const afterSide = document.querySelector('[data-after-side]');

if (slider && afterSide) {
  function updateComparison() {
    afterSide.style.width = slider.value + '%';
  }
  slider.addEventListener('input', updateComparison);
  updateComparison();
}

