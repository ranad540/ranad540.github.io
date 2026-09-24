import { Suspense, lazy, useEffect } from 'react'

/* ---------------------------------------------------------------------------
   The page's one background.

   The 3D scene used to live inside the hero and stop at the first section.
   Now it is a single fixed layer behind everything, so the same form is
   present on every section of the page — the sections scroll over it rather
   than each carrying their own backdrop.

   That creates one problem worth solving properly: a moving, high-contrast
   render behind body copy is unreadable. The veil above the canvas handles
   it, and its opacity is driven by scroll position — nearly clear across the
   hero, where the form is the point, and heavy below it, where the writing
   is. One passive scroll listener writing one CSS variable; no React render
   per frame.
--------------------------------------------------------------------------- */

const HeroScene = lazy(() => import('./HeroScene.jsx'))

const VEIL_MIN = 0.16 // hero: let the form through
const VEIL_MAX = 0.88 // everywhere else: readable body copy wins

export default function Backdrop() {
  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const apply = () => {
      frame = 0
      const travel = Math.max(window.innerHeight * 0.75, 1)
      const t = Math.min(Math.max(window.scrollY / travel, 0), 1)
      // Ease so the veil arrives before the first section rather than
      // fading linearly all the way down the page.
      const eased = t * t * (3 - 2 * t)
      root.style.setProperty('--veil', (VEIL_MIN + (VEIL_MAX - VEIL_MIN) * eased).toFixed(3))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      root.style.removeProperty('--veil')
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      {/* Accent wash — also the whole background if WebGL is unavailable. */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_22%_0%,var(--accent-soft)_0%,transparent_65%)]" />

      <Suspense fallback={null}>
        <HeroScene className="h-full w-full" />
      </Suspense>

      <div className="backdrop-veil absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="film-grain absolute inset-0 overflow-hidden" />
    </div>
  )
}
