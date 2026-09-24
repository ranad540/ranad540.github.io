import { Eyebrow, Reveal, RichText, Section } from '../ui/index.jsx'
import { about, isSet } from '../../data/profile.js'

export default function About() {
  return (
    <Section id="about" className="rule">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Eyebrow className="mb-6">About</Eyebrow>
          <p className="text-2xl leading-relaxed tracking-tight sm:text-3xl">{about.statement}</p>

          <div className="mt-10 space-y-5 text-body">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:pt-20">
          <dl className="divide-y divide-line border-y border-line">
            {about.sidecard
              .filter((row) => isSet(row.value))
              .map((row) => (
              <div key={row.label} className="py-4">
                <dt className="eyebrow mb-1.5">{row.label}</dt>
                <dd className="text-sm">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}
