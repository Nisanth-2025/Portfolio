/**
 * Advanced Image Optimization and Lazy Loading
 * Improves loading performance by lazy loading images and using modern image formats
 */

// Check for IntersectionObserver API support
if ('IntersectionObserver' in window) {
  document.addEventListener('DOMContentLoaded', () => {
    // Select all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyBackgrounds = document.querySelectorAll('[data-background]');
    
    // Create the image observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;            // Handle images
          if (img.hasAttribute('data-src')) {
            const originalSrc = img.dataset.src;
            const fallbackSrc = img.dataset.fallback || '';
            
            // Start loading the image
            img.src = originalSrc;
            
            // Add a loaded class when the image is fully loaded
            img.onload = () => {
              img.classList.add('loaded');
              
              // Optional: Apply animation class
              if (img.dataset.animation) {
                img.classList.add(img.dataset.animation);
              }
              
              // Clean up to avoid memory leaks
              img.onload = null;
            };
            
            // Handle image loading errors
            img.onerror = () => {
              console.warn(`Failed to load image: ${originalSrc}`);
              img.classList.add('error');
              
              // Try fallback if available
              if (fallbackSrc) {
                console.log(`Trying fallback image: ${fallbackSrc}`);
                img.src = fallbackSrc;
              }
              
              img.onerror = null;
            };
            
            // Clean up data attributes
            img.removeAttribute('data-src');
            
            // Stop observing the element
            observer.unobserve(img);
          }
            // Handle background images
          if (img.hasAttribute('data-background')) {
            const bgSrc = img.dataset.background;
            const bgFallback = img.dataset.backgroundFallback || '';
            
            // Create a temporary image to test if the background image loads
            const tempImg = new Image();
            tempImg.onload = () => {
              img.style.backgroundImage = `url('${bgSrc}')`;
              img.classList.add('loaded');
              observer.unobserve(img);
            };
            
            tempImg.onerror = () => {
              console.warn(`Failed to load background image: ${bgSrc}`);
              img.classList.add('error');
              
              // Try fallback if available
              if (bgFallback) {
                console.log(`Trying fallback background image: ${bgFallback}`);
                img.style.backgroundImage = `url('${bgFallback}')`;
              }
            };
            
            tempImg.src = bgSrc;
            img.removeAttribute('data-background');
            img.removeAttribute('data-background-fallback');
          }
        }
      });
    }, {
      // Options
      rootMargin: '50px 0px', // Load images a bit before they come into view
      threshold: 0.01 // Trigger when at least 1% of the image is visible
    });
    
    // Start observing the images
    lazyImages.forEach(img => {
      // Add the lazy-image class for styling
      img.classList.add('lazy-image');
      imageObserver.observe(img);
    });
    
    // Start observing background elements
    lazyBackgrounds.forEach(el => {
      el.classList.add('lazy-image');
      imageObserver.observe(el);
    });
    
    console.log('Lazy loading initialized for', lazyImages.length, 'images and', lazyBackgrounds.length, 'background elements');
  });
} else {
  // Fallback for browsers without IntersectionObserver support
  console.log('IntersectionObserver not supported, loading all images immediately');
  
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    
    const lazyBackgrounds = document.querySelectorAll('[data-background]');
    lazyBackgrounds.forEach(el => {
      el.style.backgroundImage = `url('${el.dataset.background}')`;
      el.removeAttribute('data-background');
    });
  });
}

/**
 * WebP Format Detection
 * Checks if the browser supports WebP image format
 */
function checkWebP(callback) {
  const webP = new Image();
  webP.onload = webP.onerror = () => {
    callback(webP.height === 2);
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

// Check WebP support and add a class to the HTML element
checkWebP(supported => {
  document.documentElement.classList.add(supported ? 'webp' : 'no-webp');
});