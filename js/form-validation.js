/**
 * Contact Form Validation
 * Provides enhanced form validation with clear error messages and accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // Find the contact form
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    // Set up form validation
    contactForm.setAttribute('novalidate', '');
    
    // Add submit event handler
    contactForm.addEventListener('submit', function(event) {
      // Prevent default form submission
      event.preventDefault();
      
      // Reset previous errors
      clearFormErrors(contactForm);
      
      // Validate the form
      const isValid = validateForm(contactForm);
      
      // If form is valid, submit it
      if (isValid) {
        // Show loading state
        const submitBtn = contactForm.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual submission code)
        setTimeout(() => {
          // Show success message
          const formWrapper = contactForm.parentElement;
          const successMessage = document.createElement('div');
          successMessage.className = 'form-success fade-in';
          successMessage.innerHTML = `
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent!</h3>
            <p>Thank you for contacting me. I'll get back to you as soon as possible.</p>
            <button type="button" class="btn btn-neon mt-4" id="resetForm">Send Another Message</button>
          `;
          
          // Hide the form and show success
          contactForm.style.display = 'none';
          formWrapper.appendChild(successMessage);
          
          // Reset form button handler
          document.getElementById('resetForm').addEventListener('click', () => {
            contactForm.reset();
            successMessage.remove();
            contactForm.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          });
          
        }, 1500);
      }
    });
    
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
      // Validate on blur (when user leaves the field)
      input.addEventListener('blur', () => {
        validateField(input);
      });
      
      // Clear error when user starts typing again
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') {
          const errorElement = document.getElementById(`${input.id}-error`);
          if (errorElement) {
            errorElement.textContent = '';
            input.setAttribute('aria-invalid', 'false');
          }
        }
      });
    });
  }
});

/**
 * Validates the entire form
 * @param {HTMLFormElement} form - The form element to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  return isValid;
}

/**
 * Validates an individual form field
 * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field - The field to validate
 * @returns {boolean} - Whether the field is valid
 */
function validateField(field) {
  // Get field value and trim whitespace
  const value = field.value.trim();
  
  // Skip validation for non-required fields that are empty
  if (!field.required && value === '') {
    return true;
  }
  
  // Initialize error message
  let errorMessage = '';
  
  // Check for required fields
  if (field.required && value === '') {
    errorMessage = 'This field is required';
  }
  // Validate email fields
  else if (field.type === 'email' && value !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Please enter a valid email address';
    }
  }
  // Validate minimum length
  else if (field.minLength && value.length < field.minLength) {
    errorMessage = `Must be at least ${field.minLength} characters`;
  }
  // Validate maximum length
  else if (field.maxLength && value.length > field.maxLength) {
    errorMessage = `Cannot exceed ${field.maxLength} characters`;
  }
  // Validate pattern (if specified)
  else if (field.pattern && !new RegExp(field.pattern).test(value)) {
    errorMessage = field.dataset.errorPattern || 'Please match the requested format';
  }
  
  // Get or create error display element
  let errorElement = document.getElementById(`${field.id}-error`);
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.id = `${field.id}-error`;
    field.parentNode.appendChild(errorElement);
    
    // Add aria attributes for accessibility
    field.setAttribute('aria-describedby', errorElement.id);
  }
  
  // Display error if any
  if (errorMessage) {
    errorElement.textContent = errorMessage;
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('is-invalid');
    return false;
  } else {
    errorElement.textContent = '';
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('is-invalid');
    return true;
  }
}

/**
 * Clears all form errors
 * @param {HTMLFormElement} form - The form element
 */
function clearFormErrors(form) {
  const errorElements = form.querySelectorAll('.error-message');
  const inputs = form.querySelectorAll('input, textarea, select');
  
  errorElements.forEach(element => {
    element.textContent = '';
  });
  
  inputs.forEach(input => {
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('is-invalid');
  });
}
