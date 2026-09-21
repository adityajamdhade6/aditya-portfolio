import { ArrowUpRight } from 'lucide-react'
import { projectNumber, type Project } from '../data/projects'

/** Compact row for the Data & ML list: small cover, title and tags. */
export function ProjectRow({ project, onOpen }: { project: Project; onOpen: (slug: string) => void }) {
  return (
    <li>
      <button type="button" onClick={() => onOpen(project.slug)} className="project-row group">
        <span className="hidden text-xs text-[#d98c88] sm:block">{projectNumber(project)}</span>
        <span className="project-row-thumb">{project.thumb && <img src={project.thumb} alt="" loading="lazy" decoding="async" />}</span>
        <span className="min-w-0">
          <span className="block font-playfair text-xl italic tracking-[-0.03em] text-white sm:text-2xl">{project.title}</span>
          <span className="mt-1.5 block text-sm leading-6 text-white/55">{project.category.split(' / ').join(' · ')}</span>
        </span>
        <ArrowUpRight className="project-arrow" size={20} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </li>
  )
}
