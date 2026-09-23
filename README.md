# Hephzibah Behulah — Cyber Systems Lab

A static GitHub Pages portfolio presented as an interactive OSINT-style systems map.

## Structure

The tree is the navigation. The interface keeps the portfolio, lab, learning resources and professional links in one connected system.

### Six primary branches

- **ABOUT** — profile, engineering, cybersecurity, data and philosophy
- **WORK** — electronics, aviation systems, web development and independent research
- **LAB** — recon, web security, security testing, network/OSINT, training labs and browser terminal
- **PROJECTS** — pentest toolkit, data analytics, secure web, systems monitor and security blog
- **KNOWLEDGE** — fundamentals, learning hub, data learning, quizzes/games and study notes
- **CONTACT** — GitHub, LinkedIn, blog, GitBook, email and public identity

## Interface improvements

- OSINT-style horizontal relationship map with color-coded node families.
- Futuristic dark technical visual language with restrained scanline treatment.
- Responsive layout for desktop, tablet and mobile.
- Side node inspector with safe external-link handling.
- Search now checks node names, descriptions and tags and reveals matching paths.
- `/` focuses search.
- Enter/Space activates a focused node.
- Escape closes the inspector and returns focus.
- Fit, Expand all, Collapse and Reset controls.
- Reduced-motion support.
- Accessible labels and live status announcements.
- No fake live metrics or unverified claims.

## Data model

All navigation content lives in `js/tree-data.js`. The renderer is data-driven.

A leaf can contain `description`, `content`, `tags`, `links` and `ethics`. Add nodes to the data file instead of hard-coding new navigation into the renderer.

## Security and privacy

The browser terminal is an educational simulation. GitHub Pages cannot execute local Kali commands. Real commands belong in the local Kali/WSL2 toolkit.

Security tooling is presented for authorized labs, CTFs, owned systems and permitted assessments only.

The public tree intentionally avoids unnecessary personal information. The email node contains no public address by default.

## Offline / PWA

The service worker is now **v6**. It caches the local application shell and can cache successful responses from the listed third-party CDNs after they have been requested.

This still does not guarantee a first-visit fully offline experience because external providers, browser cache policies and network conditions are outside the site's control. For a completely independent offline build, self-host D3, AOS, Font Awesome, Tailwind and fonts, or remove unused dependencies.

## SEO

The site includes:

- custom-domain canonical URL
- Open Graph metadata
- robots.txt
- sitemap.xml
- JSON-LD WebSite metadata
- responsive viewport metadata

## Deployment

No package manager or build step is required. The site is designed for GitHub Pages. The custom domain is stored in `CNAME`.

## Main files

- `index.html` — semantic application shell
- `css/osint-tree.css` — visual system and responsive styles
- `js/tree-data.js` — navigation and content data
- `js/tree-loader.js` — D3 tree rendering and interactions
- `sw.js` — cache/offline layer
- `manifest.webmanifest` — installable web-app metadata
- `CNAME` — custom domain
- `robots.txt` / `sitemap.xml` — crawler guidance

## Content accuracy

Descriptions are intentionally qualitative. Do not add live GitHub statistics, certifications, compliance claims or performance scores unless they can be verified.