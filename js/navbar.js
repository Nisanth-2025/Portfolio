/**
 * Enhanced Navbar with Accessibility and Mobile Support
 * Provides responsive navigation with keyboard navigation and ARIA support
 */

// Get DOM elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a, .nav-links .active-nav-item');
const header = document.querySelector('header');
const logo = document.querySelector('.logo');

// Remove outline from logo when clicked
if (logo) {
  logo.addEventListener('mousedown', function(e) {
    // Prevent the default focus outline
    this.classList.add('clicked');
    
    // Remove the class after the click
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 100);
  });
}

// Initialize menu state
let isMenuOpen = false;

/**
 * Toggle mobile menu state
 * @param {boolean} open - Whether to open or close the menu
 */
function toggleMenu(open) {
  isMenuOpen = open;
  
  hamburger.classList.toggle('active', isMenuOpen);
  navLinks.classList.toggle('active', isMenuOpen);
  
  // Update ARIA attributes
  hamburger.setAttribute('aria-expanded', isMenuOpen);
  
  // Focus management for keyboard users
  if (isMenuOpen) {
    // Focus first menu item when opening
    setTimeout(() => {
      navItems[0].focus();
    }, 100);
  }
}

// Mobile menu toggle functionality with enhanced accessibility
hamburger.addEventListener('click', () => {
  toggleMenu(!isMenuOpen);
});

// Handle keyboard navigation
hamburger.addEventListener('keydown', (event) => {
  // Open menu on Enter or Space
  if ((event.key === 'Enter' || event.key === ' ') && !isMenuOpen) {
    event.preventDefault();
    toggleMenu(true);
  }
});

// Close menu when a link is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    toggleMenu(false);
  });
});

// Close menu when clicking outside - improved mobile experience
document.addEventListener('click', (event) => {
  // Check if the click is outside navigation and not on the hamburger button
  const isClickOutsideNav = isMenuOpen && !navLinks.contains(event.target) && !hamburger.contains(event.target);
  
  if (isClickOutsideNav) {
    toggleMenu(false);
  }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isMenuOpen) {
    toggleMenu(false);
    hamburger.focus(); // Return focus to the hamburger button
  }
});

// Handle keyboard navigation within the menu
navLinks.addEventListener('keydown', (event) => {
  const currentIndex = Array.from(navItems).indexOf(document.activeElement);
  
  if (currentIndex >= 0) {
    // Arrow down or tab: Move to next item
    if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % navItems.length;
      navItems[nextIndex].focus();
    }
    
    // Arrow up or shift+tab: Move to previous item
    else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + navItems.length) % navItems.length;
      navItems[prevIndex].focus();
    }
  }
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
