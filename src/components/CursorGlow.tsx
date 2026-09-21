import { useEffect, useRef } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/**
 * Soft glow plus a small ring that trail the cursor everywhere except the hero,
 * which has its own spotlight. Desktop pointers only; the ring grows over links and buttons.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const ring = ringRef.current
    if (!glow || !ring || !window.matchMedia(FINE_POINTER).matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = { x: -999, y: -999 }
    const glowPos = { x: -999, y: -999 }
    const ringPos = { x: -999, y: -999 }
    let frame = 0
    let visible = false

    const tick = () => {
      glowPos.x += (target.x - glowPos.x) * 0.12
      glowPos.y += (target.y - glowPos.y) * 0.12
      ringPos.x += (target.x - ringPos.x) * 0.28
      ringPos.y += (target.y - ringPos.y) * 0.28
      glow.style.transform = `translate3d(${glowPos.x - 300}px, ${glowPos.y - 300}px, 0)`
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      const settled = Math.abs(target.x - glowPos.x) < 0.5 && Math.abs(target.y - glowPos.y) < 0.5 && Math.abs(target.x - ringPos.x) < 0.5
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const setVisible = (next: boolean) => {
      if (next === visible) return
      visible = next
      glow.style.opacity = next ? '1' : '0'
      ring.style.opacity = next ? '1' : '0'
    }

    const onMove = (event: MouseEvent) => {
      const el = event.target instanceof Element ? event.target : null
      setVisible(!el?.closest('#hero'))
      ring.dataset.active = el?.closest('a, button, [role="button"]') ? 'true' : 'false'
      target.x = event.clientX
      target.y = event.clientY
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
