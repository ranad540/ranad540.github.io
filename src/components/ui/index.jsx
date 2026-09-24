import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

export function Container({ wide = false, className = '', children }) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 ${wide ? 'max-w-[1600px]' : 'max-w-6xl'} ${className}`}
    >
      {children}
    </div>
  )
}

export function Section({ id, className = '', wide = false, children }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container wide={wide}>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function SectionHead({ eyebrow, title, lede, action }) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        {lede && <p className="mt-4 text-body">{lede}</p>}
      </div>
      {action}
    </div>
  )
}

const BUTTON =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition duration-200'

export function Button({
  as = 'a',
  variant = 'ghost',
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const Tag = as
  const styles =
    variant === 'solid'
      ? 'bg-bright text-ink hover:bg-white'
      : variant === 'accent'
        ? 'bg-[var(--accent)] text-ink hover:brightness-110'
        : 'border border-line-bright text-bright hover:border-body hover:bg-raised'
  return (
    <Tag className={`${BUTTON} ${styles} ${className}`} {...rest}>
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
      {iconRight && <Icon name={iconRight} className="h-4 w-4" />}
    </Tag>
  )
}

export function Tag({ children, className = '' }) {
  return (
    <span
      className={`rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-body ${className}`}
    >
      {children}
    </span>
  )
}

export function TagRow({ items, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}

/** Fades up on first scroll into view. */
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return setShown(true)
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -70px 0px', threshold: 0.04 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[800ms] ease-out ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function Bullets({ items, className = '' }) {
  return (
    <ul className={`space-y-2.5 text-body ${className}`}>
      {items.map((item) => (
        <li key={item} className="relative pl-5 leading-relaxed">
          <span className="absolute left-0 top-[0.7em] h-px w-2.5 bg-line-bright" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** Renders **bold** segments without pulling in a markdown dependency. */
export function RichText({ text }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-medium text-bright">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}
