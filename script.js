// script.js

// ======================
// Mobile Menu Toggle (Needs HTML Update)
// ======================
const mobileMenuButton = document.querySelector('button[class*="md:hidden"]');
const navLinks = document.querySelector('ul[class*="md:flex"]'); // Updated selector

mobileMenuButton.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
  mobileMenuButton.classList.toggle('text-blue-600');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuButton.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.add('hidden');
  }
});

// ======================
// Smooth Scroll + Active Section (Fixed for Tailwind)
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Update active section on scroll (Improved Accuracy)
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('text-blue-600', 'dark:text-blue-400');
        }
      });
    }
  });
});

// ======================
// Dark Mode Toggle (Tailwind-Compatible)
// ======================
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Initialize theme
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

// ======================
// Scroll-to-Top Button (Style Adjusted)
// ======================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hidden';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======================
// Removed Elements (Safe to Delete)
// ======================
// 1. Remove progress bars code (not in HTML)
// 2. Remove contact form code (not in HTML)