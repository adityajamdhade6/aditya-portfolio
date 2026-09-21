import { Database } from 'lucide-react'
import { ScrollReveal } from '../components/ScrollReveal'
import { tools } from '../data/tools'

export function Toolkit() {
  return (
    <section id="toolkit" className="portfolio-section bg-[#0c0808] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-10 md:mb-14">
          <span className="eyebrow">04 / Toolkit</span>
          <h2 className="section-heading mt-5">
            What I <em>build with.</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {tools.map((tool) => (
              <li
                key={tool.name}
                className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/[0.03] px-3 py-3 text-sm text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white">
                  {tool.logo ? (
                    <img src={`/logos/${tool.logo}.svg`} alt="" className="h-6 w-6 object-contain" loading="lazy" decoding="async" />
                  ) : (
                    <Database className="h-5 w-5 text-[#336791]" strokeWidth={1.8} aria-hidden="true" />
                  )}
                </span>
                {tool.name}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  )
}
