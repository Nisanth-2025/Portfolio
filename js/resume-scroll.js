/**
 * Resume-specific scroll-to-top functionality
 * This ensures the button works correctly on the resume page
 */

document.addEventListener('DOMContentLoaded', () => {
  // This script is specifically for the resume page
  // and provides a direct solution for the scroll-to-top button
  
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Show button after a bit of scrolling
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
      } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
      }
    });
    
    // Add click event
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Initialize button state
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    }
  }
});
