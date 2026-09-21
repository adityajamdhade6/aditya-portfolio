import { useEffect } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const REDUCED = '(prefers-reduced-motion: reduce)'
const MAGNET_RADIUS = 90

/**
 * Site-wide micro-interactions, all driven from a few passive listeners:
 * - [data-parallax]  images drift slightly against the scroll
 * - .glow-card       a soft light follows the cursor along the card border (via --mx / --my)
 * - [data-magnetic]  primary buttons lean toward the cursor
 */
export function Interactions() {
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return

    let frame = 0
    const parallax = () => {
      frame = 0
      const viewport = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((image) => {
        const box = (image.parentElement ?? image).getBoundingClientRect()
        if (box.bottom < -100 || box.top > viewport + 100) return
        const progress = (box.top + box.height / 2 - viewport / 2) / viewport
        image.style.translate = `0 ${(-progress * Number(image.dataset.parallax || 14)).toFixed(1)}px`
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(parallax)
    }
    parallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    let cleanupPointer = () => {}
    if (window.matchMedia(FINE_POINTER).matches) {
      const onMove = (event: MouseEvent) => {
        if (!(event.target instanceof Element)) return

        const card = event.target.closest<HTMLElement>('.glow-card')
        if (card) {
          const box = card.getBoundingClientRect()
          card.style.setProperty('--mx', `${event.clientX - box.left}px`)
          card.style.setProperty('--my', `${event.clientY - box.top}px`)
        }

        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((button) => {
          const box = button.getBoundingClientRect()
          const dx = event.clientX - (box.left + box.width / 2)
          const dy = event.clientY - (box.top + box.height / 2)
          const near = Math.abs(dx) < box.width / 2 + MAGNET_RADIUS && Math.abs(dy) < box.height / 2 + MAGNET_RADIUS
          button.style.translate = near ? `${(dx * 0.22).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px` : ''
        })
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      cleanupPointer = () => window.removeEventListener('mousemove', onMove)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cleanupPointer()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
