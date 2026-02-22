# Copilot / AI agent quick instructions — marveeycodes

This repository is a simple static portfolio site. Below are focused, actionable facts an AI coding agent needs to be productive here.

## 1. Big picture
- Single-page static site: `index.html` is the source of truth for structure and content.
- **No build step or package manager** (no `package.json`, no bundler). Changes are made by editing files directly and serving the folder as static files.
- The `.vscode/settings.json` sets Live Server to port 5502; use that port when running the VS Code Live Server extension.

## 2. Key files & folders
| File/Folder | Purpose |
|---|---|
| `index.html` | Main markup. Sections: `#hero`, `#work`, `#about`, `#capability`, `#experience`, `#contact` |
| `styles.css` *(root)* | Global reset, CSS variables (`:root`), typography, buttons, accessibility helpers, `hr`, footer |
| `css/layout.css` | Layout, navigation, scroll-reveal/typewriter animation classes, responsive media queries, form styles |
| `css/styles.css` | Duplicate of root `styles.css`; keep in sync if editing base styles |
| `script.js` | Mobile nav toggle, scroll-to-top, IntersectionObserver reveal, typewriter effect for hero `<h1>` |
| `js/experience.js` | Experience carousel — renders `cards[]` array into `#cardtitle`, `#subtitle`, `#list-one/two/three`; `#prevbtn`/`#nextbtn` and arrow-key navigation |
| `assets/images/` | SVG tech-stack icons, hero portrait (`.webp`), OG image (`.png`) |
| `assets/front-end_Resume.pdf` | Downloadable CV — referenced in `#about` and `#contact` sections of `index.html` |
| `assets/favicon_io/` | Favicons, `site.webmanifest`, apple-touch-icon |

> **Note:** There is no `assets/fonts/` directory. All fonts are loaded from Google Fonts CDN via `<link>` tags in `<head>`.

## 3. CSS load order (in `index.html`)
```html
<link rel="stylesheet" href="css/layout.css">   <!-- layout first -->
<link rel="stylesheet" href="styles.css">        <!-- then base styles -->
```
Layout rules in `css/layout.css` are intentionally loaded first; `styles.css` provides global resets and variables that cascade into it.

## 4. External dependencies (CDN — no local copies)
| Dependency | How included |
|---|---|
| Google Fonts (Montserrat, Poppins, Merriweather, Roboto Condensed) | `<link>` in `<head>` from `fonts.googleapis.com` |
| Google Material Symbols Outlined | `<link>` in `<head>` from `fonts.googleapis.com` |
| Font Awesome 6 (brands only) | `<link>` from `cdnjs.cloudflare.com` — only `.fa-brands` icons are available |

> **Important:** Font Awesome is loaded as a **CSS stylesheet** (brands-only), not a JavaScript kit. Only brand icons (`fa-brands fa-*`) work. Standard solid/regular icons will not render.

## 5. CSS variables (in `:root` — change here for global theme updates)
```css
--background-color: #000;
--accent: #00ffcc;      /* teal — used for focus rings, hover states, scroll-to-top */
--text-color: #c0c0e0;
--text: #ffffff;
--layout: grid;
--layout-template: repeat(auto-fit, minmax(280px, 1fr));
```

## 6. Key JS patterns
- **Mobile nav** (`script.js`): `document.querySelector('nav button')` (`#togglebtn`) toggles `nav ul.active`. The hamburger is hidden on desktop via `css/layout.css`; shown via `display: flex` inside `@media (max-width: 768px)`.
- **Scroll reveal**: `script.js` adds `.reveal` to a wide selector list, then `IntersectionObserver` adds `.reveal-visible` (styles in `css/layout.css`).
- **Typewriter**: `script.js` — `#hero .hero-content h1` text is cleared on load, re-typed character-by-character via `setInterval`, with a `.caret` `<span>` appended during typing.
- **Experience carousel** (`js/experience.js`): mutates `innerHTML`/`textContent` of fixed DOM ids (`#cardtitle`, `#subtitle`, `#list-one`, `#list-two`, `#list-three`). To add/edit experience entries, modify the `cards[]` array in `js/experience.js`. Arrow keys (`←`/`→`) and `Home`/`End` also navigate cards.

## 7. Accessibility conventions — do not remove these
- `.sr-only` — visually hidden text for screen readers (CSS in `styles.css`)
- `.skip-link` — "Skip to main content" anchor that shows on `:focus` (CSS in `styles.css`)
- `aria-live="polite"` on `#aria-announcer` — used to announce the typed hero text
- `aria-expanded` on `#togglebtn` — kept in sync by `script.js`
- All decorative icon `<i>` tags have `aria-hidden="true"` with adjacent `.sr-only` spans

## 8. Local preview
```sh
# Python (simplest)
python -m http.server 8000

# Node
npx serve . -l 5000
```
Or use the VS Code Live Server extension (port 5502 per `.vscode/settings.json`).

No tests exist — changes are verified by manual/visual inspection.

## 9. Common edits and where to make them
| Task | Where |
|---|---|
| Change accent color / theme | `styles.css` `:root { --accent: ... }` |
| Update project cards | `index.html` — `.projectcard` divs in `#work` section |
| Update experience entries | `js/experience.js` — `cards[]` array |
| Update CV download link | `index.html` `href="assets/front-end_Resume.pdf"` (two places: `#about` and `#contact`) and replace the PDF file in `assets/` |
| Add/change skills icons | `index.html` — `<ul class="skills">`, add SVG to `assets/images/` |
| Adjust responsive breakpoints | `css/layout.css` — `@media` blocks |
| Change navigation links | `index.html` `<nav><ul>` |

## 10. Deployment
- **GitHub Pages**: push to `main` and enable Pages (Settings → Pages → Source: `main` / root). No build step needed.
- **Render**: the `README.md` documents a `client/` + Express backend setup for a prior version of this site. The current repo is purely static; ignore those Render/Express/Mailgun instructions for the static site.

## 11. Commit message style
Follow Conventional Commits for consistency:
- `feat:` new feature or content
- `fix:` bug fix
- `chore:` maintenance (assets, deps)
- `docs:` documentation only
- `style:` CSS/visual changes with no logic change

## 12. Known quirks / errors encountered
- `css/styles.css` is a copy of the root `styles.css`. Both are present; `index.html` loads only root `styles.css`. Keep them in sync or consolidate if refactoring.
- `README.md` describes a `client/` + Express backend that no longer exists in this repo. Disregard those instructions when working on the static site.
- The `#about` section has an empty `<figure>` (no `<img>`); this is intentional placeholder markup.
