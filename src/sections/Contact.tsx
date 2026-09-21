import { ArrowUpRight } from 'lucide-react'
import { RevealHeading } from '../components/RevealHeading'
import { ScrollReveal } from '../components/ScrollReveal'
import { EMAIL, SOCIALS } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="portfolio-section bg-[#160909] text-white">
      <div className="section-shell">
        <ScrollReveal>
          <span className="eyebrow">07 / Contact</span>
          <RevealHeading className="contact-heading mt-8" parts={[{ text: "Let's Create" }, { text: 'Something.', accent: true }]} />
        </ScrollReveal>

        <ScrollReveal className="mt-16 sm:mt-20">
          <a href={`mailto:${EMAIL}`} className="contact-email text-xl text-white sm:text-4xl">
            {EMAIL}
            <ArrowUpRight className="mt-1 flex-none sm:mt-2" size={28} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </ScrollReveal>

        <ScrollReveal className="mt-14 flex flex-wrap gap-3 border-t border-white/20 pt-8">
          {SOCIALS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm text-white/85 transition-colors hover:bg-white hover:text-[#160909]"
            >
              {label}
              <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
