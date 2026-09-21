import type { ReactNode } from 'react'
import { Download } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { achievements, education, experience, skills } from '../data/about'
import { projects } from '../data/projects'
import { RESUME } from '../data/site'

const STATS = [
  ['2+', 'years shipping product'],
  [`${projects.length}`, 'projects documented'],
  ['4,000+', 'research calls'],
  ['0 → 1', 'D2C brand co-founded'],
] as const

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <ScrollReveal className="mt-20 grid gap-8 border-t border-white/15 pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
      <h3 className="font-playfair text-3xl italic tracking-[-0.04em] text-white sm:text-4xl">{label}</h3>
      <div className="min-w-0">{children}</div>
    </ScrollReveal>
  )
}

export function About() {
  return (
    <section id="about" className="portfolio-section bg-[#090707] text-white">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <ScrollReveal>
            <span className="eyebrow">01 / About</span>
            <span className="mt-5 block h-px w-14 bg-[#a33f43]" />
          </ScrollReveal>
          <ScrollReveal className="max-w-5xl">
            <h2 className="display-heading">
              Product thinker and AI builder turning ideas into <em>intelligent, engaging</em> and useful digital experiences.
            </h2>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-7 text-sm leading-7 text-white/65 md:grid-cols-2 md:gap-16">
              <p>
                I'm a product-focused builder who crafts AI-powered solutions from 0→1, blending data insights, design, and go-to-market strategy. Proudly studying Applied AI at IIT Jodhpur and honing growth tactics at the Institute of Venture Building.
              </p>
              <p>I lead product work end-to-end: research, information architecture, interaction, and systems. I care about the unglamorous screens that make software actually work.</p>
            </div>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
            >
              Download résumé <Download size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-7 sm:grid-cols-4">
              {STATS.map(([value, label]) => (
                <div key={label}>
                  <dd className="text-3xl tracking-[-0.04em] text-white">{value}</dd>
                  <dt className="mt-2 text-xs uppercase leading-5 tracking-[0.16em] text-white/55">{label}</dt>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        <Row label="Experience">
          <div className="-mt-10">
            {experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="grid gap-4 border-t border-white/12 py-8 first:border-t-0 md:grid-cols-[11rem_1fr] md:gap-8">
                <p className="text-sm text-white/55">{job.period}</p>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h4 className="text-xl text-white">{job.role}</h4>
                    <span className="text-white/65">{job.company}</span>
                    <span className="rounded-full border border-white/15 px-3 py-0.5 text-[11px] uppercase tracking-[0.14em] text-white/55">{job.tag}</span>
                  </div>
                  <ul className="mt-4 max-w-3xl space-y-3">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-7 text-white/65">
                        <span className="mt-3 h-1 w-1 flex-none rounded-full bg-[#d98c88]" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Row>

        <Row label="Education">
          <div className="-mt-10">
            {education.map((item) => (
              <article key={item.degree} className="grid gap-1 border-t border-white/12 py-6 first:border-t-0 md:grid-cols-[11rem_1fr_auto] md:items-baseline md:gap-8">
                <p className="text-sm text-white/55">{item.year}</p>
                <div>
                  <h4 className="text-lg text-white">{item.degree}</h4>
                  <p className="mt-1 text-sm text-white/60">{item.inst}</p>
                </div>
                <p className="text-sm text-[#e2a7a3]">{item.grade}</p>
              </article>
            ))}
          </div>
        </Row>

        <Row label="Skills & tools">
          <div className="grid gap-10 sm:grid-cols-3">
            {skills.map((group) => (
              <div key={group.title}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">{group.title}</p>
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
        </Row>

        <Row label="Achievements">
          <div className="grid gap-6 sm:grid-cols-2">
            {achievements.map((item) => (
              <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.03] p-7">
                <h4 className="text-xl text-white">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.desc}</p>
              </article>
            ))}
          </div>
        </Row>
      </div>
    </section>
  )
}
