import { useEffect, useState } from 'react'

/**
 * Returns the id of whichever section currently occupies the middle of the
 * viewport, so the navbar can highlight it.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}
