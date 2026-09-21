import { useEffect, useRef, type ElementType } from 'react'

export type HeadingPart = { text: string; accent?: boolean }

type RevealHeadingProps = {
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  parts: HeadingPart[]
}

/**
 * Heading whose words rise out of a mask one after another when it scrolls into view.
 * Accent parts render as <em> so the existing heading styles (serif, wine colour) still apply.
 */
export function RevealHeading({ as = 'h2', className = '', parts }: RevealHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const Tag = as as ElementType

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-in')
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const words = parts.flatMap((part) => part.text.split(' ').filter(Boolean).map((word) => ({ word, accent: Boolean(part.accent) })))
  const label = words.map((entry) => entry.word).join(' ')

  return (
    <Tag ref={ref} className={`reveal-heading ${className}`} aria-label={label}>
      {words.map(({ word, accent }, index) => {
        const inner = (
          <span className="rh-inner" style={{ '--i': index } as React.CSSProperties} aria-hidden="true">
            {word}
          </span>
        )
        return (
          <span key={`${word}-${index}`}>
            {index > 0 && ' '}
            {accent ? <em className="rh-word">{inner}</em> : <span className="rh-word">{inner}</span>}
          </span>
        )
      })}
    </Tag>
  )
}
