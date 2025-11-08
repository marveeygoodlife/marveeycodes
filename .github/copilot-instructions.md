# Copilot / AI agent quick instructions — friendly-succotash

This repository is a simple static portfolio site. Below are focused, actionable facts an AI coding agent needs to be productive here.

1. Big picture
   - Single-page static site: `index.html` is the source of truth for structure and content. Styles live in `styles.css`. Behavior lives in `script.js`.
   - No build step or package manager detected (no `package.json`, no bundler). Changes are deployed by editing files directly and serving the folder as static files.

2. Key files & folders (use these as anchors for edits)
   - `index.html` — main markup, contains sections with ids: `#hero`, `#work`, `#about`, `#capability`, `#experience`, `#contact`.
   - `styles.css` — global variables, `@font-face` rules (fonts under `assets/fonts/`), layout variables `--layout` and `--layout-template`, and responsive media queries. Use this file for visual/theme changes.
   - `script.js` — small DOM scripts. Example: hamburger toggle — it selects `nav button` and toggles `nav ul` `.active` class to open/close the mobile menu. See lines where `ul.classList.toggle('active')` is used.
   - `assets/` — fonts (`assets/fonts/`), images (`assets/images/`), favicon and `site.webmanifest` under `assets/favicon_io/`. `assets/Marvellous_Resumee.pdf` is the downloadable CV referenced from the site.

3. Discoverable conventions & patterns
   - CSS variables used heavily in `:root` (colors, sizing, `--layout` and `--layout-template`) — prefer updating variables for global theme changes rather than changing many selectors.
   - Responsive navigation: at `max-width: 768px` `nav ul` is off-canvas and the `#togglebtn` button is shown. The JS toggles `nav ul.active` to show/hide the menu.
   - Accessibility helpers: `.skip-link` and `.sr-only` exist and are used; keep these when changing structure.
   - Class naming is simple semantic names (e.g., `.projectcard`, `.projectcontent`) — follow existing naming rather than introducing a new BEM or utility naming unless refactoring consistently.

4. Workflows / commands (quick local preview)
   - Easiest: open `index.html` in a browser for quick edits.
   - Recommended lightweight local server (if you want proper fetch/XHR or relative root behavior):

```powershell
# Python (works if python is installed)
python -m http.server 8000

# Node (optional, if node is installed)
npx serve . -l 5000
```

5. Debugging hints
   - JavaScript is plain ES; check `script.js` for DOM selectors. No bundling, so changes are loaded on page reload or via Live Server extension.
   - No tests present in the repo — treat changes as manual/visual verification.

6. Integration & external deps
   - Font files are local under `assets/fonts/` and declared in `styles.css` via `@font-face`. Update sources there when replacing fonts.
   - Font Awesome is included via the external kit script tag in `index.html` (deferred). Expect icons to rely on that external script.
   - Contact form has `action="#"` — there's no backend handler in this repo. Do not assume form submissions will work without adding a server or external form service.

7. Small examples to reference when making changes
   - Mobile nav toggle: `script.js` — look for `document.querySelector('nav button')` and `ul.classList.toggle('active')`.
   - Theme variables: `styles.css` `:root { --accent: #FFD700; ... }` — change these for color/theme updates.
   - Downloadable CV: `assets/Marvellous_Resumee.pdf` referenced in `index.html` — update file name and link together.

8. Agents: safety / edit guidance
   - Keep accessibility helpers and focus styles intact (`.sr-only`, `.skip-link`, `:focus` styles).
   - When refactoring large sections, do small commits and include a short PR description that explains visual changes; there are no automated tests to validate visuals.

If any part of the site depends on an external service you expect me to modify (hosting, form backend, analytics), tell me the intended provider and credentials/workflow; otherwise I will keep to static-site edits only. Ready to iterate — tell me which area you want improved first (styling, nav behavior, content updates, or add a simple static server script). 

9. Deployment, CI & quick commands

- GitHub Pages (quick choices):
   - Option A — simplest: push to `main` (root) and enable Pages in the repository Settings → Pages → Source: `main` / `root`. No build step required for this repo — changes appear after GitHub Pages publishes.
   - Option B — use a separate `gh-pages` branch (keeps source and published site separate). Example PowerShell commands to publish current HEAD to `gh-pages`:

```powershell
# Force-push current commit to gh-pages branch
git add -A
git commit -m "chore: publish site"
git push origin HEAD:gh-pages --force
```

- Recommended for automated deploys: create a GitHub Actions workflow that builds (if you add a build step later) and publishes to Pages. A minimal pattern uses `peaceiris/actions-gh-pages` or `JamesIves/github-pages-deploy-action`. Example (summary only):

   - Checkout, (optional) install/build, then use an action to publish the contents of the repo (or a `dist/` folder) to `gh-pages` or the Pages target.

- Local sanity checks (quick):
   - Open `index.html` directly in a browser for quick visual checks.
   - Run a lightweight local server to reproduce relative-path behavior:

```powershell
python -m http.server 8000
# or if you have node
npx serve . -l 5000
```

10. CI / validation suggestions (discoverable, optional)

- This repo currently has no automated tests. Useful lightweight CI checks to add later:
   - Validate HTML/CSS (an `html-validate` or `vnu-jar` step) to prevent markup regressions.
   - Run a simple link-checker against the generated site before deploying.

- If you want, I can add a starter GitHub Actions workflow that:
   1. Checks out the repo
   2. (Optional) Runs any build step you add later
   3. Runs an HTML validation step
   4. Deploys to GitHub Pages (via action) — tell me which action you prefer and I will create the workflow file.

11. PR template & commit message style

- Recommended commit message style: follow a small, consistent convention inspired by Conventional Commits. Use one-line messages for small changes, e.g.:
   - feat: add project card component
   - fix: correct mobile nav toggle behavior
   - chore: update fonts
   - docs: update CV download link

- Short PR template to include in `.github/PULL_REQUEST_TEMPLATE.md` (suggestion):

   Title: short descriptive title

   Body:
   - What changed? (one-paragraph summary)
   - Why: why is the change needed?
   - How to review / Test steps:
      1. Open `index.html` or run local server
      2. Verify UI/UX expectations (list key screens)

   Checklist:
   - [ ] Preview locally
   - [ ] Accessibility keyboard checks (tab order, skip-link)
   - [ ] Images and assets checked (local `assets/` paths)

If you'd like I can add the `PULL_REQUEST_TEMPLATE.md` file and/or a `.github/workflows/deploy.yml` sample to automate Pages deploys — tell me which one to create and I will add it.
