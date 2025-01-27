// ======================
// Mobile Menu Toggle
// ======================
const mobileMenuButton = document.querySelector('button[aria-label="Open Menu"]');
const mobileNav = document.getElementById('mobileNav');

mobileMenuButton.addEventListener('click', () => {
  mobileNav.classList.toggle('hidden');
  mobileNav.classList.toggle('animate-fadeInDown');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuButton.contains(e.target) && !mobileNav.contains(e.target)) {
    mobileNav.classList.add('hidden');
  }
});

// ======================
// Smooth Scroll + Active Link
// ======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    // Close mobile nav if open
    mobileNav.classList.add('hidden');

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

// Highlight current section link
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
// Dark Mode Toggle
// ======================
const darkModeToggle = document.querySelector('.dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  // Save theme in localStorage
  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// On page load, check localStorage
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

// ======================
// Scroll-to-Top Button
// ======================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hidden';
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
const faders = document.querySelectorAll('.fade-section');
const options = {
  threshold: 0.1,
};

const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove initial opacity-0
      entry.target.classList.remove('opacity-0');
      // Add a Tailwind transition or your own custom class
      entry.target.classList.add('transition-opacity', 'duration-700', 'opacity-100');
      fadeInOnScroll.unobserve(entry.target);
    }
  });
}, options);

faders.forEach(fadeSection => {
  fadeInOnScroll.observe(fadeSection);
});