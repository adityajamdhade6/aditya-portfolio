import { ScrollReveal } from '../components/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'
import { experience } from '../data/about'

export function Experience() {
  return (
    <section id="experience" className="portfolio-section bg-[#0c0808] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-12 md:mb-16">
          <span className="eyebrow">02 / Experience</span>
          <h2 className="section-heading mt-5">
            Where I've <em>worked.</em>
          </h2>
        </ScrollReveal>

        <ul className="border-t border-white/15">
          {experience.map((job) => {
            const current = /present/i.test(job.period)
            const row = (
              <div className="experience-row group grid items-center gap-x-8 gap-y-3 border-b border-white/15 py-8 md:grid-cols-[13rem_1fr_auto] md:py-10">
                <p className="flex items-center gap-2.5 text-sm text-white/60">
                  {current && <span className="h-2 w-2 flex-none animate-pulse rounded-full bg-[#d98c88]" aria-hidden="true" />}
                  {job.period}
                </p>
                <div>
                  <h3 className="font-playfair text-3xl italic leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">{job.role}</h3>
                  <p className="mt-3 text-base text-white/70 sm:text-lg">{job.company}</p>
                </div>
                <div className="flex items-center gap-5 md:justify-end">
                  <span className="rounded-full border border-white/15 px-3.5 py-1 text-xs uppercase tracking-[0.14em] text-white/60">{job.tag}</span>
                  {job.url && <ArrowUpRight className="project-arrow" size={22} strokeWidth={1.4} aria-hidden="true" />}
                </div>
              </div>
            )
            return (
              <li key={`${job.company}-${job.period}`}>
                <ScrollReveal>
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="block" aria-label={`${job.role} at ${job.company} (opens website)`}>
                      {row}
                    </a>
                  ) : (
                    row
                  )}
                </ScrollReveal>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
