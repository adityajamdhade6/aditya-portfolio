import { RevealHeading } from '../components/RevealHeading'
import { ScrollReveal } from '../components/ScrollReveal'

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
            <RevealHeading
              className="display-heading"
              parts={[{ text: 'AI creator and developer building products, automations and brand systems' }, { text: 'end to end.', accent: true }]}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
