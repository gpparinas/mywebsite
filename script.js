// ============================================
// 1. ENHANCED DARK MODE WITH SYSTEM DETECTION
// ============================================

const darkModeToggle = document.getElementById('darkModeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;

// Function to update icons
const updateIcons = (isDark) => {
  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    darkModeToggle.setAttribute('aria-pressed', 'true');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    darkModeToggle.setAttribute('aria-pressed', 'false');
  }
};

// Check for saved preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme on page load
if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  html.classList.add('dark');
  updateIcons(true);
} else {
  html.classList.remove('dark');
  updateIcons(false);
}

// Toggle dark mode manually
darkModeToggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  const isDark = html.classList.contains('dark');
  
  // Update icons
  updateIcons(isDark);
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Listen for system theme changes (optional - updates even if user doesn't toggle)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  // Only auto-update if user hasn't set a manual preference
  if (!localStorage.getItem('theme')) {
    if (e.matches) {
      html.classList.add('dark');
      updateIcons(true);
    } else {
      html.classList.remove('dark');
      updateIcons(false);
    }
  }
});
// ============================================
// 2. MOBILE MENU FUNCTIONALITY
// ============================================

const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');

// Toggle mobile menu
mobileMenuButton.addEventListener('click', () => {
  const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  
  // Toggle menu visibility
  mobileNav.classList.toggle('hidden');
  
  // Toggle icon between bars and X
  if (mobileMenuIcon.classList.contains('fa-bars')) {
    mobileMenuIcon.classList.remove('fa-bars');
    mobileMenuIcon.classList.add('fa-times');
  } else {
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
  }
  
  // Update aria-expanded
  mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
});

// Close mobile menu when clicking on a link
const mobileNavLinks = mobileNav.querySelectorAll('a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileNav.contains(e.target) && !mobileMenuButton.contains(e.target)) {
    mobileNav.classList.add('hidden');
    mobileMenuIcon.classList.remove('fa-times');
    mobileMenuIcon.classList.add('fa-bars');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  }
});

// ============================================
// 3. SMOOTH SCROLLING FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // Calculate offset for fixed header
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update focus for accessibility
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus();
      
      // Update URL without triggering scroll
      history.pushState(null, null, targetId);
    }
  });
});

// ============================================
// 4. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

const fadeInElements = document.querySelectorAll('.fade-in-section');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Optional: Stop observing after animation
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
fadeInElements.forEach(element => {
  fadeInObserver.observe(element);
});

// ============================================
// 5. ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNavigation = () => {
  const scrollPosition = window.pageYOffset + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-semibold');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
        }
      });
    }
  });
};

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    highlightNavigation();
  });
});

// ============================================
// 6. CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.getElementById('submitButton');
const submitText = document.getElementById('submitText');
const formStatus = document.getElementById('formStatus');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Validation functions
const validateName = () => {
  const name = nameInput.value.trim();
  if (name === '') {
    showError(nameInput, nameError, 'Name is required');
    return false;
  } else if (name.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters');
    return false;
  } else {
    clearError(nameInput, nameError);
    return true;
  }
};

const validateEmail = () => {
  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email === '') {
    showError(emailInput, emailError, 'Email is required');
    return false;
  } else if (!emailRegex.test(email)) {
    showError(emailInput, emailError, 'Please enter a valid email address');
    return false;
  } else {
    clearError(emailInput, emailError);
    return true;
  }
};

const validateMessage = () => {
  const message = messageInput.value.trim();
  if (message === '') {
    showError(messageInput, messageError, 'Message is required');
    return false;
  } else if (message.length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters');
    return false;
  } else {
    clearError(messageInput, messageError);
    return true;
  }
};

// Show error message
const showError = (input, errorElement, message) => {
  input.classList.add('border-red-500', 'focus:ring-red-500');
  input.setAttribute('aria-invalid', 'true');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
};

// Clear error message
const clearError = (input, errorElement) => {
  input.classList.remove('border-red-500', 'focus:ring-red-500');
  input.setAttribute('aria-invalid', 'false');
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
};

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();
  
  if (!isNameValid || !isEmailValid || !isMessageValid) {
    showFormStatus('Please fix the errors above', 'error');
    return;
  }
  
  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitText.textContent = 'Sending...';
  submitButton.classList.add('opacity-50', 'cursor-not-allowed');
  
  try {
    // Get form data
    const formData = new FormData(contactForm);
    
    // TODO: Replace with your Formspree endpoint or backend API
    const formspreeEndpoint = 'https://formspree.io/f/mnnwpjga';
    
    // Submit form data
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      showFormStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        resetSubmitButton();
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    showFormStatus('❌ Something went wrong. Please try again or email me directly.', 'error');
    resetSubmitButton();
  }
});

// Show form status message
const showFormStatus = (message, type) => {
  formStatus.textContent = message;
  formStatus.classList.remove('hidden', 'text-green-600', 'text-red-600');
  formStatus.classList.add(type === 'success' ? 'text-green-600' : 'text-red-600');
  
  // Hide status after 5 seconds
  setTimeout(() => {
    formStatus.classList.add('hidden');
  }, 5000);
};

// Reset submit button
const resetSubmitButton = () => {
  submitButton.disabled = false;
  submitText.textContent = 'Send Message';
  submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
};

// ============================================
// 7. KEYBOARD NAVIGATION ENHANCEMENT
// ============================================

// Trap focus in mobile menu when open
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }
    
    // Close menu on Escape key
    if (e.key === 'Escape') {
      mobileNav.classList.add('hidden');
      mobileMenuIcon.classList.remove('fa-times');
      mobileMenuIcon.classList.add('fa-bars');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.focus();
    }
  });
};

// Apply focus trap when mobile menu is open
mobileMenuButton.addEventListener('click', () => {
  if (!mobileNav.classList.contains('hidden')) {
    trapFocus(mobileNav);
  }
});

// ============================================
// 8. UPDATE CURRENT YEAR IN FOOTER
// ============================================

const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// ============================================
// 9. LAZY LOADING IMAGES (if needed for future)
// ============================================

// Add this if you add more images to the portfolio
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
} else {
  // Fallback for browsers without IntersectionObserver
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  });
}

// ============================================
// 10. SCROLL TO TOP BUTTON (Optional Enhancement)
// ============================================

// Create scroll to top button
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  button.setAttribute('aria-label', 'Scroll to top');
  button.className = 'fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all opacity-0 invisible print:hidden z-40';
  button.id = 'scrollToTop';
  
  document.body.appendChild(button);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.classList.remove('opacity-0', 'invisible');
      button.classList.add('opacity-100', 'visible');
    } else {
      button.classList.remove('opacity-100', 'visible');
      button.classList.add('opacity-0', 'invisible');
    }
  });
  
  // Scroll to top on click
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Initialize scroll to top button
createScrollToTopButton();

// ============================================
// 11. PERFORMANCE MONITORING (Optional)
// ============================================

// Log page load performance
window.addEventListener('load', () => {
  if ('performance' in window) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  }
});

// ============================================
// 12. PREVENT LAYOUT SHIFT
// ============================================

// Ensure images don't cause layout shift
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.visibility = 'hidden';
      img.addEventListener('load', () => {
        img.style.visibility = 'visible';
      });
    }
  });
});

// ============================================
// END OF SCRIPT
// ============================================

console.log('Portfolio JavaScript loaded successfully ✅');
