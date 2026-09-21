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

export function Hero() {
  // Touch devices have no cursor, so skip the effect and its 130 KB image entirely.
  const [hasFinePointer] = useState(() => window.matchMedia(FINE_POINTER).matches)

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
      <img
        src="/images/Base_image.webp"
        alt="Portrait of Aditya Jamdhade"
        className="hero-zoom absolute inset-0 z-10 h-full w-full object-cover object-center"
        fetchPriority="high"
      />
      {hasFinePointer && <RevealLayer image="/images/Reveal_image.webp" radius={SPOTLIGHT_RADIUS} />}

      <div className="absolute left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-start px-5 text-left sm:left-12 md:left-20">
        <h1 className="leading-[0.95] text-white">
          <span className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}>I'm</span>
          <span className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}>ADITYA</span>
        </h1>
        <span className="hero-anim hero-reveal mt-3 font-playfair text-base italic text-white/90 sm:mt-4 sm:text-lg md:text-xl" style={{ letterSpacing: '-0.02em', animationDelay: '0.58s' }}>AI CREATOR &amp; DEVELOPER</span>
      </div>

      <p className="hero-anim hero-fade absolute bottom-14 left-12 z-50 hidden max-w-[260px] text-sm leading-relaxed text-white/80 sm:block md:left-[100px]" style={{ animationDelay: '0.7s' }}>
        AI products, automations and brand systems, from first research to shipped code.
      </p>

      <p className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 max-w-full text-xs leading-relaxed text-white/80 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:text-sm md:right-14" style={{ animationDelay: '0.85s' }}>
        Co-founder of INHAUS Coffee. Applied AI at IIT Jodhpur.
      </p>
    </section>
  )
}
