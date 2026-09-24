import { Reveal, Section, SectionHead, TagRow } from '../ui/index.jsx'
import { skills } from '../../data/profile.js'

export default function Skills() {
  return (
    <Section id="skills" className="rule">
      <Reveal>
        <SectionHead
          eyebrow="Toolkit"
          title="Skills & technologies"
          lede="What I've used in production and in personal projects — listed the way I'd defend it in an interview, with nothing on here I haven't shipped with."
        />
      </Reveal>

      {/* A spec sheet rather than a grid of cards: label on the left, the
          stack on the right, one rule between each row. */}
      <div className="divide-y divide-line border-y border-line">
        {skills.map((group, i) => (
          <Reveal key={group.title} delay={i * 50}>
            <div className="grid gap-4 py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
              <p className="eyebrow sm:pt-1.5">{group.title}</p>
              <TagRow items={group.items} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
