const ITEMS = ['AI products', 'Automation', 'D2C growth', 'Brand systems', 'Product design']

/** Slow editorial ticker under the hero. Decorative only, so it is hidden from assistive tech. */
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group">
            {ITEMS.map((item, index) => (
              <li key={item}>
                <span className={index % 2 ? 'marquee-accent' : undefined}>{item}</span>
                <span className="marquee-dot">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
