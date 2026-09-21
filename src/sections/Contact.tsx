import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { EMAIL, RESUME, SOCIALS } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="portfolio-section bg-[#160909] text-white">
      <div className="section-shell">
        <ScrollReveal>
          <span className="eyebrow">04 / Contact</span>
          <h2 className="contact-heading mt-8">
            Let's Create <em>Something.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-16 sm:mt-20">
          <a href={`mailto:${EMAIL}`} className="contact-email text-xl text-white sm:text-4xl">
            {EMAIL}
            <ArrowUpRight className="mt-1 flex-none sm:mt-2" size={28} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </ScrollReveal>

        <ScrollReveal className="mt-14 flex flex-wrap gap-3 border-t border-white/20 pt-8">
          <a
            href={RESUME}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-[#160909] transition-colors hover:bg-gray-200"
          >
            Résumé
            <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
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
