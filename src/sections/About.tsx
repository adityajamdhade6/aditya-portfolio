import { Download } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { RESUME } from '../data/site'

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
              AI creator and developer building products, automations and brand systems <em>end to end.</em>
            </h2>

            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 sm:w-auto"
            >
              Download résumé <Download size={16} strokeWidth={2} aria-hidden="true" />
            </a>

          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
