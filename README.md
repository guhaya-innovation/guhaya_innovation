# Guhaya Innovation — Website

Engineering, Manufacturing, IT & Business Solutions — company website.

## Structure

```
guhaya-innovation/
├── index.html                  Home
├── about.html                  About Us
├── services.html                All services (filterable by division)
├── industries.html              Industries We Serve
├── contact.html                 Contact form
├── services/                    One dedicated page per service (13 pages)
│   ├── manufacturing-solutions.html
│   ├── industrial-fabrication.html
│   ├── structural-steel-fabrication.html
│   ├── welding-assembly.html
│   ├── custom-metal-components.html
│   ├── it-services.html
│   ├── software-development.html
│   ├── digital-solutions.html
│   ├── business-consulting.html
│   ├── procurement-supply.html
│   ├── import-export.html
│   ├── project-management.html
│   └── tax-consultant.html
├── css/
│   └── style.css               Full design system (tokens, layout, animation)
├── js/
│   └── main.js                 Nav, scroll-reveal, counters, filters, form
└── assets/
    └── logo.png                Peacock logo (transparent background)
```

## Design

"The Blueprint & The Feather" — a navy blueprint-grid theme with gold/teal
accents pulled from the peacock wordmark. Services are organised into the
four divisions named in the tagline: **Engineering · Manufacturing ·
IT & Digital · Business**.

Animations: scroll-reveal on every section, animated counters, hover
micro-interactions on cards/buttons, an animated SVG "feather-eye" emblem
on the homepage, and ambient blueprint draft-lines. All motion respects
`prefers-reduced-motion`.

Every service page ends with a **Contact Us** call-to-action banner.

## Running locally

No build step — plain HTML/CSS/JS. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8080
```

## Deploying to GitHub Pages

1. Push this folder's contents to your repo (keep the folder structure as-is).
2. Repo Settings → Pages → Deploy from branch → `main` / root.
3. Site will be live at `https://<username>.github.io/<repo>/`.

## Editing content

All page copy and per-service content lives in `gen.py`-style data if you
regenerate, but for quick edits just open the relevant `.html` file directly
— every page is plain, readable markup, no template engine required at runtime.
