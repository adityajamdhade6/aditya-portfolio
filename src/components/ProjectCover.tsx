import type { Project } from '../data/projects'

const SIZES = '(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw'

/** Full-bleed 3:2 cover for case studies; posters are shown as the artwork itself. */
export function ProjectCover({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { title, group, thumb, image } = project
  const loading = eager ? 'eager' : 'lazy'

  if (group === 'graphic' && image) {
    return <img src={image} alt={`${title} poster`} className="poster-cover" loading={loading} decoding="async" sizes={SIZES} />
  }

  return (
    <div className="cover">
      {thumb && <img src={thumb} alt={`${title} cover`} loading={loading} decoding="async" sizes={SIZES} data-parallax={eager ? undefined : 14} />}
    </div>
  )
}
