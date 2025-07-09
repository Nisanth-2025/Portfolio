/**
 * Effects.js - Visual effects and animations
 * Portfolio: Nisanth S
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== SCROLL ANIMATIONS =====
  // Create scroll observer for reveal animations
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Add 'visible' class when element is in viewport
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Optional: stop observing after animation
        if (entry.target.dataset.once === 'true') {
          scrollObserver.unobserve(entry.target);
        }
      } else if (entry.target.dataset.once !== 'true') {
        // If the element should repeat animations when scrolling up/down
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -100px 0px' // Slightly offset to trigger before fully in view
  });
  
  // Observe all elements with 'reveal' class
  document.querySelectorAll('.reveal').forEach(el => {
    scrollObserver.observe(el);
  });
  
  // Scroll Progress Indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.classList.add('scroll-progress');
  document.body.appendChild(scrollProgress);
  
  // Update scroll progress indicator
  function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
  }
  
  // Update on scroll
  window.addEventListener('scroll', updateScrollProgress);

  // ===== PROJECT IMAGE EFFECTS =====
  // Parallax effect for project images
  const projectImageContainers = document.querySelectorAll('.project-image-container');
  
  projectImageContainers.forEach(container => {
    const projectImage = container.querySelector('.project-image');
    
    if (!projectImage) return;
    
    // Subtle parallax movement on mousemove
    container.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
      
      projectImage.style.transform = `translateX(${xAxis}px) translateY(${yAxis}px) scale(1.05)`;
    });
    
    // Return to original position on mouseleave
    container.addEventListener('mouseleave', () => {
      projectImage.style.transform = 'translateX(0) translateY(0) scale(1)';
    });
    
    // Scale up on mouseenter
    container.addEventListener('mouseenter', () => {
      projectImage.style.transition = 'transform 0.3s ease';
      projectImage.style.transform = 'scale(1.05)';
    });
  });
  
  // Add subtle animation to all project cards on scroll
  const projectCards = document.querySelectorAll('.project-card');
  
  // Check if IntersectionObserver is available
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.2,
      rootMargin: '0px'
    });
    
    projectCards.forEach(card => {
      observer.observe(card);
      card.classList.add('with-scroll-animation');
    });
  }
});
