# 🚀 Sleek Modern Developer Portfolio — Gaurav Sharma

A modern, high-performance, mobile-first responsive portfolio showcasing technical projects, machine learning models, resume credentials, tech stack skills, and interactive contact links.

![Portfolio Preview Banner](assets/avatar.svg)

---

## 🌟 Key Features

- **Semantic HTML5 Architecture**: Fully structured with `<header>`, `<main>`, `<section>`, `<article>`, and `<footer>` according to modern web accessibility (WAI-ARIA) standards.
- **Mobile-First Responsive Layout**: Built with modern CSS Grid and Flexbox with responsive breakpoints (`sm`, `md`, `lg`, `xl`) that scale smoothly across mobile phones, tablets, laptops, and ultra-wide screens.
- **Dark & Light Mode Toggle**:
  - Seamless toggle with SVG icon morphing.
  - Automatically respects user OS system color scheme (`prefers-color-scheme`).
  - Persists preference in `localStorage`.
  - Global keyboard shortcut: Press `T` anywhere on the page to toggle themes!
- **Interactive JavaScript (ES6+)**:
  - **Dynamic Typewriter Headline**: Live typing animation highlighting core engineering competencies.
  - **Mobile Hamburger Navigation**: Slide-in animated drawer with backdrop blur and keyboard focus trap.
  - **Project Detail Modals**: Deep-dive popup for every project featuring architecture diagrams, problem statements, performance metrics, and live demo/repo links.
  - **Category Filtering**: Instant animated filters for both Projects and Skills (`Machine Learning`, `Full-Stack`, `Tools`).
  - **ScrollSpy & Smooth Scroll**: Automatic navigation link highlighting as you scroll past sections.
  - **Interactive Contact Form**: Real-time client-side field validation with loading spinner and submission feedback.
  - **One-Click Email Copy**: Copies email address with an animated toast notification.
  - **Scroll Progress Ring**: Floating back-to-top button with circular SVG scroll percentage tracking.
  - **Printable ATS Resume**: Dedicated clean ATS-friendly resume (`resume.html`) with instant `window.print()` PDF generation.

---

## 📁 Repository Structure

```
portfolio/
├── index.html             # Main semantic portfolio entrypoint
├── style.css              # Custom CSS design system (Dark & Light tokens, Glassmorphism)
├── script.js              # Vanilla ES6+ interactivity & state management
├── resume.html            # Standalone ATS-friendly printable resume page
├── vercel.json            # Vercel deployment configuration & caching headers
├── netlify.toml           # Netlify build & security headers
├── README.md              # Deployment guide & documentation
└── assets/                # Lightweight vector graphics & project mockups
    ├── avatar.svg         # Geometric developer portrait
    ├── project-malware.svg    # Malicious Mobile App Detector UI preview
    ├── project-analytics.svg  # Cloud DevPulse Telemetry dashboard
    ├── project-ai.svg         # NeuralDoc RAG Vector engine
    ├── project-ecommerce.svg  # AuraShop headless storefront
    ├── project-algo.svg       # AlgoLab interactive algorithm studio
    └── project-cloudnotes.svg # ZenMark offline knowledge base
```

---

## 🌐 Live Hosting & Deployment Guide

You can host this static portfolio live in under 2 minutes on **Vercel**, **GitHub Pages**, or **Netlify** with zero build configuration!

### Option 1: Deploy to Vercel (Recommended ⚡)

1. Sign up or log into [Vercel](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository (`permission-base-malicious-mobile-application-detector` or your dedicated portfolio repository).
4. In the project configuration:
   - **Root Directory**: Set to `portfolio` (click Edit and select the `portfolio` folder).
   - **Framework Preset**: Select `Other` (Static HTML).
5. Click **"Deploy"**!
6. Vercel will instantly generate a live production URL (e.g., `https://gaurav-sharma-portfolio.vercel.app`) with free SSL, automatic edge CDN caching, and custom domain support.

*Alternative using Vercel CLI:*
```bash
npm install -g vercel
cd portfolio
vercel
```

---

### Option 2: Deploy to GitHub Pages (Free 🐙)

#### Automated Deployment via GitHub Actions (Included):
A ready-to-use GitHub Actions workflow is provided at `.github/workflows/deploy-portfolio.yml`.
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Add sleek developer portfolio"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **"GitHub Actions"**.
3. The workflow will automatically trigger, build, and deploy the `portfolio` folder to `https://<username>.github.io/<repo-name>/`.

#### Manual Branch Method:
1. Create a `gh-pages` branch or configure GitHub Pages to serve from the `/docs` or root folder of a dedicated `portfolio` repository.
2. In GitHub repository **Settings** → **Pages**, select your branch and folder.

---

### Option 3: Deploy to Netlify (Drag-and-Drop or Git 💧)

#### Method A: Instant Drag-and-Drop
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `portfolio` folder from your desktop directly onto the browser window.
3. Your site goes live instantly with an HTTPS link!

#### Method B: Git Continuous Deployment
1. Log into [Netlify](https://netlify.com) and click **"Add new site"** → **"Import an existing project"**.
2. Connect your GitHub repository.
3. Set **Base directory** to `portfolio` and leave the build command blank.
4. Click **"Deploy site"**.

---

## ✏️ How to Customize

1. **Personal Information**:
   - Open `index.html` and edit lines with your name, bio, social links (GitHub, LinkedIn, Email).
   - Update `resume.html` with your latest educational credentials and work experience.
2. **Projects**:
   - To add or modify projects, edit the `<article class="project-card">` elements in `index.html`.
   - Update the corresponding entry in `script.js` (`projectData` object) to customize the modal popup details, metrics, and technical architecture text.
3. **Color Palette & Theme Tokens**:
   - Open `style.css` and modify the CSS variables in the `:root`, `[data-theme="dark"]`, and `[data-theme="light"]` blocks.

---

## 📄 License
MIT License. Free to use, modify, and distribute.
