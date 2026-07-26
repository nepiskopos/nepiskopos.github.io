# Nikolaos Episkopos - AI Engineer & AI Consultant Portfolio

A professional, responsive portfolio website showcasing expertise in Agentic AI, Retrieval-Augmented Generation, MLOps, and Machine Learning. Built as a dependency-free static site, optimized for performance, accessibility, and SEO.

## 🌟 Features

### 🎨 Design & User Experience
- **Modern AI-themed design** with neural network animations and particle effects
- **Responsive layout** that adapts to all screen sizes and devices
- **Dark/Light theme toggle** with automatic system preference detection and persistence via `localStorage`
- **Accordion-based mobile navigation** for Projects, Experience, Publications, and Contact sections
- **Smooth animations** and transitions throughout the site

### 🚀 Performance & Technical
- **Zero external dependencies** - no JS/CSS frameworks, no font or icon CDNs
- **System font stack** - no external font downloads
- **Deferred JavaScript** loading for faster first paint
- **Lightweight** - all content and interactivity ships in three files (`index.html`, `style.css`, `script.js`)

### 🔍 SEO & Accessibility
- **Structured data** (Person, Organization, WebSite, WebPage JSON-LD schemas)
- **Accessibility-conscious markup** with ARIA labels, skip links, and keyboard-navigable menus
- **Semantic HTML5** for better search engine understanding
- **`sitemap.xml`** and **`robots.txt`** for crawling
- **Open Graph / Twitter Card tags** for social media sharing
- **`humans.txt`** and **`security.txt`** (including a `.well-known/security.txt` copy) for best practices

### 📱 Mobile & Cross-Browser
- **Mobile-first design** with touch-friendly interactions
- **Modern browser support** (relies on CSS Grid, `backdrop-filter`, `clamp()`, and other modern CSS - no legacy/IE fallback)
- **Web App Manifest** (`manifest.json`) for a themed name/icon when bookmarked or added to a home screen

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)** - Vanilla JS, no frameworks or build step
- **Font Awesome icon classes** - mapped to inline emoji in a small local `fontawesome.css` (no external font/icon library is loaded)
- **System Fonts** - native font stack for optimal performance
- **GitHub Pages** - hosting and deployment

## 📁 Project Structure

```
nepiskopos.github.io/
├── .nojekyll                  # Disables Jekyll processing on GitHub Pages
├── .well-known/
│   └── security.txt          # Security policy (canonical location)
├── 404.html                   # Custom error page
├── assets/
│   ├── css/
│   │   ├── style.css         # Main stylesheet
│   │   └── fontawesome.css   # Local icon-class-to-emoji mapping
│   ├── img/
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── avatar-fallback.svg
│   │   ├── dev-icon.svg          # GitHub icon fallback
│   │   ├── github-icon.svg
│   │   ├── linkedin-icon.svg
│   │   ├── orcid-icon.svg
│   │   ├── professional-icon.svg # LinkedIn icon fallback
│   │   └── research-icon.svg     # ORCID icon fallback
│   └── js/
│       └── script.js         # All interactivity + portfolio content data
├── humans.txt                # Team/colophon information
├── index.html                # Main website markup
├── manifest.json              # PWA manifest (name, icons, theme color)
├── README.md                  # This file
├── robots.txt                  # Search engine crawling rules
├── security.txt                # Security policy
└── sitemap.xml                  # SEO sitemap
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nepiskopos/nepiskopos.github.io.git
   cd nepiskopos.github.io
   ```

2. **Customize the content** (see [Content Management](#content-management) below)

3. **Deploy to GitHub Pages**
   - Push to the `main` branch of a `<username>.github.io` repository
   - Enable GitHub Pages in repository settings (Settings → Pages)
   - The site is served at `https://<username>.github.io`

### Local Development

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve .
```

Then open `http://localhost:8000` in a browser. No build step is required.

## 🎯 Customization Guide

### Content Management

Content lives in two places:

- **`index.html`** - static text: hero headline/description, About Me paragraphs, contact section copy, and the JSON-LD structured data. Also where meta tags (`title`, `description`, Open Graph, Twitter Card) live.
- **`assets/js/script.js`** - the Skills grid, Featured Projects, Professional Experience timeline, and Research Publications are all defined as JavaScript arrays (`loadSkills`, `loadProjects`, `loadExperience`, `loadPublications`) and rendered into the page on load. Update the objects in these arrays to change portfolio content; no HTML editing needed for these sections.

Note: because these four sections are rendered client-side, their content is not present in the raw server-delivered HTML - only progressive/JS-executing crawlers will see it.

### Styling
Customize the design via CSS custom properties and rules in `assets/css/style.css`:
- Color scheme (light/dark theme variables)
- Typography and spacing
- Animations and effects
- Responsive breakpoints

### JavaScript Functionality
Extend behavior in `assets/js/script.js` - e.g. add new interactive features, adjust animations, or wire up external APIs.

## 🔍 SEO

- **Meta tags**: descriptive `<title>`/description, Open Graph, and Twitter Card tags
- **Structured data**: Person, Organization, WebSite, and WebPage JSON-LD schemas
- **`sitemap.xml`**: lists the canonical site URL
- **`robots.txt`**: allows all major crawlers, points to the sitemap
- **Canonical URL** declared via `<link rel="canonical">`

## ♿ Accessibility Features

- Skip-to-content link and semantic landmarks (`<nav>`, `<main>`, `<footer>`)
- ARIA labels/roles on navigation, buttons, and icon-only controls
- `prefers-reduced-motion` and `prefers-contrast` media query support
- Keyboard-navigable menus and focus handling

## 🌐 Browser Support

Targets current versions of Chrome, Firefox, Safari, and Edge. The design relies on modern CSS (`backdrop-filter`, CSS Grid, `clamp()`) that does not have a legacy-browser fallback; older browsers will see a functional but visually simplified page.

## 🔒 Security

- Served over HTTPS via GitHub Pages
- No analytics, tracking scripts, or third-party data collection
- `security.txt` (root and `.well-known/`) for responsible vulnerability disclosure

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

All rights reserved. This repository does not currently include an open-source license; please contact the author before reusing the code or content.

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Email**: [Click to reveal on the website](https://nepiskopos.github.io/#contact)
- **LinkedIn**: [https://linkedin.com/in/nepiskopos](https://linkedin.com/in/nepiskopos)
- **GitHub**: [https://github.com/nepiskopos](https://github.com/nepiskopos)
- **ORCID**: [https://orcid.org/0009-0004-7130-3874](https://orcid.org/0009-0004-7130-3874)

---

*Last updated: July 2026*
