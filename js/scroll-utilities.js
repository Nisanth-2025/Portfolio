/**
 * Scroll-utilities.js
 * Portfolio: Nisanth S
 * Consolidates scroll-fix, resume-scroll, and related scroll functions from utils.js
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
  }

  // Get the existing scroll-to-top button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Add scroll event listener
    const toggleScrollToTopBtn = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
      } else {
        scrollToTopBtn.classList.remove('visible');
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
      }
    };
    
    // Initial check on load
    toggleScrollToTopBtn();
    
    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollToTopBtn);
    
    // Add click event listener
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Make sure the button is styled properly
    scrollToTopBtn.style.zIndex = '999';
    
    console.log('Scroll to top button initialized');
  }

  // Check if this is the resume page and apply specific enhancements
  if (window.location.href.includes('/resume.html')) {
    // Resume page specific scrolling behavior
    console.log('Resume page scroll enhancements applied');
    
    // Force visibility check after a delay to ensure it works
    setTimeout(() => {
      if (window.scrollY > 300 && scrollToTopBtn) {
        scrollToTopBtn.classList.add('visible');
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
      }
    }, 1000);
  }
});
