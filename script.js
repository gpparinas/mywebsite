// ============================================================
// GABRIEL PARINAS PORTFOLIO — script.js
// ============================================================

// ── 1. THEME (System / Light / Dark-AMOLED) ──────────────────
// "system" = no data-theme attribute, so CSS follows the device
// setting automatically (and updates live if the device switches).
// The button cycles: System → Light → Dark → System.
const themeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
const THEME_ORDER = ['system', 'light', 'dark'];
const THEME_LABEL = { system: 'System', light: 'Light', dark: 'Dark' };

function readTheme() {
  try {
    const t = localStorage.getItem('theme');
    return t === 'light' || t === 'dark' ? t : 'system';
  } catch (e) { return 'system'; }
}

function saveTheme(theme) {
  try {
    if (theme === 'system') localStorage.removeItem('theme');
    else localStorage.setItem('theme', theme);
  } catch (e) { /* storage blocked: choice lasts until reload */ }
}

function applyTheme(theme) {
  if (theme === 'system') html.removeAttribute('data-theme');
  else html.setAttribute('data-theme', theme);
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const icons = {
    system: document.getElementById('systemIcon'),
    light:  document.getElementById('sunIcon'),
    dark:   document.getElementById('moonIcon'),
  };
  Object.entries(icons).forEach(([key, el]) => el && el.classList.toggle('hidden', key !== theme));
  if (themeToggle) {
    const next = THEME_ORDER[(THEME_ORDER.indexOf(theme) + 1) % THEME_ORDER.length];
    themeToggle.setAttribute('aria-label', `Theme: ${THEME_LABEL[theme]}. Click to switch to ${THEME_LABEL[next]}.`);
    themeToggle.title = `Theme: ${THEME_LABEL[theme]}`;
  }
}

let currentTheme = readTheme();
applyTheme(currentTheme);

themeToggle && themeToggle.addEventListener('click', () => {
  currentTheme = THEME_ORDER[(THEME_ORDER.indexOf(currentTheme) + 1) % THEME_ORDER.length];
  saveTheme(currentTheme);
  applyTheme(currentTheme);
});

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

const navObserver = 'IntersectionObserver' in window && new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = [...navLinks].find(l => l.getAttribute('href') === '#' + entry.target.id);
      active && active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

navObserver && sections.forEach(s => navObserver.observe(s));

// ── 5. FADE-IN ON SCROLL ─────────────────────────────────────
const fadeSections = document.querySelectorAll('.fade-in-section');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduceMotion) {
  // Older browsers or reduced-motion users: just show everything.
  fadeSections.forEach(el => el.classList.add('is-visible'));
} else {
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  fadeSections.forEach(el => fadeObserver.observe(el));
}
