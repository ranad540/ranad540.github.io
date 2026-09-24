# Rakesh N D — Portfolio

Personal portfolio built with **React 19**, **Vite 8**, **Tailwind CSS v4** and **three.js**.

**Live site:** https://ranad540.github.io/

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

Node 20 or newer.

## How it's put together

```
src/
  main.jsx
  App.jsx                  ← the whole page, as ten imports
  index.css                ← design tokens, backdrop + tilt CSS
  components/
    layout/                Nav, Footer
    sections/              Hero, About, Skills, Experience,
                           Projects, Education, Contact
    visuals/               Backdrop, HeroScene (three.js), Tilt
    ui/                    index.jsx (primitives), Icon.jsx
  data/profile.js          ← every word on the site, in one object
  hooks/useScrollSpy.js    ← highlights the section you're reading
public/
  Rakesh-ND-Resume.pdf     ← linked from the resume buttons
.github/workflows/
  deploy.yml               ← builds and publishes on every push to main
```

The components never contain content. To add a job, a project or a skill group, edit the matching array in `src/data/profile.js` and the UI follows. Text wrapped in `**double asterisks**` renders in the brighter type colour, and `isSet()` hides any field still holding a `[placeholder]` so the site can never ship a link that goes nowhere.

## The design system

Shared with the `3d-artist-portfolio` project — same tokens, same type treatment, same components, so the two sites read as one hand.

**Monochrome and dark only.** Seven greys defined as Tailwind theme colours in `src/index.css`, from `ink` (#05060a) through `body` (#9aa2b4) to `bright` (#eef0f5). Nothing else is saturated except one accent:

```css
:root { --accent: #8ab4ff; }
```

That single variable drives the selection highlight, the focus ring, the hero glow — and the 3D scene, which reads the live value off `<html>` and re-lights itself.

**Type.** System font stack, no web fonts, so the page makes zero third-party requests. The hero scales with `clamp(2.75rem, 8vw, 7rem)` at `leading-[0.95]`. Micro-labels use the `.eyebrow` class — 11px mono, uppercase, `0.18em` tracking.

**Layout.** Sections are `py-20 sm:py-28` inside a `max-w-6xl` container, separated by hairline rules rather than background changes. Skills and Experience are spec sheets — label column left, content right, one rule per row — which suits a resume better than card grids do.

**The backdrop.** A torus knot lit like a product shot over an aurora fragment shader, in one fixed layer behind every section rather than only the hero. A readability veil above the canvas eases from 0.16 across the hero, where the form is the point, to 0.88 below it, where the writing is — one passive scroll listener writing one CSS variable, no React render per frame. three.js is lazy-loaded, so it never blocks first paint.

**Motion.** `Reveal` fades content up 20px over 800ms on first scroll into view. `.link-underline` wipes in from the left. `Tilt` writes CSS variables straight onto the DOM node so pointer movement never triggers a render. All of it collapses under `prefers-reduced-motion`.

## Deploying

See `DEPLOY.md`. In short: push to `main`, and the GitHub Actions workflow builds and publishes to GitHub Pages automatically. Pages **Source** must be set to **GitHub Actions**, not "Deploy from a branch" — Vite needs a build step.

## Notes

- Responsive from 360px up
- Main bundle ~77 KB gzipped; three.js splits into a lazy 137 KB chunk
- Skip-to-content link, `aria-current` on the active nav item, focus-visible rings throughout
- `vite.config.js` sets `base: './'` so the build works at any path

## Worth adding over time

The Projects section has one entry, and its GitHub button is hidden because the code isn't published yet. Push E-Grocery to a repo, put the URL in `projects[0].repo`, and the button appears.
