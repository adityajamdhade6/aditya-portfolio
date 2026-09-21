import { useEffect, useRef, useState, type CSSProperties } from 'react'

const SPOTLIGHT_RADIUS = 260
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Mouse-follow spotlight that reveals the second image.
 * Coordinates are taken relative to this layer (not the viewport) so it stays
 * under the cursor while the hero scrolls, and the animation frame loop only
 * runs while the spotlight is still catching up to the cursor.
 */
function RevealLayer({ image, radius }: { image: string; radius: number }) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveal = revealRef.current
    if (!reveal) return

    const pointer = { x: 0, y: 0, seen: false }
    const target = { x: -999, y: -999 }
    const current = { x: -999, y: -999 }
    let frame = 0

    const tick = () => {
      current.x += (target.x - current.x) * 0.1
      current.y += (target.y - current.y) * 0.1
      reveal.style.setProperty('--spotlight-x', `${current.x}px`)
      reveal.style.setProperty('--spotlight-y', `${current.y}px`)

      const settled = Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const retarget = () => {
      if (!pointer.seen) return
      const rect = reveal.getBoundingClientRect()
      if (rect.bottom < 0) return
      target.x = pointer.x - rect.left
      target.y = pointer.y - rect.top
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (event: MouseEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.seen = true
      retarget()
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', retarget, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', retarget)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={revealRef}
      className="spotlight-reveal pointer-events-none absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image})`, '--spotlight-radius': `${radius}px` } as CSSProperties}
      aria-hidden="true"
    />
  )
}

/**
 * Touch version of the spotlight: it follows a finger dragged over the photo and drifts away shortly after
 * release. A short automatic sweep on load shows there is something to find. Scrolling is never blocked
 * because the listeners are passive.
 */
function TouchReveal({ image }: { image: string }) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reveal = revealRef.current
    if (!reveal) return

    const target = { x: -999, y: -999 }
    const current = { x: -999, y: -999 }
    let frame = 0
    let releaseTimer = 0
    const timers: number[] = []

    const tick = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      reveal.style.setProperty('--spotlight-x', `${current.x}px`)
      reveal.style.setProperty('--spotlight-y', `${current.y}px`)
      const settled = Math.abs(target.x - current.x) < 0.5 && Math.abs(target.y - current.y) < 0.5
      frame = settled ? 0 : requestAnimationFrame(tick)
    }
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const moveTo = (x: number, y: number) => {
      target.x = x
      target.y = y
      wake()
    }

    const rect = () => reveal.getBoundingClientRect()
    reveal.style.setProperty('--spotlight-radius', `${Math.min(SPOTLIGHT_RADIUS, rect().width * 0.3)}px`)

    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      const box = rect()
      const inside = touch.clientY >= box.top && touch.clientY <= box.bottom && touch.clientX >= box.left && touch.clientX <= box.right
      if (!inside) return
      window.clearTimeout(releaseTimer)
      timers.forEach(window.clearTimeout)
      moveTo(touch.clientX - box.left, touch.clientY - box.top)
    }
    const onEnd = () => {
      window.clearTimeout(releaseTimer)
      releaseTimer = window.setTimeout(() => moveTo(-999, -999), 1200)
    }

    // Intro sweep across the face so people notice the effect.
    const { width, height } = rect()
    const path: [number, number][] = [
      [width * 0.4, height * 0.35],
      [width * 0.6, height * 0.35],
      [width * 0.5, height * 0.55],
    ]
    path.forEach(([x, y], index) => timers.push(window.setTimeout(() => moveTo(x, y), 1400 + index * 650)))
    timers.push(window.setTimeout(() => moveTo(-999, -999), 1400 + path.length * 650 + 300))

    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onEnd)
      timers.forEach(window.clearTimeout)
      window.clearTimeout(releaseTimer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={revealRef}
      className="spotlight-reveal pointer-events-none absolute inset-x-0 top-0 z-30 aspect-video bg-cover bg-center bg-no-repeat sm:inset-0 sm:aspect-auto"
      style={{ backgroundImage: `url(${image})` }}
      aria-hidden="true"
    />
  )
}

