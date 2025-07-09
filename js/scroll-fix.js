/**
 * Scroll-fix.js - Fix for the scroll-to-top button
 * Portfolio: Nisanth S
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get the existing scroll-to-top button
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Add scroll event listener
    const toggleScrollToTopBtn = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
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
    
    // Debug - Make it always visible during development
    // Comment this out for production
    console.log('Scroll to top button initialized');
  } else {
    console.error('Could not find scroll-to-top button');
  }
});
