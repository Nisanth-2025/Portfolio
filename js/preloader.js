// PROFESSIONAL MINIMALIST PRELOADER
// Run this as early as possible, even before DOMContentLoaded
(function() {
  // Check if this is the first visit
  const isFirstVisit = !sessionStorage.getItem('visited');
  
  // For any page except index.html, or if not first visit, don't show preloader
  const path = window.location.pathname;
  const isIndexPage = path === '/' || path.endsWith('index.html') || path.endsWith('/');
    console.log("Preloader init check:", { isFirstVisit, isIndexPage, path });
  
  if (!isIndexPage || !isFirstVisit) {
    // Hide preloader immediately
    console.log("Hiding preloader due to conditions");
    const style = document.createElement('style');
    style.textContent = '#preloader { display: none !important; }';
    document.head.appendChild(style);
  } else {
    // Mark as visited for future visits
    sessionStorage.setItem('visited', 'true');
    console.log("Preloader should be visible");
  }
})();

// Main preloader functionality
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  
  console.log("Professional preloader initialized");
  
  // Check if preloader is already hidden
  if (preloader.style.display === 'none') {
    console.log("Preloader already hidden");
    document.body.style.overflow = 'visible';
    return;  }
  
  // Initialize elements
  const loadingBar = document.querySelector('.loading-bar');
  const loadingText = document.querySelector('.loading-text');
  const logoContainer = document.querySelector('.logo-container');
  const loadingProgress = document.querySelector('.loading-progress');
  const loadingPercentage = document.querySelector('.loading-percentage');
  
  // Start with elements hidden
  if (loadingBar) loadingBar.style.opacity = '0';
  if (loadingText) loadingText.style.opacity = '0';
  if (logoContainer) logoContainer.style.opacity = '0';
  
  // Ensure percentage is visible and starts at 0%
  if (loadingPercentage) {
    loadingPercentage.textContent = '0%';
    // Override CSS animation to make it immediately visible
    loadingPercentage.style.animation = 'none';
    loadingPercentage.style.opacity = '1';
    loadingPercentage.style.transform = 'translateX(-50%)';
  }
  
  // Hide canvas (not needed in clean design)
  const canvas = document.querySelector('.spark');
  if (canvas) canvas.style.display = 'none';
  
  // Enhanced loading sequence
  window.addEventListener('load', () => {
    console.log("Page loaded, starting professional preloader sequence");
    
    const totalDuration = 4000; // 4 seconds for optimal UX
    const startTime = Date.now();
    
    // Show loading elements with staggered animation
    setTimeout(() => {
      if (loadingBar) {
        loadingBar.style.transition = 'opacity 0.6s ease-out';
        loadingBar.style.opacity = '1';
      }
      if (loadingText) {
        loadingText.style.transition = 'opacity 0.6s ease-out';
        loadingText.style.opacity = '1';
      }
      if (logoContainer) {
        logoContainer.style.transition = 'opacity 0.6s ease-out';
        logoContainer.style.opacity = '1';
      }
    }, 1200);
      // Professional loading messages
    const loadingMessages = [
      "Initializing Experience",
      "Loading Components", 
      "Preparing Interface",
      "Almost Ready"
    ];
    
    // Smooth progress updates with easing
    function updateProgress() {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / totalDuration) * 100, 99);
      
      // Apply smooth easing for natural feel
      const easedProgress = easeOutCubic(progress / 100) * 100;
      
      // Update progress bar
      if (loadingProgress) {
        loadingProgress.style.width = `${easedProgress}%`;
      }
      
      // Update percentage display
      if (loadingPercentage) {
        loadingPercentage.textContent = `${Math.round(easedProgress)}%`;
      }
      
      // Update loading message with smooth transitions
      if (loadingText) {
        const messageIndex = Math.floor(easedProgress / 25);
        if (messageIndex < loadingMessages.length && 
            loadingText.textContent !== loadingMessages[messageIndex]) {
          loadingText.style.opacity = '0.5';
          setTimeout(() => {
            loadingText.textContent = loadingMessages[messageIndex];
            loadingText.style.opacity = '1';
          }, 150);
        }
      }
      
      // Continue or finish
      if (elapsedTime < totalDuration) {
        requestAnimationFrame(updateProgress);
      } else {
        finishLoading();
      }
    }
      // Smooth easing function
    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }
    
    // Start progress animation immediately
    updateProgress();
  });
  
  // Professional exit function
  function finishLoading() {
    console.log("Completing preloader sequence");
    
    // Complete progress bar
    if (loadingProgress) {
      loadingProgress.style.transition = 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      loadingProgress.style.width = '100%';
    }
    
    // Update percentage to 100%
    if (loadingPercentage) {
      loadingPercentage.textContent = '100%';
    }
    
    // Professional exit animation
    setTimeout(() => {
      preloader.classList.add('exit-mode');
      
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
        console.log("Preloader sequence complete");
      }, 1200);
    }, 500);  }
  
  // Failsafe timeout
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('exit-mode')) {
      console.log("FAILSAFE: Force closing preloader");
      finishLoading();
    }
  }, 5500);
});
