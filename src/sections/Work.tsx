import { useState, type ReactNode } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectRow } from '../components/ProjectRow'
import { ScrollReveal } from '../components/ScrollReveal'
import { projectsByGroup } from '../data/projects'

type WorkProps = { onOpen: (slug: string) => void }

function SubIntro({ eyebrow, heading }: { eyebrow: string; heading: ReactNode }) {
  return (
    <ScrollReveal className="mb-8 mt-20 flex flex-col justify-between gap-5 border-t border-white/15 pt-8 md:mb-14 md:mt-32 md:flex-row md:items-end md:gap-7 md:pt-10">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h3 className="section-heading mt-4 !text-4xl sm:!text-6xl">{heading}</h3>
      </div>
    </ScrollReveal>
  )
}

export function Work({ onOpen }: WorkProps) {
  const { product, graphic, experiment, archive } = projectsByGroup
  const featured = product.slice(0, 2)
  const [showAll, setShowAll] = useState(false)
  const rest = product.slice(2)
  const caseStudies = showAll ? rest : rest.slice(0, 4)

  return (
    <section id="portfolio" className="portfolio-section bg-[#100909] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-10 flex flex-col justify-between gap-5 md:mb-20 md:flex-row md:items-end md:gap-7">
          <div>
            <span className="eyebrow">03 / Selected work</span>
            <h2 className="section-heading mt-5">
              Made for the <em className="whitespace-nowrap">in-between.</em>
            </h2>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-14 md:gap-24 lg:gap-32">
          {featured.map((project, index) => (
            <ScrollReveal key={project.slug}>
              <ProjectCard project={project} variant="featured" reverse={index % 2 === 1} onOpen={onOpen} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-24 md:grid-cols-2 md:gap-y-20 lg:mt-32 lg:gap-x-14 lg:gap-y-24">
          {caseStudies.map((project, index) => (
            <ScrollReveal key={project.slug} delay={(index % 2) * 90}>
              <ProjectCard project={project} onOpen={onOpen} />
            </ScrollReveal>
          ))}
        </div>

        {rest.length > 4 && (
          <div className="mt-12 flex justify-center md:mt-16">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-7 text-sm text-white/85 transition-colors hover:bg-white hover:text-[#160909]"
            >
              {showAll ? 'Show fewer case studies' : `Show ${rest.length - 4} more case studies`}
            </button>
          </div>
        )}

        <SubIntro
          eyebrow="Graphic design"
          heading={
            <>
              The <em>visual</em> archive.
            </>
          }
        />

        <div className="grid grid-cols-2 gap-x-5 gap-y-14 lg:grid-cols-4 lg:gap-x-8">
          {graphic.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 80} className={index % 2 === 1 ? 'lg:mt-16' : ''}>
              <ProjectCard project={project} variant="poster" onOpen={onOpen} />
            </ScrollReveal>
          ))}
        </div>

        <SubIntro
          eyebrow="Experiments"
          heading={
            <>
              The <em>side quests.</em>
            </>
          }
        />

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-16">
          {experiment.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 90}>
              <ProjectCard project={project} variant="compact" onOpen={onOpen} />
            </ScrollReveal>
          ))}
        </div>

        <SubIntro
          eyebrow="Data & ML"
          heading={
            <>
              Also on the <em>bench.</em>
            </>
          }
        />

        <ScrollReveal>
          <ul className="border-t border-white/14">
            {archive.map((project) => (
              <ProjectRow key={project.slug} project={project} onOpen={onOpen} />
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
