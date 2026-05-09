# 🌐 sethuramanai.github.io — Personal Portfolio Site

> A clean, SEO-optimised personal portfolio for **Sethuraman M** — Software Engineering Lead & AI Automation Strategist with 14+ years of enterprise experience.

[![Live Site](https://img.shields.io/badge/Live%20Site-sethuramanai.github.io-b5651d?style=for-the-badge&logo=github)](https://sethuramanai.github.io)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sethu90-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/sethu90)

---

## 💡 Idea Behind This Project

Most developer portfolios are either over-engineered (React, Webpack, Node, build pipelines) or under-done (a plain HTML page with no structure). This project sits deliberately in the middle — **simple enough to maintain in minutes, professional enough to impress recruiters and hiring managers**.

The core idea:

> **Separate concerns completely** — content lives in one file, styling in another, logic in another. To update the site, you only ever touch `data.js`. No framework, no build step, no dependencies.

A secondary goal was **SEO-first from day one** — most developer portfolios are invisible to Google. This one has structured data, Open Graph, a sitemap, and a canonical URL baked in from the start so it surfaces when someone Googles "Sethuraman M".

---

## 🏗️ Project Architecture

```
sethuramanai.github.io/
│
├── index.html               ← Structure only (no content, no styles inline)
├── style.css                ← All visual design — warm beige/terracotta theme
├── main.js                  ← Reads data.js, renders everything into the DOM
├── data.js                  ← ✏️  ONLY FILE YOU EVER EDIT to update the site
│
├── sethu-profile.jpg        ← Used by LinkedIn/WhatsApp share previews (og:image)
├── sethu-profile-circle.png ← Circular headshot displayed in hero section
│
├── robots.txt               ← Tells search engines how to crawl
├── sitemap.xml              ← Helps Google index all page sections
└── README.md                ← This file
```

---

## 🔄 How It Works — Flowchart

```
┌─────────────────────────────────────────────────────────────┐
│                        BROWSER LOADS                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                       index.html                            │
│  • SEO meta tags (title, description, canonical)            │
│  • Open Graph tags  →  LinkedIn / WhatsApp previews         │
│  • Twitter Card     →  Twitter/X share cards                │
│  • JSON-LD schema   →  Google Knowledge Panel               │
│  • Empty HTML shells with IDs (no content yet)              │
│  • Links: style.css → data.js → main.js                     │
└──────────┬──────────────────────────┬───────────────────────┘
           │                          │
           ▼                          ▼
┌──────────────────┐      ┌───────────────────────────────────┐
│    style.css     │      │             data.js               │
│                  │      │                                   │
│  Playfair Display│      │  profile {}      → name, bio, CTA │
│  + Inter fonts   │      │  nav []          → menu links     │
│                  │      │  experience []   → job cards      │
│  Warm palette:   │      │  skills []       → tag groups     │
│  #f5f0ea bg      │      │  projects []     → project cards  │
│  #b5651d accent  │      │  education []    → degrees        │
│                  │      │  certifications[]→ badges         │
│  Cards, grids,   │      │  contact {}      → email, LinkedIn│
│  hover effects,  │      │  footer {}       → copyright      │
│  scroll reveals, │      └──────────────┬────────────────────┘
│  print styles    │                     │
└──────────────────┘                     ▼
                           ┌─────────────────────────────────┐
                           │            main.js              │
                           │                                 │
                           │  DOMContentLoaded →             │
                           │  reads DATA object              │
                           │  renders each section via       │
                           │  innerHTML + template literals  │
                           │                                 │
                           │  + smooth scroll                │
                           │  + active nav highlight         │
                           │  + IntersectionObserver         │
                           │    (scroll reveal animation)    │
                           │  + print-to-PDF (Download CV)   │
                           └──────────────┬──────────────────┘
                                          │
                                          ▼
                           ┌─────────────────────────────────┐
                           │       RENDERED PAGE             │
                           │                                 │
                           │  ✅ Nav (fixed, blur backdrop)  │
                           │  ✅ Hero (photo + bio + CTAs)   │
                           │  ✅ Experience (3 companies)    │
                           │  ✅ Skills (4 categories)       │
                           │  ✅ Projects (5 cards)          │
                           │  ✅ Education (MBA + B.Tech)    │
                           │  ✅ Certifications (6 badges)   │
                           │  ✅ Contact (4 cards)           │
                           │  ✅ Footer                      │
                           └─────────────────────────────────┘
```

---

## 🔍 SEO Architecture

```
index.html
    │
    ├── <title>              Sethuraman M | Software Engineering Lead...
    ├── <meta description>   14+ years, AI automation, MBA...
    ├── <link canonical>     https://sethuramanai.github.io/
    │
    ├── Open Graph ──────────────────────────────────────────────────►  LinkedIn preview
    │   ├── og:title                                                      shows name + photo
    │   ├── og:description
    │   ├── og:image  ──────► sethu-profile.jpg (600×600)
    │   └── og:url
    │
    ├── Twitter Card ────────────────────────────────────────────────►  Twitter/X preview
    │   ├── twitter:card
    │   ├── twitter:title
    │   └── twitter:image ──► sethu-profile.jpg
    │
    └── JSON-LD (schema.org/Person) ─────────────────────────────────►  Google Knowledge Panel
        ├── name, jobTitle, url
        ├── image  ─────────► sethu-profile.jpg
        ├── email, address
        ├── sameAs  ────────► LinkedIn + GitHub
        ├── alumniOf        → University of Hartford
        ├── worksFor        → Cigna Healthcare
        └── knowsAbout      → [Python, AI Automation, CI/CD ...]

robots.txt  ──────────────────────────────────────────────────────────►  Allow all crawlers
sitemap.xml ──────────────────────────────────────────────────────────►  Submit to Google Search Console
```

---

## 🚀 How to Update Content

You **never need to touch** `index.html`, `style.css`, or `main.js` for content changes.

Just open `data.js` and edit the relevant section:

```js
// Add a new certification? Go to:
certifications: [
  { icon: "🏆", title: "Your New Cert", org: "Issuing Body" },
  // ...
]

// New job? Add to the top of:
experience: [
  {
    title: "Your New Role",
    company: "Company Name",
    duration: "Current",
    bullets: [ "Achievement 1", "Achievement 2" ],
  },
  // ...
]
```

Save → commit → push → live in ~30 seconds.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Markup | HTML5 | Semantic, accessible, SEO-friendly |
| Styling | CSS3 (custom properties, grid, flexbox) | No framework bloat |
| Logic | Vanilla JS (ES6+) | Zero dependencies, fast load |
| Fonts | Google Fonts (Playfair Display + Inter) | Distinctive, professional |
| Hosting | GitHub Pages | Free, fast, HTTPS automatic |
| SEO | JSON-LD + Open Graph + sitemap | Google + social visibility |

**No build step. No npm. No framework. Just 4 files.**

---

## 📦 Deploy in 3 Steps

```bash
# 1. Clone or download this repo
git clone https://github.com/sethuramanai/sethuramanai.github.io.git

# 2. Edit your content
# Open data.js and update any section

# 3. Push to GitHub
git add .
git commit -m "Update content"
git push
```

GitHub Pages auto-deploys. Live at `https://sethuramanai.github.io` in ~30 seconds.

---

## 📋 Checklist — After Publishing

- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console) → `https://sethuramanai.github.io/sitemap.xml`
- [ ] Test LinkedIn preview at [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Test Open Graph at [opengraph.xyz](https://opengraph.xyz)
- [ ] Test structured data at [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Share your URL on LinkedIn — watch the preview card appear with your photo!

---

## 👤 About

**Sethuraman M** · Software Engineering Lead Analyst · MBA, University of Hartford  
📍 Tamil Nadu, India · 💼 [linkedin.com/in/sethu90](https://linkedin.com/in/sethu90) · 🌐 [sethuramanai.github.io](https://sethuramanai.github.io)

---

*Built with purpose. Deployed with simplicity.*
