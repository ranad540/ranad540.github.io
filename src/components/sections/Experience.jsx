import { Bullets, Reveal, Section, SectionHead, TagRow } from '../ui/index.jsx'
import { experience, isSet } from '../../data/profile.js'

export default function Experience() {
  return (
    <Section id="experience" className="rule">
      <Reveal>
        <SectionHead eyebrow="Experience" title="Where I've worked" />
      </Reveal>

      <div className="divide-y divide-line border-y border-line">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.period}`} delay={i * 80}>
            <article className="grid gap-6 py-10 lg:grid-cols-[220px_1fr] lg:gap-12">
              <div className="lg:pt-1">
                <p className="eyebrow">{job.period}</p>
                <p className="mt-3 text-sm text-body">{job.location}</p>
                {isSet(job.client) && (
                  <p className="eyebrow mt-3">Employer · {job.company}</p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-tight">
                  {job.role}
                  <span className="ml-2.5 text-body">
                    · {isSet(job.client) ? job.client : job.company}
                  </span>
                </h3>

                <Bullets items={job.bullets} className="mt-6" />
                <TagRow items={job.stack} className="mt-7" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
