import Icon from '../ui/Icon.jsx'
import { Button, Container, Eyebrow, Reveal, Tag } from '../ui/index.jsx'
import { isSet, openTo, profile } from '../../data/profile.js'

export default function Contact() {
  return (
    <section id="contact" className="rule py-24 sm:py-32">
      <Container>
        <Reveal>
          <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400">Open to new roles</span>
          </span>

          <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            Got something that needs building?
          </h2>

          <p className="mt-6 max-w-xl text-body leading-relaxed">
            Backend, frontend, or the whole thing end to end. Email is the fastest way to reach
            me and I reply to everything.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={`mailto:${profile.email}`} variant="solid" icon="mail">
              {profile.email}
            </Button>
            <Button href={profile.resume} icon="download" target="_blank" rel="noopener">
              Resume
            </Button>
          </div>

          <div className="mt-14">
            <Eyebrow className="mb-4">Elsewhere</Eyebrow>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: 'GitHub', href: profile.github },
                { label: 'LinkedIn', href: profile.linkedin },
                { label: profile.phone, href: profile.phoneHref },
              ]
                .filter((link) => isSet(link.href))
                .map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener"
                    className="link-underline inline-flex items-center gap-2 text-sm text-body transition-colors hover:text-bright"
                  >
                    {link.label}
                    {link.href.startsWith('http') && (
                      <Icon name="external" className="h-3.5 w-3.5" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {openTo.map((role) => (
              <Tag key={role}>{role}</Tag>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
