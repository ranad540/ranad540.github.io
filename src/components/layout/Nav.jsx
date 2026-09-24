import { useEffect, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import { navItems, profile } from '../../data/profile.js'
import { useScrollSpy } from '../../hooks/useScrollSpy.js'

const SECTION_IDS = navItems.map((item) => item.id)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/85 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4 sm:px-8">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {profile.name}
          <span className="ml-2 font-mono text-[11px] font-normal uppercase tracking-[0.16em] text-body">
            {profile.role}
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-8 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`link-underline text-sm transition-colors ${
                active === item.id ? 'text-bright' : 'text-body hover:text-bright'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full border border-line-bright px-4 py-2 text-sm transition hover:border-body hover:bg-raised"
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line-bright md:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line px-5 pb-6 pt-2 md:hidden" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block py-3 text-lg text-body transition-colors hover:text-bright"
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            onClick={() => setOpen(false)}
            className="block py-3 text-lg text-body hover:text-bright"
          >
            Get in touch
          </a>
        </nav>
      )}
    </header>
  )
}
