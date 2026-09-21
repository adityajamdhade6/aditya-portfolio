import { ArrowUpRight } from 'lucide-react'
import { projectNumber, type Project } from '../data/projects'
import { ProjectCover } from './ProjectCover'

export type CardVariant = 'featured' | 'default' | 'compact' | 'poster'

type ProjectCardProps = {
  project: Project
  variant?: CardVariant
  /** Featured cards only: put the cover on the right. */
  reverse?: boolean
  onOpen: (slug: string) => void
}

const TITLE_CLASS: Record<CardVariant, string> = {
  featured: 'text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.02]',
  default: 'text-3xl sm:text-4xl leading-[1.05]',
  compact: 'text-2xl sm:text-[1.7rem] leading-[1.1]',
  poster: 'text-lg sm:text-2xl leading-[1.15]',
}

export function ProjectCard({ project, variant = 'default', reverse = false, onOpen }: ProjectCardProps) {
  const number = projectNumber(project)
  const kicker = project.category.split(' / ').join(' · ')
  const isFeatured = variant === 'featured'
  const isPoster = variant === 'poster'

  const text = (
    <div className={isFeatured ? 'flex flex-col justify-center' : isPoster ? 'mt-4 sm:mt-6' : 'mt-5 sm:mt-6'}>
      <p className="text-xs uppercase tracking-[0.2em] text-white/55">
        <span className="mr-3 text-[#d98c88]">{number}</span>
        {kicker}
        {project.kind && (
          <span className="ml-3 inline-block rounded-full border border-white/20 px-2.5 py-0.5 align-middle text-[0.72rem] tracking-[0.14em] text-white/70">{project.kind}</span>
        )}
      </p>
      <div className="mt-4 flex items-start justify-between gap-6">
        <h3 className={`font-playfair italic tracking-[-0.04em] text-white ${TITLE_CLASS[variant]}`}>
          <button type="button" onClick={() => onOpen(project.slug)} className="project-open">
            {project.title}
          </button>
        </h3>
        {!isFeatured && <ArrowUpRight className="project-arrow mt-1" size={20} strokeWidth={1.4} aria-hidden="true" />}
      </div>
      {!isPoster && (
        <p className={`mt-4 max-w-md text-sm leading-7 text-white/65 ${isFeatured ? 'sm:text-base sm:leading-8' : ''}`}>{project.description}</p>
      )}
      {isFeatured && (
        <p className="mt-8 flex items-center gap-2 text-sm text-white/80">
          View case study <ArrowUpRight className="project-arrow" size={18} strokeWidth={1.4} aria-hidden="true" />
        </p>
      )}
    </div>
  )

  return (
    <article data-cursor="View" className={`project-card ${isFeatured ? 'grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16' : ''}`}>
      <div className={isFeatured && reverse ? 'lg:order-2' : ''}>
        <ProjectCover project={project} />
      </div>
      {text}
    </article>
  )
}
