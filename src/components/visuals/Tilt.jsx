import { useCallback, useRef } from 'react'

/* ---------------------------------------------------------------------------
   Pointer-driven 3D tilt.

   Writes --rx / --ry (rotation) and --mx / --my (the sheen highlight) straight
   onto the DOM node instead of holding them in state, so moving the mouse
   never triggers a React render. The actual transform lives in index.css.

   Touch devices and reduced-motion users are filtered out there too, in CSS,
   which keeps this component free of media-query branching.
--------------------------------------------------------------------------- */

export default function Tilt({
  max = 7,
  sheen = true,
  className = '',
  innerClassName = '',
  children,
}) {
  const ref = useRef(null)

  const onPointerMove = useCallback(
    (e) => {
      const node = ref.current
      if (!node) return

      const rect = node.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height

      // Cursor above centre tips the card back, left of centre turns it left.
      node.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
      node.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
      node.style.setProperty('--mx', `${px * 100}%`)
      node.style.setProperty('--my', `${py * 100}%`)
      node.dataset.active = 'true'
    },
    [max],
  )

  const onPointerLeave = useCallback(() => {
    const node = ref.current
    if (!node) return
    node.style.setProperty('--rx', '0deg')
    node.style.setProperty('--ry', '0deg')
    node.dataset.active = 'false'
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`tilt h-full ${className}`}
    >
      <div className={`tilt-inner ${sheen ? 'tilt-sheen' : ''} ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
