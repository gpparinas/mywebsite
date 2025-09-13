document.addEventListener('DOMContentLoaded', () => {

  // ======================
  // Header & Navigation
  // ======================
  const header = document.querySelector('header');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('nav a');
  const mobileNavLinks = mobileNav.querySelectorAll('a');

  // Mobile Menu Toggle
  mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the 'click outside' from firing immediately
    mobileNav.classList.toggle('hidden');
  });

  // Close menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.add('hidden');
    }
  });

  // Smooth Scroll & Active Link Highlighting
  window.addEventListener('scroll', () => {
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + headerHeight;
    
    // Highlight active link
    document.querySelectorAll('main section').forEach(section => {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold');
          if (`#${section.id}` === link.getAttribute('href')) {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold');
          }
        });
      }
    });
  });
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ======================
  // Dark Mode Toggle
  // ======================
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  };

  // On page load, check for saved theme
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);

  darkModeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // ======================
  // Scroll-to-Top Button
  // ======================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '&#8593;'; // Up arrow character
  scrollTopBtn.className = 'fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hidden hover:scale-110';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======================
  // Fade-in Sections on Scroll
  // ======================
  const faders = document.querySelectorAll('.fade-in-section');
  const faderOptions = {
    threshold: 0.1,
  };

  const faderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, faderOptions);

  faders.forEach(fader => {
    faderObserver.observe(fader);
  });
});