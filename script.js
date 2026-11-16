// ============================================================
// GABRIEL PARINAS PORTFOLIO — script.js
// Light/dark follows the browser automatically (CSS only), so
// there is no theme code here. This file handles the menu and
// the scroll effects. The page works without it.
// ============================================================

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── 1. MOBILE MENU ───────────────────────────────────────────
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

function setMenu(open) {
  root.classList.toggle('menu-open', open);
  if (navToggle) {
    navToggle.setAttribute('aria-expanded', open);
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
}
const menuIsOpen = () => root.classList.contains('menu-open');

navToggle && navToggle.addEventListener('click', () => setMenu(!menuIsOpen()));
navLinks && navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuIsOpen()) { setMenu(false); navToggle && navToggle.focus(); }
});
// Rotating or widening past the mobile layout closes the menu so the page is never left locked.
window.matchMedia('(min-width: 821px)').addEventListener?.('change', (e) => { if (e.matches) setMenu(false); });

const sectionLinks = navLinks ? [...navLinks.querySelectorAll('a[href^="#"]')] : [];

// ── 2. SCROLL-LINKED EFFECTS ─────────────────────────────────
// a) hairline under the nav once the page has moved
// b) hero gently fades and shrinks as it scrolls away
// c) the About statement lights up word by word
const heroInner = document.querySelector('.hero-inner');
const statement = document.getElementById('statement');
let words = [];

if (statement && !reduceMotion) {
  const text = statement.textContent.trim().split(/\s+/);
  statement.textContent = '';
  text.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'w';
    span.textContent = word;
    statement.append(span, i < text.length - 1 ? ' ' : '');
    words.push(span);
  });
}

const clamp01 = (n) => Math.min(1, Math.max(0, n));
let ticking = false;

function onScroll() {
  ticking = false;
  const y  = window.scrollY;
  const vh = window.innerHeight;

  nav && nav.classList.toggle('is-scrolled', y > 4);
  // Back at the top (hero), no section link is highlighted.
  if (y < vh * 0.35) sectionLinks.forEach(a => a.classList.remove('is-active'));
  if (reduceMotion) return;

  if (heroInner) {
    const p = clamp01((y - vh * 0.18) / (vh * 0.62));
    heroInner.style.opacity   = String(1 - p);
    heroInner.style.transform = p ? `translateY(${p * -24}px) scale(${1 - p * 0.05})` : '';
  }

  if (words.length) {
    const r = statement.getBoundingClientRect();
    // 0 when the paragraph enters near the bottom, 1 once it sits in the upper half
    const p = clamp01((vh * 0.88 - r.top) / (r.height + vh * 0.4));
    const lit = Math.round(p * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < lit));
  }
}

window.addEventListener('scroll', () => {
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// ── 3. REVEAL ON SCROLL ──────────────────────────────────────
// Items fade and rise in; items arriving together are staggered.
const revealItems = document.querySelectorAll('[data-reveal]');

if (!('IntersectionObserver' in window) || reduceMotion) {
  revealItems.forEach(el => el.classList.add('is-in'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.filter(e => e.isIntersecting).forEach((entry, i) => {
      entry.target.style.setProperty('--d', `${Math.min(i, 6) * 90}ms`);
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach(el => revealObserver.observe(el));
}

// ── 4. ACTIVE NAV LINK ───────────────────────────────────────
const sections = sectionLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));
}
