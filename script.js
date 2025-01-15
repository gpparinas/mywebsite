// script.js

// Example: Smooth scroll for internal links (if you want an even smoother effect)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  });
});

// Example: On form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    alert('Message sent! We will get back to you soon.');
    // Here you can add AJAX / fetch call to send data to server.
  });
}
