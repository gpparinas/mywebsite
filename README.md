# Gabriel Philip Pariñas - Personal Website

## Overview
This repository contains the source code for a modern personal portfolio showcasing professional experience as an IT Support Specialist, now updated with an **OLED** true‑black dark theme, class-based toggling, and improved performance and accessibility.
The site utilizes Tailwind CSS v4 via the Browser CDN, featuring a custom dark variant, an early pre-paint theme script, and compatibility improvements for Mozilla Firefox and Safari Browser. 
All portfolio content has been aligned with the latest resume for accuracy across skills, experience, certifications, and education. 

## Key Updates (2025 OLED Refresh)
- OLED dark mode using true black backgrounds with Tailwind class-based dark utilities for better contrast and reduced power on supported screens. 
- Manual dark/light toggle that persists with localStorage, follows system preference when no choice is saved, and updates on OS theme changes.
- Tailwind v4 Browser CDN with a custom dark variant override so html.dark reliably activates dark: utilities on click. 
- Pre‑paint initialization script that sets the theme before rendering to prevent flash-of-wrong-theme (FOUC).
- Resume-driven content refresh for Skills, Certifications, Experience, and Education. 

## Website Structure
- Hero/Summary section aligned with the resume’s professional summary and location/context.
- Technical Skills grouped by support, networking/security, cloud/admin, remote support, monitoring, automation, and documentation.
- Certifications and Training, Experience timeline with role, dates, and highlights, plus Education details.
- Responsive header with desktop and mobile navigation, contact links, and an accessible theme toggle.

## Technologies Used
- HTML5 for semantic structure and accessibility foundations. 
- Tailwind CSS v4 (Browser CDN) with a custom dark variant for class-based dark mode.
- JavaScript (ES6+) for theme toggling, mobile menu, scroll spy, smooth scrolling, and IntersectionObserver animations.
- Git & GitHub Pages for version control and static deployment.
  
## Dark Mode Architecture
- Manual toggle adds/removes the dark class on the html element, which activates dark: utilities via a custom variant. 
- A pre‑paint inline script initializes the theme from localStorage or falls back to prefers-color-scheme to avoid FOUC. 
- matchMedia('(prefers-color-scheme: dark)') is observed so the UI follows system changes if no explicit

## Setup & Installation
git clone <repo URL>
cd mywebsite
Open `index.html` directly in a modern browser; no build step is required when using the Tailwind Browser CDN. 
If using private browsing with restricted storage, theme preference will fall back to system and still toggle for the active session. 

## Deployment
Hosted on GitHub Pages from the `main` branch for immediate, static deployments without a build pipeline. 
After pushing changes, perform a hard refresh or test in a private window to bypass cached assets. 

## Customization Guide
- Colors: Adjust surface and text classes (e.g., `bg-black`, `text-gray-100`) and dark variants (`dark:`) directly in the HTML.
- Dark Mode: Keep the `html.dark` strategy and the custom dark variant; update `dark:` utilities for new sections as needed. 
- Animations: Edit IntersectionObserver thresholds and fade-in classes in `script.js` to tune reveal behavior. 
- Navigation: Update section IDs and matching anchors in the header and mobile nav to maintain scroll spy accuracy.

## Features
- OLED **dark** mode with true-black surfaces for high contrast and power efficiency on supported displays. 
- System-aware theme with persistent manual override using localStorage and matchMedia fallback.
- Mobile-first responsive layout with desktop and mobile menus, smooth scrolling, and scroll-to-top button. 
- Accessible controls with ARIA labels, semantic markup, and browser UI alignment via color-scheme and theme-color.

## Troubleshooting
- Toggle does nothing: ensure Tailwind v4 Browser CDN is loaded and the `@custom-variant dark` override is present in a `type="text/tailwindcss"` block. 
- Still follows only system theme: confirm the class is applied to `html` (not `body`) and that dark: utilities are used in markup.
- Flicker on load: keep the pre‑paint inline script that sets the initial theme before CSS paints.
- Private browsing: localStorage may be restricted; the script catches storage errors and falls back to system preference seamlessly.
  
## Roadmap
- Add project showcase section with detailed case studies and metrics.
- Implement downloadable PDF resume and structured data for improved SEO. 
- Integrate a privacy-respecting visitor counter or analytics. 
- Add a blog section with tags and RSS for updates.

## Contact
- Email: gabriielpparinas at gmail dot com.
- Twitter/X: @gpparinas.
- GitHub: @gpparinas.
  
## License
Open source under the MIT License, free for personal and commercial use. 
