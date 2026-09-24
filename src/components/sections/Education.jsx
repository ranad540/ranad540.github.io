import Icon from '../ui/Icon.jsx'
import { Eyebrow, Reveal, Section, SectionHead } from '../ui/index.jsx'
import { certifications, education } from '../../data/profile.js'

export default function Education() {
  return (
    <Section id="education" className="rule">
      <Reveal>
        <SectionHead eyebrow="Background" title="Education & certifications" />
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow className="mb-5">Education</Eyebrow>
          <div className="divide-y divide-line border-y border-line">
            {education.map((item) => (
              <div key={item.degree} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <p className="font-medium">{item.degree}</p>
                  <p className="mt-1 text-sm text-body">{item.school}</p>
                </div>
                <p className="eyebrow sm:pt-1">{item.year}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow className="mb-5">Certifications</Eyebrow>
          <div className="divide-y divide-line border-y border-line">
            {certifications.map((cert) => (
              <div key={cert.name} className="py-5">
                <p className="font-medium">{cert.name}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-body">
                  {cert.issuer}
                  {cert.verify && (
                    <>
                      <span aria-hidden="true">·</span>
                      <a
                        href={cert.verify}
                        target="_blank"
                        rel="noopener"
                        className="link-underline inline-flex items-center gap-1.5 transition-colors hover:text-bright"
                      >
                        Verify
                        <Icon name="external" className="h-3.5 w-3.5" />
                      </a>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
