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

// ── 2. MOBILE MENU (slide-out sidebar) ───────────────────────
const mobileBtn = document.getElementById('mobileMenuButton');
const mobileNav = document.getElementById('mobileNav');
const menuIcon  = document.getElementById('mobileMenuIcon');
const backdrop  = document.getElementById('sidebarBackdrop');

function setMenu(open) {
  if (!mobileNav) return;
  mobileNav.classList.toggle('open', open);
  mobileBtn && mobileBtn.setAttribute('aria-expanded', open);
  if (backdrop) backdrop.hidden = !open;
  if (menuIcon) {
    menuIcon.classList.toggle('fa-bars', !open);
    menuIcon.classList.toggle('fa-times', open);
  }
}

mobileBtn && mobileBtn.addEventListener('click', () => {
  setMenu(!mobileNav.classList.contains('open'));
});
backdrop && backdrop.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
mobileNav && mobileNav.querySelectorAll('.side-nav a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

// ── 3. SMOOTH SCROLL ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = (document.querySelector('.topbar')?.offsetHeight || 0) + 16;
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
