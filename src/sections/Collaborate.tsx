import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { EMAIL, PROCESS, SERVICES } from '../data/site'

export function Collaborate() {
  return (
    <section id="collaborate" className="portfolio-section bg-[#0a0707] text-white">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <ScrollReveal>
            <span className="eyebrow">04 / Collaborate</span>
            <h2 className="section-heading mt-5">
              Bring the <em>unusual</em> idea.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-10 max-w-lg text-lg leading-8 text-white/70">
              I collaborate with people who want to build with curiosity, clarity and a little more imagination.
            </p>
            <ul className="border-t border-white/15">
              {SERVICES.map((service, index) => (
                <li key={service} className="border-b border-white/15">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Project enquiry: ${service}`)}`}
                    className="service-row group flex items-center justify-between py-5 text-lg text-white/80 transition-colors hover:text-white sm:text-2xl"
                  >
                    <span>
                      <span className="mr-5 text-xs text-[#d98c88]">0{index + 1}</span>
                      {service}
                    </span>
                    <ArrowUpRight
                      className="text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      size={20}
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-24">
          <p className="eyebrow mb-8">How I work</p>
          <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map(([title, description], index) => (
              <li key={title} className="border-t border-white/15 pt-5">
                <span className="text-xs text-[#d98c88]">0{index + 1} / 05</span>
                <h3 className="mt-4 text-xl text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/60">{description}</p>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  )
}
