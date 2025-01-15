// script.js

// Smooth Scroll for Internal Links
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

      // Highlight active section
      document.querySelectorAll('.nav-links li a').forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent.`);
      contactForm.reset(); // Clear the form after submission
    } else {
      alert('Please fill out all fields before submitting.');
    }

    // Here you can add AJAX / fetch call to send data to a server
  });
}

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: none;
  padding: 10px 15px;
  border: none;
  background-color: #057aff;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  z-index: 1000;
`;
document.body.appendChild(scrollTopBtn);

// Show or Hide Scroll-to-Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to Top Behavior
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Animate Sections on Scroll
const revealElements = document.querySelectorAll('.container');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));
