/**
 * Utils.js - Combined utility scripts
 * Portfolio: Nisanth S
 */

// ===== SCROLL TO TOP FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
  // Add the scroll to top button if it doesn't exist
  if (!document.querySelector('.scroll-to-top')) {
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.id = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('title', 'Scroll to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(scrollToTopBtn);

    const toggleScrollToTopBtn = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleScrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== CURSOR MANAGEMENT =====
  // Find cursor elements
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-dot-outline");
  
  // If cursor elements exist, hide them to restore default cursor
  if (cursorDot) {
    cursorDot.style.display = "none";
  }
  
  if (cursorOutline) {
    cursorOutline.style.display = "none";
  }
  
  // Ensure the default cursor is visible
  document.body.style.cursor = 'auto';
  
  // Set appropriate cursors for different elements
  document.querySelectorAll('a, button, .filter-btn, .social-icon, .scroll-to-top, .nav-link').forEach(el => {
    el.style.cursor = 'pointer';
  });
  
  document.querySelectorAll('input, textarea, select').forEach(el => {
    el.style.cursor = 'text';
  });
  
  // Make sure images have default cursor
  document.querySelectorAll('img').forEach(el => {
    el.style.cursor = 'auto';
  });
});
