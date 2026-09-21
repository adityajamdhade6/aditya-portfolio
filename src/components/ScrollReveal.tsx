import { useEffect, useRef, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  /** Stagger in ms, applied as a transition delay. */
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`scroll-reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  )
}
