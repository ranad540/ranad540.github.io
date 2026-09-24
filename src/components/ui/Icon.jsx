const STROKE = {
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5M12 15V3" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowDown: <path d="M12 5v14M5 13l7 7 7-7" />,
  external: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6M10 14 21 3" />
    </>
  ),
}

// Brand marks are solid paths rather than strokes.
const FILL = {
  github:
    'M12 .5C5.73.5.9 5.48.9 11.92c0 5.05 3.29 9.33 7.86 10.84.57.11.78-.26.78-.57v-2c-3.2.71-3.88-1.58-3.88-1.58-.53-1.37-1.29-1.74-1.29-1.74-1.05-.74.08-.73.08-.73 1.16.09 1.77 1.23 1.77 1.23 1.03 1.82 2.7 1.29 3.36.99.1-.77.4-1.29.73-1.59-2.55-.3-5.24-1.31-5.24-5.83 0-1.29.44-2.34 1.17-3.17-.12-.3-.51-1.5.11-3.13 0 0 .96-.32 3.15 1.21a10.6 10.6 0 0 1 5.74 0c2.19-1.53 3.15-1.21 3.15-1.21.62 1.63.23 2.83.11 3.13.73.83 1.17 1.88 1.17 3.17 0 4.53-2.69 5.53-5.25 5.82.41.37.78 1.09.78 2.2v3.26c0 .31.21.68.79.57A11.44 11.44 0 0 0 23.1 11.92C23.1 5.48 18.27.5 12 .5z',
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM2.4 21.5h5.2V9.2H2.4v12.3zM9.6 9.2h4.98v1.68h.07c.7-1.25 2.4-2.57 4.93-2.57 5.27 0 6.24 3.35 6.24 7.72v7.47h-5.2v-6.62c0-1.58-.03-3.6-2.25-3.6-2.26 0-2.6 1.72-2.6 3.49v6.73H9.6V9.2z',
}

export default function Icon({ name, className = 'h-4 w-4' }) {
  if (FILL[name]) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d={FILL[name]} />
      </svg>
    )
  }
  const shape = STROKE[name]
  if (!shape) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {shape}
    </svg>
  )
}
