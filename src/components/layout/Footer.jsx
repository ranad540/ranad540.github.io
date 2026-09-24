import { Container } from '../ui/index.jsx'
import { isSet, navItems, profile } from '../../data/profile.js'

export default function Footer() {
  return (
    <footer className="rule py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-body">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <nav className="flex flex-wrap gap-6" aria-label="Footer">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="transition-colors hover:text-bright"
              >
                {item.label}
              </a>
            ))}
            {isSet(profile.github) && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                className="transition-colors hover:text-bright"
              >
                GitHub
              </a>
            )}
            {isSet(profile.linkedin) && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                className="transition-colors hover:text-bright"
              >
                LinkedIn
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-bright"
            >
              Email
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
