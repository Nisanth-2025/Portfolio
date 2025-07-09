// Apply background color immediately before DOM is fully loaded
document.documentElement.style.backgroundColor = '#0a0a14';
document.body.style.backgroundColor = '#0a0a14';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize elements
  const transitionOverlay = document.getElementById('page-transition');
  const mainContent = document.querySelector('main');
  
  // Set initial states - force background color again
  document.documentElement.style.backgroundColor = '#0a0a14';
  document.body.style.backgroundColor = '#0a0a14';
  transitionOverlay.style.opacity = '0';
  transitionOverlay.style.visibility = 'hidden';
    // Reveal content with animations when page loads
  window.addEventListener('load', () => {
    // Ensure body has the right background color and is not hidden
    document.documentElement.style.backgroundColor = '#0a0a14';
    document.body.style.backgroundColor = '#0a0a14';
    document.body.style.overflow = 'visible';
    
    // Let preloader.js handle the preloader
    // Don't manipulate preloader here to avoid conflicts
    
    // Keep overlay visible briefly, then hide it
    setTimeout(() => {
      transitionOverlay.style.opacity = '0';
      setTimeout(() => {
        transitionOverlay.style.visibility = 'hidden';
      }, 100);
    }, 50);
  });
    // Handle navigation transitions
  // Only select actual links, not the active-nav-item spans
  const internalLinks = document.querySelectorAll('a[href^="./"], a[href^="/"], a:not([href^="http"]):not(.active-nav-item)');
  
  internalLinks.forEach(link => {
    // Skip anchor links (they shouldn't trigger page transitions)
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) return;
      // Skip external links or links with target="_blank"
    if (link.getAttribute('target') === '_blank' || 
        (link.getAttribute('href') && link.getAttribute('href').match(/^https?:\/\//))) return;
        
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetHref = this.getAttribute('href');
      
      // First, set a CSS variable to ensure consistent color across all elements
      document.documentElement.style.setProperty('--before-transition-bg', '#0a0a14');
      
      // Force background color on the html and body elements
      document.documentElement.style.backgroundColor = '#0a0a14';
      document.body.style.backgroundColor = '#0a0a14';
      
      // Show the overlay FIRST (before any animations)
      transitionOverlay.style.visibility = 'visible';
      transitionOverlay.style.opacity = '1';
      
      // Add a class to the body to prevent any unexpected color changes
      document.body.classList.add('transitioning');
      
      // Then animate the content OUT if needed
      if (mainContent) {
        mainContent.classList.add('page-exit');
      }
      
      // Navigate to new page after a very short delay
      setTimeout(() => {
        // Set background color one final time right before navigation
        document.documentElement.style.backgroundColor = '#0a0a14';
        document.body.style.backgroundColor = '#0a0a14';
        window.location.href = targetHref;
      }, 100);
    });
  });
});
