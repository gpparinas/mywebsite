# Gabriel Pariñas — IT Infrastructure & Support Portfolio

Live site: [https://gpparinas.github.io/mywebsite](https://gpparinas.github.io/mywebsite)

A single-page portfolio website for Gabriel Philip Pariñas, showcasing IT infrastructure, systems administration, networking, monitoring, certifications, and professional experience.

## What's inside

| File | Purpose |
|------|---------|
| `index.html` | Single-page portfolio: content and structure |
| `style.css` | Minimal design: colours, type, layout, and motion |
| `script.js` | Mobile menu and scroll effects (the page works without it) |
| `photo.webp` | Small headshot used in the hero (400px wide) |
| `photo-800.webp` | Larger headshot used in the About section |
| `photo.png` | Original full-size headshot (source for the two above) |
| `resume.pdf` | Downloadable résumé for recruiters and hiring managers |
| `favicon.svg` | Browser tab icon |
| `og-image.png` | Preview image shown when the link is shared |

## Features

- Minimal single-column layout with a frosted top navigation bar
- White by default; switches to dark automatically when the browser or device is in dark mode (no manual toggle)
- Apple-inspired motion: hero text rises in on load, sections fade and rise as they scroll into view, the About statement lights up word by word, and the hero fades as it scrolls away
- Motion is switched off for visitors who ask their device to reduce motion
- Sections: About, work highlights, skills, experience timeline, verifiable certifications & training, and contact
- Full-screen menu on phones
- No icon library or framework: one font request, plain HTML, CSS and JavaScript
- Prints cleanly, and stays readable with JavaScript turned off
- GitHub Pages deployment with no build step required

## Local preview

```bash
git clone https://github.com/gpparinas/mywebsite.git
cd mywebsite
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000)

## Deployment

This site is deployed with GitHub Pages from the repository branch.

## Updating assets

To update the résumé, replace `resume.pdf` with the same filename.

To update the profile photo, replace `photo.png`, then export a 400px-wide WebP copy as `photo.webp` (that is the file the site loads).

GitHub Pages will publish the updated versions after the next commit.

## Maintainer

Gabriel Philip Pariñas  
GitHub: [https://github.com/gpparinas](https://github.com/gpparinas)
