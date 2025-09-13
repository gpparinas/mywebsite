// script.js
(function () {
  // ====== THEME ======
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;
  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const btn = document.getElementById('darkModeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setSaved(value) {
    try {
      if (value === 'light' || value === 'dark') localStorage.setItem(STORAGE_KEY, value);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore storage errors (private modes) */ }
  }

  function applyIcons() {
    const isDark = root.classList.contains('dark');
    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle('hidden', !isDark); // show sun in dark mode
      moonIcon.classList.toggle('hidden', isDark); // show moon in light mode
    }
  }

  function applyFrom(saved) {
    if (saved === 'dark') { root.classList.add('dark'); applyIcons(); return; }
    if (saved === 'light') { root.classList.remove('dark'); applyIcons(); return; }
    root.classList.toggle('dark', mq.matches); // follow system if no saved choice
    applyIcons();
  }

  // React to OS changes only if user hasn't explicitly chosen
  function onMQChange(e) {
    if (!getSaved()) {
      root.classList.toggle('dark', e.matches);
      applyIcons();
    }
  }
  if (mq.addEventListener) mq.addEventListener('change', onMQChange);
  else if (mq.addListener) mq.addListener(onMQChange); // Safari/older support

  // Bind toggle
  btn?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    setSaved(isDark ? 'dark' : 'light');
    applyIcons();
  });

  // Initialize after DOM ready (initial paint handled by inline script in <head>)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyFrom(getSaved()));
  } else {
    applyFrom(getSaved());
  }

  // ====== HEADER / NAV ======
  const header = document.querySelector('header');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileNav = document.getElementById('mobileNav');

  // Open/close mobile nav
  mobileMenuButton?.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileNav?.classList.toggle('hidden');
  });

  // Close on link click
  mobileNav?.querySelectorAll('a')?.forEach(link => {
    link.addEventListener('click', () => mobileNav?.classList.add('hidden'));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (mobileMenuButton && mobileNav) {
      if (!mobileMenuButton.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.add('hidden');
      }
    }
  });

  // Scroll spy: highlight active link
  const navLinks = document.querySelectorAll('nav a');
  window.addEventListener('scroll', () => {
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollPosition = window.scrollY + headerHeight;

    document.querySelectorAll('main section[id]').forEach(section => {
      const top = section.offsetTop;
      const bottom = section.offsetTop + section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold');
          if (`#${section.id}` === link.getAttribute('href')) {
            link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold');
          }
        });
      }
    });
  });

  // Smooth anchor scrolling with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;
      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetSection.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });

  // ====== SCROLL TO TOP BUTTON ======
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white text-2xl rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hidden hover:scale-110';
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ====== INTERSECTION OBSERVER ANIMATIONS ======
  const faders = document.querySelectorAll('.fade-in-section');
  const faderOptions = { threshold: 0.1 };
  const faderObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, faderOptions)
    : null;

  faders.forEach(fader => { faderObserver?.observe(fader); });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();