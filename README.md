# 🚀 Gabriel Pariñas – IT Support Engineer Portfolio  
&gt; Live site: [https://gpparinas.github.io/mywebsite](https://gpparinas.github.io/mywebsite)

---

## 📌 What’s inside
| File | Purpose |
|------|---------|
| `index.html` | Single-page portfolio with dark-mode, accessibility, responsive grid |
| `script.js` | Dark-mode toggle, mobile nav, scroll-spy, contact-form validation, Formspree integration |
| `style.css` | Print-friendly stylesheet, focus-visible rings, fade-in animations |
| `photo.png` | Professional head-shot (webp-ready) |
| `resume.pdf` | One-click download for recruiters |

---

## ✨ Key Enhancements (vs. vanilla HTML)
1. **Real case studies**  
   - 2FA / Sentinel driver conflict – 500 → 0 devices in 36 h  
   - Windows Server 2008-R2 → 2019 zero-downtime migration  
   - Intern training program – 70 % reduction in senior shadow time  
2. **Accessibility first**  
   - Skip-link, ARIA labels, keyboard focus trap, semantic HTML  
3. **Performance & UX**  
   - Tailwind via CDN (no build step)  
   - Intersection-Observer fade-ins, lazy-loaded images  
   - Mobile-first, dark-mode persisted in localStorage  
4. **Contact form**  
   - Live validation, error states, Formspree endpoint (swap yours)  
5. **Print & PDF ready**  
   - `@media print` hides nav/footer; keeps clean résumé layout  

---

## 🛠️ Local test
```bash
git clone https://github.com/gpparinas/mywebsite.git
cd mywebsite
# double-click index.html  or
python -m http.server 8000
# open http://localhost:8000
