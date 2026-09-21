import type { ReactNode } from 'react'
import { ScrollReveal } from '../components/ScrollReveal'
import { achievements, experience, skills } from '../data/about'

function SubHead({ children }: { children: ReactNode }) {
  return <h3 className="font-playfair text-2xl italic tracking-[-0.03em] text-white sm:text-3xl">{children}</h3>
}

export function Experience() {
  return (
    <section id="experience" className="portfolio-section bg-[#0c0808] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-12 md:mb-16">
          <span className="eyebrow">03 / Experience</span>
          <h2 className="section-heading mt-5">
            Where I've <em>worked.</em>
          </h2>
        </ScrollReveal>

        <ol className="relative max-w-5xl border-l border-white/15 pl-6 sm:pl-10">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="relative pb-12 last:pb-0 md:pb-14">
              <span aria-hidden="true" className="absolute -left-[30px] top-[0.55rem] h-2.5 w-2.5 rounded-full bg-[#c9736f] ring-4 ring-[#0c0808] sm:-left-[46px]" />
              <ScrollReveal>
                <div className="grid gap-x-10 gap-y-2 md:grid-cols-[12rem_1fr]">
                  <p className="text-sm text-white/60 md:pt-1.5">{job.period}</p>
                  <div>
                    <h3 className="text-xl leading-snug text-white sm:text-2xl">{job.role}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.95rem] text-white/70">
                      {job.company}
                      <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs uppercase tracking-[0.12em] text-white/60">{job.tag}</span>
                    </p>
                    <ul className="mt-5 max-w-3xl space-y-3">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[0.95rem] leading-7 text-white/70">
                          <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#d98c88]" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal className="mt-16 border-t border-white/15 pt-12 md:mt-24 md:pt-14">
          <SubHead>Toolkit</SubHead>
          <div className="mt-8 grid gap-9 sm:grid-cols-3 sm:gap-8">
            {skills.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-[0.18em] text-white/60">{group.title}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-14 md:mt-20">
          <SubHead>Highlights</SubHead>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {achievements.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.03] p-6 sm:p-7">
                <h4 className="text-lg text-white sm:text-xl">{item.title}</h4>
                <p className="mt-3 text-[0.95rem] leading-7 text-white/70">{item.desc}</p>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
