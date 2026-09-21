import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { RevealHeading } from '../components/RevealHeading'
import { ScrollReveal } from '../components/ScrollReveal'
import { articles, formatDate, linkedInPosts, newsletter, type LinkedInEmbed } from '../data/writing'

// LinkedIn's embed code is sized for 504px; narrower columns wrap the text and need more height.
const EMBED_WIDTH = 504

function LinkedInFrame({ post }: { post: LinkedInEmbed }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(post.height)

  useEffect(() => {
    const frame = ref.current
    if (!frame) return
    const update = () => setHeight(Math.round(post.height * Math.max(1, EMBED_WIDTH / frame.clientWidth) ** 0.6))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [post.height])

  return (
    <iframe
      ref={ref}
      src={post.src}
      title="LinkedIn post by Aditya Jamdhade"
      loading="lazy"
      allowFullScreen
      className="block w-full overflow-hidden rounded-lg bg-white"
      style={{ height }}
    />
  )
}

export function Writing() {
  const rowRef = useRef<HTMLDivElement>(null)
  const scrollRow = (direction: 1 | -1) => rowRef.current?.scrollBy({ left: direction * 560, behavior: 'smooth' })

  return (
    <section id="writing" className="portfolio-section bg-[#0a0707] text-white">
      <div className="section-shell">
        <ScrollReveal className="mb-10 md:mb-16">
          <span className="eyebrow">04 / Writing</span>
          <RevealHeading className="section-heading mt-5" parts={[{ text: 'Writing &' }, { text: 'updates.', accent: true }]} />
        </ScrollReveal>

        {articles.length > 0 && (
          <>
            <p className="eyebrow mb-6">Articles on emuski.com</p>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {articles.map((article, index) => (
                <ScrollReveal key={article.url} delay={index * 90}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Read"
                    className="glow-card group flex h-full flex-col overflow-hidden rounded-lg border border-white/12 bg-white/[0.03] transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    {article.image && (
                      <img src={article.image} alt="" loading="lazy" decoding="async" className="aspect-[16/9] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                    )}
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/55">
                        <span className="mr-3 text-[#d98c88]">Article</span>
                        {formatDate(article.date)}
                      </p>
                      <h3 className="mt-4 font-playfair text-2xl italic leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.7rem]">{article.title}</h3>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/65">{article.description}</p>
                      <p className="mt-6 flex items-center gap-2 pt-2 text-sm text-white/85">
                        Read on emuski.com <ArrowUpRight className="project-arrow" size={18} strokeWidth={1.4} aria-hidden="true" />
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        <div className="mb-6 mt-16 flex items-center justify-between md:mt-24">
          <p className="eyebrow">On LinkedIn</p>
          <div className="hidden gap-2 md:flex xl:hidden">
            <button type="button" onClick={() => scrollRow(-1)} aria-label="Previous posts" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-[#140c0c]">
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollRow(1)} aria-label="Next posts" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white hover:text-[#140c0c]">
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div ref={rowRef} className="linkedin-row -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-0 sm:px-0">
          {linkedInPosts.map((post) => (
            // Equal-height frames so the posts line up; LinkedIn controls what is inside each embed.
            <div key={post.id} className="w-[min(536px,88vw)] shrink-0 snap-start rounded-xl border border-white/12 bg-white/[0.03] p-3 sm:p-4">
              <LinkedInFrame post={post} />
            </div>
          ))}
        </div>

        <ScrollReveal className="mt-12 md:mt-16">
          <div className="glow-card flex flex-col gap-6 rounded-xl border border-white/12 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <p className="eyebrow">Newsletter</p>
              <h3 className="mt-3 font-playfair text-2xl italic tracking-[-0.03em] text-white sm:text-3xl">{newsletter.name}</h3>
              <p className="mt-3 text-sm leading-7 text-white/65">{newsletter.description}</p>
            </div>
            <a
              href={newsletter.href}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="magnetic btn-shine inline-flex min-h-12 flex-none items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#0b78e3]"
            >
              Subscribe on LinkedIn <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
