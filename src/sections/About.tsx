import { Download } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { projects } from '../data/projects'
import { RESUME } from '../data/site'

const STATS = [
  ['2+', 'years shipping product'],
  [`${projects.length}`, 'projects documented'],
  ['4,000+', 'research calls'],
  ['0 → 1', 'D2C brand co-founded'],
] as const

export function About() {
  return (
    <section id="about" className="portfolio-section bg-[#090707] text-white">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <ScrollReveal>
            <span className="eyebrow">01 / About</span>
            <span className="mt-5 block h-px w-14 bg-[#a33f43]" />
          </ScrollReveal>

          <ScrollReveal className="max-w-5xl">
            <h2 className="display-heading">
              Product thinker and AI builder turning ideas into <em>intelligent, engaging</em> and useful digital experiences.
            </h2>

            <div className="mt-10 grid gap-6 border-t border-white/15 pt-7 text-[0.95rem] leading-7 text-white/70 md:mt-12 md:grid-cols-2 md:gap-14 md:text-sm md:text-white/65">
              <p>
                I'm a product-focused builder who crafts AI-powered solutions from 0→1, blending data insights, design, and go-to-market strategy. Proudly studying Applied AI at IIT Jodhpur and honing growth tactics at the Institute of Venture Building.
              </p>
              <p>I lead product work end-to-end: research, information architecture, interaction, and systems. I care about the unglamorous screens that make software actually work.</p>
            </div>

            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 sm:w-auto"
            >
              Download résumé <Download size={16} strokeWidth={2} aria-hidden="true" />
            </a>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4">
              {STATS.map(([value, label]) => (
                <div key={label}>
                  <dd className="text-3xl tracking-[-0.04em] text-white sm:text-4xl">{value}</dd>
                  <dt className="mt-2 text-xs uppercase leading-5 tracking-[0.14em] text-white/60">{label}</dt>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
