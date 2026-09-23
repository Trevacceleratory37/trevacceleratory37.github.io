# Hephzibah Behulah — Cyber Systems Lab

A static GitHub Pages portfolio redesigned as an interactive OSINT-style systems tree.

## Structure

The entire site is a single-page application-like interface. The navigation is data-driven and rendered as a horizontal D3 tree.

### Six top-level branches

- ABOUT — profile, engineering, cybersecurity, data and philosophy
- WORK — electronics, aviation systems, web development and independent research
- LAB — reconnaissance, web security, security testing, network/OSINT, training labs and browser terminal
- PROJECTS — pentest toolkit, data analytics, secure web, systems monitor and security blog
- KNOWLEDGE — fundamentals, learning hub, data learning, quizzes/games and study notes
- CONTACT — GitHub, LinkedIn, blog, GitBook, email and public identity

## Data model

Edit `js/tree-data.js` to add or change nodes. A leaf can contain:

- `description`
- `content`
- `tags`
- `links`
- `ethics`

The renderer in `js/tree-loader.js` automatically creates the node and its detail panel.

## Interaction

- Click a branch to expand/collapse children.
- Click a leaf to open its detail panel.
- Drag to pan.
- Scroll/pinch to zoom.
- Search to highlight matching nodes.
- Fit, expand, collapse and reset are available in the toolbar.
- Enter or Space works on focused nodes.
- Escape closes the detail panel.

## Security and privacy notes

The browser terminal is intentionally a simulated educational interface. GitHub Pages does not execute local Kali commands. Real commands belong in the local Kali/WSL2 toolkit.

Security tooling is presented for authorized learning, CTFs, labs and permitted assessments only.

The public site keeps personal details intentionally limited. Add contact details only when they are intended for public exposure.

## Deployment

This repository is designed for GitHub Pages with no build step. The custom domain is configured through `CNAME`.

The service worker uses cache version `v5` for the local core application.

## External libraries

The interface uses D3.js, Tailwind CDN, Font Awesome, AOS and Google Fonts. For a fully independent offline experience, these third-party assets can later be self-hosted and added to the service-worker cache.

## Content accuracy

Project statistics are not represented as live GitHub metrics. Claims such as certifications, compliance status or performance scores should only be added when independently verified.
