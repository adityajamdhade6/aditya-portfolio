import { RevealHeading } from '../components/RevealHeading'
import { ScrollReveal } from '../components/ScrollReveal'
import { ArrowUpRight } from 'lucide-react'
import { experience } from '../data/about'

export function Experience() {
  return (
    <section id="experience" className="portfolio-section bg-[#0c0808] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-12 md:mb-16">
          <span className="eyebrow">03 / Experience</span>
          <RevealHeading className="section-heading mt-5" parts={[{ text: "Where I've" }, { text: 'worked.', accent: true }]} />
        </ScrollReveal>

        <ul className="border-t border-white/15">
          {experience.map((job) => {
            const current = /present/i.test(job.period)
            const row = (
              <div className="experience-row group grid items-center gap-x-8 gap-y-1 border-b border-white/15 py-6 md:grid-cols-[1.35fr_1.35fr_9.5rem_1.5rem] md:py-7">
                <p className="flex items-center gap-3 font-playfair text-2xl italic tracking-[-0.03em] text-white sm:text-3xl">
                  {current && <span className="h-2 w-2 flex-none animate-pulse rounded-full bg-[#d98c88]" aria-hidden="true" />}
                  {job.company}
                </p>
                <p className="text-base text-white/80">
                  {job.role}
                  <span className="ml-3 rounded-full border border-white/15 whitespace-nowrap px-2.5 py-0.5 align-middle text-[0.72rem] uppercase tracking-[0.14em] text-white/55">{job.tag}</span>
                </p>
                <p className="text-sm text-white/55 md:text-right">{job.period}</p>
                <span className="hidden md:block">{job.url && <ArrowUpRight className="project-arrow" size={20} strokeWidth={1.4} aria-hidden="true" />}</span>
              </div>
            )
            return (
              <li key={`${job.company}-${job.period}`}>
                <ScrollReveal>
                  {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer" data-cursor="Visit" className="block" aria-label={`${job.role} at ${job.company} (opens website)`}>
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
