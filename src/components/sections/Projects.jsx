import Icon from '../ui/Icon.jsx'
import Tilt from '../visuals/Tilt.jsx'
import { Bullets, Button, Eyebrow, Reveal, Section, SectionHead, TagRow } from '../ui/index.jsx'
import { isSet, profile, projects } from '../../data/profile.js'

export default function Projects() {
  return (
    <Section id="projects" className="rule">
      <Reveal>
        <SectionHead eyebrow="Selected work" title="Projects" />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={i * 90} className="h-full">
            <Tilt innerClassName="rounded-xl border border-line bg-surface/80 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-line-bright">
              <div className="mb-6 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
                {isSet(project.repo) && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener"
                    aria-label={`${project.title} source on GitHub`}
                    className="relative z-[2] grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-body transition hover:border-body hover:text-bright"
                  >
                    <Icon name="github" className="h-4 w-4" />
                  </a>
                )}
              </div>

              <p className="leading-relaxed text-body">{project.blurb}</p>
              <Bullets items={project.bullets} className="mt-6 text-sm" />
              <TagRow items={project.stack} className="mt-7" />
            </Tilt>
          </Reveal>
        ))}

        {isSet(profile.github) && (
        <Reveal delay={projects.length * 90} className="h-full">
          <Tilt
            sheen={false}
            innerClassName="flex h-full flex-col items-start justify-center rounded-xl border border-dashed border-line bg-surface/40 p-7 backdrop-blur-sm"
          >
            <Eyebrow className="mb-4">More</Eyebrow>
            <p className="mb-6 leading-relaxed text-body">
              Smaller experiments, practice builds and work in progress live on my GitHub
              profile.
            </p>
            <Button
              href={profile.github}
              icon="github"
              target="_blank"
              rel="noopener"
              className="relative z-[2]"
            >
              Visit profile
            </Button>
          </Tilt>
        </Reveal>
        )}
      </div>
    </Section>
  )
}
