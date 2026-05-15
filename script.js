// ============================================================
// GABRIEL PARINAS PORTFOLIO — script.js
// ============================================================

// ── 1. THEME (dark / light) ──────────────────────────────────
const themeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;

const getPreferred = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

let currentTheme = localStorage.getItem('theme') || getPreferred();
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon(currentTheme);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    currentTheme = e.matches ? 'dark' : 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
  }
});

function updateThemeIcon(theme) {
  const sun  = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');
  if (!sun || !moon) return;
  if (theme === 'dark') {
    sun.classList.remove('hidden');
    moon.classList.add('hidden');
    themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    moon.classList.remove('hidden');
    sun.classList.add('hidden');
    themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
  }
}

// ── 2. MOBILE MENU ───────────────────────────────────────────
const mobileBtn = document.getElementById('mobileMenuButton');
const mobileNav = document.getElementById('mobileNav');
const menuIcon  = document.getElementById('mobileMenuIcon');

mobileBtn && mobileBtn.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  mobileBtn.setAttribute('aria-expanded', open);
  if (menuIcon) {
    menuIcon.classList.toggle('fa-bars', !open);
    menuIcon.classList.toggle('fa-times', open);
  }
});

document.addEventListener('click', (e) => {
  if (mobileNav && !mobileNav.contains(e.target) && !mobileBtn?.contains(e.target)) {
    mobileNav.classList.remove('open');
    mobileBtn && mobileBtn.setAttribute('aria-expanded', 'false');
    if (menuIcon) {
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-times');
    }
  }
});

mobileNav && mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    mobileBtn && mobileBtn.setAttribute('aria-expanded', 'false');
    if (menuIcon) {
      menuIcon.classList.add('fa-bars');
      menuIcon.classList.remove('fa-times');
    }
  });
});

// ── 3. SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('header')?.offsetHeight || 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, null, id);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

// ── 4. ACTIVE NAV HIGHLIGHTING ───────────────────────────────
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const sections = [...navLinks]
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = [...navLinks].find(l => l.getAttribute('href') === '#' + entry.target.id);
      active && active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// ── 5. FADE-IN ON SCROLL ─────────────────────────────────────
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in-section').forEach(el => fadeObserver.observe(el));

// ── 6. SKILL PROGRESS BARS ANIMATE ON SCROLL ─────────────────
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-width]').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-bar-group').forEach(el => barObserver.observe(el));
