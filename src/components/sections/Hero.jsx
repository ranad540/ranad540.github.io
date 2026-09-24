import Icon from '../ui/Icon.jsx'
import { Button, Container, Reveal } from '../ui/index.jsx'
import { isSet, profile } from '../../data/profile.js'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      {/* The technical grid stays — it reads as drafting paper laid over the
          render. The 3D form and its accent wash come from Backdrop, which is
          fixed behind the whole page, so nothing else is needed here except a
          scrim heavy enough to keep the headline legible over it. */}
      <div aria-hidden="true" className="blueprint absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"
      />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-24">
        <Reveal>
          <p className="eyebrow mb-6">
            {profile.role}
            {isSet(profile.location) && (
              <>
                <span className="ml-3">/</span>
                <span className="ml-3">{profile.location}</span>
              </>
            )}
          </p>

          <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
            {profile.name}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-body">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={`mailto:${profile.email}`} variant="solid" icon="mail">
              Get in touch
            </Button>
            <Button href={profile.resume} icon="download" target="_blank" rel="noopener">
              Resume
            </Button>
            {isSet(profile.github) && (
              <Button href={profile.github} icon="github" target="_blank" rel="noopener">
                GitHub
              </Button>
            )}
            {isSet(profile.linkedin) && (
              <Button href={profile.linkedin} icon="linkedin" target="_blank" rel="noopener">
                LinkedIn
              </Button>
            )}
          </div>

          <div className="mt-14 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <p className="eyebrow mb-2">{fact.label}</p>
                <p className="text-sm leading-snug">{fact.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 right-5 z-10 hidden h-11 w-11 place-items-center rounded-full border border-line-bright bg-ink/40 text-body backdrop-blur-sm transition hover:border-body hover:text-bright sm:right-8 sm:grid"
      >
        <Icon name="arrowDown" className="h-4 w-4" />
      </a>
    </section>
  )
}
