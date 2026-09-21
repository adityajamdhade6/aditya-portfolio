import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Download, FileText, X } from 'lucide-react'
import { caseStudies, type CaseDocument, type CaseImage, type CaseSection, type CaseStudy } from '../data/caseStudies'
import { groupCount, groupLabels, orderedProjects, projectNumber, type Project } from '../data/projects'
import { ProjectCover } from './ProjectCover'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
  onNavigate: (slug: string) => void
}

const pad = (n: number) => String(n).padStart(2, '0')
const BUTTON =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm text-white transition-colors hover:bg-white hover:text-[#140c0c]'

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">{children}</p>
}

/** Two-column row: serif label on the left, content on the right. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-white/10 py-12 lg:grid-cols-[0.45fr_1.55fr] lg:gap-14 lg:py-14">
      <h3 className="font-playfair text-3xl italic tracking-[-0.04em] text-white sm:text-4xl">{title}</h3>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="max-w-3xl space-y-5">
      {items.map((text) => (
        <p key={text} className="text-base leading-8 text-white/75 sm:text-lg">
          {text}
        </p>
      ))}
    </div>
  )
}

function Figure({ image }: { image: CaseImage }) {
  return (
    <figure>
      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="block h-auto w-full rounded-md border border-white/10" />
      {image.caption && <figcaption className="mt-3 text-xs text-white/50">{image.caption}</figcaption>}
    </figure>
  )
}

function RichSection({ section }: { section: CaseSection }) {
  return (
    <Block title={section.title}>
      <div className="space-y-8">
        {section.body && <Paragraphs items={section.body} />}

        {section.list?.map((group) => (
          <div key={group.heading ?? group.items[0]}>
            {group.heading && <Eyebrow>{group.heading}</Eyebrow>}
            <ul className="mt-4 max-w-3xl space-y-3">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-7 text-white/75">
                  <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#d98c88]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {section.images?.map((image) => (
          <Figure key={image.src} image={image} />
        ))}

        {section.screenGroups?.map((group) => (
          <div key={group.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h4 className="text-xl text-white">{group.title}</h4>
            <p className="mt-2 max-w-xl text-sm leading-7 text-white/60">{group.body}</p>
            <div className="mt-8 flex items-end gap-5 overflow-x-auto pb-2">
              {group.images.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-[420px] w-auto flex-none drop-shadow-[0_24px_30px_rgba(0,0,0,0.45)] sm:h-[520px]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Block>
  )
}

function Documents({ documents }: { documents: CaseDocument[] }) {
  return (
    <Block title="Read the document">
      <div className="space-y-14">
        {documents.map((doc) => (
          <div key={doc.file}>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <FileText size={26} strokeWidth={1.3} className="text-[#d98c88]" aria-hidden="true" />
                <div>
                  <p className="text-lg text-white">{doc.title}</p>
                  <p className="text-sm text-white/55">{doc.pages} pages · PDF</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={doc.file} target="_blank" rel="noopener noreferrer" className={BUTTON}>
                  Open PDF <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
                </a>
                <a href={doc.file} download className={BUTTON}>
                  Download <Download size={16} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </div>
            </div>
            <ol className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: doc.pages }, (_, index) => (
                <li key={index}>
                  <a href={`${doc.file}#page=${index + 1}`} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Open page ${index + 1} of ${doc.title}`}>
                    <img
                      src={`${doc.pageDir}/${pad(index + 1)}.webp`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/4] w-full rounded border border-white/10 bg-white object-cover object-top transition-transform duration-500 group-hover:-translate-y-1"
                    />
                    <span className="mt-2 block text-xs text-white/50">{index + 1}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Block>
  )
}

function CaseBody({ project, study }: { project: Project; study: CaseStudy }) {
  const isPoster = project.group === 'graphic'
  const meta = [
    ['Role', study.role],
    ['Client', study.client],
    ['Timeline', study.timeline],
    ['Duration', study.duration],
    ['Type', study.type],
    ['Industry', study.industry],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))

  const header = (
    <div className="min-w-0">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#d98c88]">{study.subtitle}</p>
      <h2 id="project-dialog-title" className="mt-4 font-playfair text-4xl italic leading-[1.02] tracking-[-0.045em] text-white sm:text-6xl">
        {project.title}
      </h2>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">{study.tagline}</p>

      <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-3">
        {meta.map(([label, value]) => (
          <div key={label}>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-white/50">{label}</dt>
            <dd className="mt-2 text-sm leading-6 text-white/90">{value}</dd>
          </div>
        ))}
      </dl>

      {study.skills && (
        <ul className="mt-8 flex flex-wrap gap-2">
          {study.skills.map((skill) => (
            <li key={skill} className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs text-white/75">
              {skill}
            </li>
          ))}
        </ul>
      )}

      {study.links && (
        <div className="mt-8 flex flex-wrap gap-3">
          {study.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={BUTTON}>
              {link.label} <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="px-5 pb-6 sm:px-10">
      {isPoster ? (
        <div className="grid gap-10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-12">
          <div className={`modal-media tone-${project.tone} self-start`}>{project.image && <img src={project.image} alt={`${project.title} poster`} />}</div>
          {header}
        </div>
      ) : (
        <>
          <div className="py-10 lg:py-12">{header}</div>
          <ProjectCover project={project} eager />
        </>
      )}

      {project.metric && !isPoster && (
        <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-white/10 py-8">
          <span className="font-playfair text-6xl italic leading-none tracking-[-0.05em] text-[#e2a7a3] sm:text-7xl">{project.metric.value}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{project.metric.label}</span>
        </div>
      )}

      <div className={isPoster || project.metric ? '' : 'mt-6'}>
        <Block title="Overview">
          <Paragraphs items={study.overview} />
        </Block>

        <Block title="The problem">
          <p className="max-w-3xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">{study.problem}</p>
        </Block>

        <Block title="The solution">
          <p className="max-w-3xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9">{study.solution}</p>
        </Block>

        {study.features.length > 0 && (
          <Block title="Key features">
            <div className="space-y-6">
              {study.features.map((feature, index) => (
                <article key={feature.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs text-[#d98c88]">{pad(index + 1)}</span>
                    <h4 className="text-xl text-white">{feature.title}</h4>
                  </div>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-10">
                    <div>
                      <Eyebrow>Problem</Eyebrow>
                      <p className="mt-3 text-sm leading-7 text-white/70">{feature.problem}</p>
                    </div>
                    <div>
                      <Eyebrow>Solution</Eyebrow>
                      <p className="mt-3 text-sm leading-7 text-white/70">{feature.solution}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Block>
        )}

        {study.gallery && study.gallery.length > 0 && (
          <Block title="Visuals">
            <div className={`grid gap-8 ${study.gallery.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {study.gallery.map((image) => (
                <Figure key={image.src} image={image} />
              ))}
            </div>
          </Block>
        )}

        {study.sections.map((section) => (
          <RichSection key={section.title} section={section} />
        ))}

        {study.documents && <Documents documents={study.documents} />}
      </div>
    </div>
  )
}

export function ProjectModal({ project, onClose, onNavigate }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const activeRef = useRef(project)
  const pressedOnBackdrop = useRef(false)

  useEffect(() => {
    activeRef.current = project
    const dialog = dialogRef.current
    if (!dialog) return

    if (project && !dialog.open) {
      dialog.showModal()
      // Native focus lands on the scrollable panel; put it on the close button instead.
      closeButtonRef.current?.focus()
    }
    if (!project && dialog.open) dialog.close()
    document.documentElement.classList.toggle('modal-open', Boolean(project))
    panelRef.current?.scrollTo({ top: 0 })
  }, [project])

  useEffect(() => () => document.documentElement.classList.remove('modal-open'), [])

  const index = project ? orderedProjects.indexOf(project) : -1
  const previous = index >= 0 ? orderedProjects[(index - 1 + orderedProjects.length) % orderedProjects.length] : null
  const next = index >= 0 ? orderedProjects[(index + 1) % orderedProjects.length] : null
  const study = project ? caseStudies[project.slug] : undefined

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowLeft' && previous) onNavigate(previous.slug)
    if (event.key === 'ArrowRight' && next) onNavigate(next.slug)
  }

  const handleMouseDown = (event: MouseEvent<HTMLDialogElement>) => {
    pressedOnBackdrop.current = event.target === event.currentTarget
  }

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (pressedOnBackdrop.current && event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      // Esc: let the router own the close (URL + state), which then closes the dialog in the effect above.
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      // Safety net for any other native close; ignored when the close was triggered by our own state change.
      onClose={() => {
        if (activeRef.current) onClose()
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {project && (
        <div ref={panelRef} className="project-panel">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-[#140c0c]/95 px-5 py-3 backdrop-blur sm:px-10 sm:py-4">
            <p className="eyebrow">
              {groupLabels[project.group]} · {projectNumber(project)} / {groupCount(project.group)}
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {study ? (
            <CaseBody project={project} study={study} />
          ) : (
            <div className="px-5 py-10 sm:px-10">
              <h2 id="project-dialog-title" className="font-playfair text-4xl italic text-white">
                {project.title}
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">{project.description}</p>
            </div>
          )}

          {previous && next && (
            <div className="grid grid-cols-2 border-t border-white/10 text-sm">
              <button type="button" onClick={() => onNavigate(previous.slug)} className="flex items-center gap-3 px-5 py-5 text-left text-white/70 transition-colors hover:bg-white/5 hover:text-white sm:px-10">
                <ArrowLeft size={18} strokeWidth={1.4} className="flex-none" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-white/45">Previous</span>
                  <span className="mt-1 block truncate">{previous.title}</span>
                </span>
              </button>
              <button type="button" onClick={() => onNavigate(next.slug)} className="flex items-center justify-end gap-3 border-l border-white/10 px-5 py-5 text-right text-white/70 transition-colors hover:bg-white/5 hover:text-white sm:px-10">
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-white/45">Next</span>
                  <span className="mt-1 block truncate">{next.title}</span>
                </span>
                <ArrowRight size={18} strokeWidth={1.4} className="flex-none" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  )
}