export function Hero() {
  // Mouse devices follow the cursor; touch devices follow a finger (see TouchReveal).
  const [hasFinePointer] = useState(() => window.matchMedia(FINE_POINTER).matches)

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-black sm:h-dvh">
      {/* Phones show the whole landscape photo with the text underneath; from sm up it fills the screen. */}
      <img
        src="/images/Base_image.webp"
        alt="Portrait of Aditya Jamdhade"
        className="hero-zoom relative z-10 block aspect-video w-full object-cover sm:absolute sm:inset-0 sm:aspect-auto sm:h-full sm:object-center"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-x-0 top-[calc(100vw*9/16-4rem)] z-[35] h-16 bg-gradient-to-b from-transparent to-black sm:hidden" aria-hidden="true" />
      {hasFinePointer ? <RevealLayer image="/images/Reveal_image.webp" radius={SPOTLIGHT_RADIUS} /> : <TouchReveal image="/images/Reveal_image.webp" />}

      <div className="relative z-50 flex flex-col items-start px-5 pt-2 text-left sm:absolute sm:left-12 sm:top-1/2 sm:-translate-y-1/2 sm:pt-0 md:left-20">
        <h1 className="leading-[0.95] text-white">
          <span className="hero-anim hero-reveal block font-playfair text-6xl font-normal italic sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}>I'm</span>
          <span className="hero-anim hero-reveal -mt-1 block text-6xl font-normal sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}>ADITYA</span>
        </h1>
        <span className="hero-anim hero-reveal mt-3 font-playfair text-lg italic text-white/90 sm:mt-4 md:text-xl" style={{ letterSpacing: '-0.02em', animationDelay: '0.58s' }}>AI CREATOR &amp; DEVELOPER</span>
      </div>

      <p className="hero-anim hero-fade relative z-50 mt-6 max-w-[21rem] px-5 text-sm leading-relaxed text-white/80 sm:absolute sm:bottom-14 sm:left-12 sm:mt-0 sm:max-w-[17rem] sm:px-0 md:left-[100px]" style={{ animationDelay: '0.7s' }}>
        I build AI-powered products and brands. Obsessed with systems, growth and work that actually ships.
      </p>

      <div className="hero-anim hero-fade relative z-50 mt-6 px-5 sm:absolute sm:bottom-14 sm:left-auto sm:right-10 sm:mt-0 sm:max-w-[19rem] sm:px-0 md:right-14" style={{ animationDelay: '0.85s' }}>
        <p className="font-playfair text-xl italic leading-snug text-white/90 sm:whitespace-nowrap sm:text-2xl sm:text-right" style={{ letterSpacing: '-0.02em' }}>
          Co-founder of <span className="not-italic font-sans font-semibold tracking-[0.02em] text-white">INHAUS</span> Coffee.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/75 sm:text-right">
          Building with AI every day, from the first idea to the first customer.
        </p>
      </div>

      <div className="hero-anim hero-fade relative z-50 mt-8 flex gap-3 px-5 pb-12 sm:hidden" style={{ animationDelay: '1s' }}>
        <a href="#portfolio" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-gray-900">
          View my work
        </a>
        <a href="#contact" className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/30 px-5 text-sm text-white">
          Get in touch
        </a>
      </div>

      <a
        href="#about"
        className="hero-anim hero-fade absolute bottom-6 left-1/2 z-50 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/70 transition-colors hover:text-white sm:flex"
        style={{ animationDelay: '1.1s' }}
        aria-label="Scroll to About"
      >
        Scroll
        <span className="block h-8 w-px animate-pulse bg-white/60" aria-hidden="true" />
      </a>
    </section>
  )
}
