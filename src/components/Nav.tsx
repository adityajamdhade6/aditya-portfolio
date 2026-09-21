import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import { newsletter } from '../data/writing'

const SECTION_IDS = ['hero', ...NAV_LINKS.map((link) => link.id), 'contact']

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('hero')
  const trackRef = useRef<HTMLDivElement>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)

      const line = window.innerHeight * 0.4
      let current = 'hero'
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Slide one highlight behind the active link instead of swapping backgrounds.
  useLayoutEffect(() => {
    const place = () => {
      const link = trackRef.current?.querySelector<HTMLElement>(`[data-nav="${active}"]`)
      setPill(link ? { left: link.offsetLeft, width: link.offsetWidth } : null)
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const barClass =
    scrolled || menuOpen ? 'border-white/10 bg-[#090707]/75 backdrop-blur-xl' : 'border-transparent bg-transparent'

  return (
    <header className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-500 ${barClass}`}>
      <nav className="relative flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4" aria-label="Primary">
        <a href="#hero" className="flex items-center gap-2 py-2.5 text-white" aria-label="ADITYA home">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-sm font-semibold tracking-[0.18em]">ADITYA</span>
        </a>

        <div ref={trackRef} className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/25 bg-white/15 px-2 py-2 backdrop-blur-md md:flex">
          <span className="nav-pill" style={pill ? { left: pill.left, width: pill.width, opacity: 1 } : { opacity: 0 }} aria-hidden="true" />
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              data-nav={id}
              aria-current={active === id ? 'true' : undefined}
              className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors lg:px-4 ${
                active === id ? 'text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={newsletter.href}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="magnetic btn-shine hidden rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0b78e3] lg:block"
          >
            Subscribe
          </a>
          <a href="#contact" data-magnetic className="magnetic btn-shine btn-shine-dark rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200">
            Let's Create
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="flex flex-col gap-1 border-t border-white/10 p-3 md:hidden">
          {[...NAV_LINKS.map(({ id, label }) => ({ id, label })), { id: 'contact', label: "Let's Create" }].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href={newsletter.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="rounded-xl px-4 py-3.5 text-base text-[#5aa9f0] transition-colors hover:bg-white/10"
          >
            Subscribe to the newsletter
          </a>
        </div>
      )}
    </header>
  )
}
