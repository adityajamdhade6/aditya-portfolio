import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Instagram, Mail, Menu, X } from 'lucide-react'

const SPOTLIGHT_R = 260

type CursorPosition = { x: number; y: number }

type RevealLayerProps = {
  image: string
  radius: number
}

type Project = {
  number: string
  title: string
  category: string
  description: string
  tone: string
  link: string
  narrative?: string
  image?: string
}

const projects: Project[] = [
  { number: '01', title: 'FounderOS: Business Automation Hub', category: 'AI / Shopify / Operations', description: 'AI-driven order reporting and operations workflow automation.', tone: 'project-wine', link: 'https://adityajamdhade.netlify.app/ground/founderos', image: './images/projects/founderos.png', narrative: 'As INHAUS Coffee scaled, data was scattered across Shopify, Razorpay, Shiprocket and manual marketing logs. FounderOS added serverless webhook listeners, normalized everything into PostgreSQL, and computed 28+ metrics including net margin, M1-M6 cohort retention and CAC. Its OpenAI-powered insights engine detected anomalies and sent actionable PDF reports to Slack, cutting manual reporting by 90% and reducing decisions from weeks to minutes. Role: Product Developer. Client: INHAUS Coffee (internal).' },
  { number: '02', title: 'AI Feedback Analyst System', category: 'AI & RAG / Vector Search', description: 'Semantic search and automated PRD generation system.', tone: 'project-ink', link: 'https://adityajamdhade.netlify.app/ground/aianalyst', image: './images/projects/aianalyst.png', narrative: 'The system turns App Store reviews, support tickets, surveys and sales calls into product insight. OpenAI text-embedding-3-small creates 1536-dimensional vectors stored in Pinecone for cosine-similarity search. RAG then clusters complaints and drafts structured PRDs with user friction, design changes and engineering milestones. Role: AI Engineer. Client: IIT Jodhpur project.' },
  { number: '03', title: 'Swiggy Instamart UX & AOV Case Study', category: 'UX Research / Product Strategy', description: 'Product strategy and user research proposing features to boost Average Order Value.', tone: 'project-rust', link: 'https://adityajamdhade.netlify.app/ground/instamart', image: './images/projects/instamart.png', narrative: 'Research with 40 active users showed that generic upsells felt intrusive and disconnected. The proposed Smart Checkout Drawer reads cart context and recommends recipe-based add-ons, such as limes, mint and club soda with white rum. The flow targets high-intent micro-moments and projects a 10-15% lift in average basket size. Role: Solo Researcher. Client: Product Strategy Cohort.' },
  { number: '04', title: 'Understanding Financial Market Dynamics', category: 'Linear Algebra / Python', description: 'A capstone analyzing market shocks across major Indian financial institutions.', tone: 'project-plum', link: 'https://adityajamdhade.netlify.app/ground/financial-market', narrative: 'A 4x4 interbank-loan matrix models shock transmission across SBI, ICICI, HDFC and Axis Bank. NumPy and SciPy eigenvalues identify stability boundaries and critical exposure nodes under changing external shocks. The simulator applies shocks and computes default propagation waves, giving regulators a quantitative framework for systemic-risk policy. Role: Data Analyst / Researcher. Client: FinScoop fictional case study.' },
  { number: '05', title: 'Zomato: Increasing AOV', category: 'Product Strategy / Growth', description: 'Product strategy and features designed to increase Average Order Value.', tone: 'project-charcoal', link: 'https://adityajamdhade.netlify.app/ground/zomatocase', image: './images/projects/zomato-aov.png', narrative: 'This research and strategy case study focuses on increasing order value through behavior-aware product ideas, moving beyond generic discounts and recommendations. It maps high-frequency customer behavior to more relevant discovery and loyalty mechanics.' },
  { number: '06', title: 'Zomato: Increasing Text Reviews', category: 'Product PRD / Speech-to-Text', description: 'Speech-to-text review flows and NLU quality pipelines designed to boost user text reviews.', tone: 'project-wine', link: 'https://adityajamdhade.netlify.app/ground/zomato-text-reviews', image: './images/projects/zomato-reviews.png', narrative: 'A product requirement framework for making reviews easier to write with speech-to-text, while adding NLU quality-control loops to improve the usefulness of review data in the food-delivery vertical.' },
  { number: '07', title: 'MedAgent AI: Healthcare Sales Framework', category: 'AI Agents / Healthcare B2B', description: 'POC-to-contract framework and objection-handling protocol de-risking enterprise contracts.', tone: 'project-ink', link: 'https://adityajamdhade.netlify.app/ground/medagent', image: './images/projects/aianalyst.png', narrative: 'A proof-first GTM playbook for a patient-engagement platform. A read-only, 30-day pilot processes anonymous patient logs and tracks reminders, follow-ups and satisfaction. Pricing is tied to measurable outcomes such as a 25% reduction in no-shows. Role: Product & Sales Lead. Client: Healthcare Partner.' },
  { number: '08', title: 'Vantage AI: Manufacturing GTM Strategy', category: 'Go-To-Market / B2B SaaS', description: 'Proof-first GTM strategy and marketing funnel optimizing AI adoption for manufacturing ICPs.', tone: 'project-rust', link: 'https://adityajamdhade.netlify.app/ground/vantage', image: './images/projects/vantage.png', narrative: 'A manufacturing adoption playbook built around a low-cost 14-day validation phase using non-invasive sensors, followed by a 90-day pilot tied to metrics such as 15% less unscheduled downtime. Role: Growth Lead. Client: Vantage AI.' },
  { number: '09', title: 'AI GreenScan: Eco-Classification App', category: 'AI Product / Computer Vision', description: 'Award-winning product strategy and recommendation engine classifying 20+ materials for sustainable disposal.', tone: 'project-plum', link: 'https://adityajamdhade.netlify.app/ground/greenscan', image: './images/projects/founderos.png', narrative: 'A first-place AI product strategy project that classifies more than 20 material types for sustainable disposal and recommends the right action. The concept joins computer vision with an approachable disposal experience so users can make better choices without knowing recycling rules.' },
  { number: '10', title: 'Porter: Driver Retention Strategy', category: 'Marketplace Ops / Data Strategy', description: 'ML-driven demand positioning and retention strategy optimizing driver earnings on a 38K marketplace.', tone: 'project-charcoal', link: 'https://adityajamdhade.netlify.app/ground/porter', image: './images/projects/porter.png', narrative: 'A marketplace retention strategy for a 38K driver network. Demand positioning and data-led interventions were designed to make earnings more predictable, improve driver retention and connect marketplace operations to the driver experience.' },
  { number: '11', title: 'MESA Hackathon: AI Wedding Planner', category: 'AI Matching / Product Design', description: 'Intelligent venue-matching platform designed and shipped in 24 hours.', tone: 'project-wine', link: 'https://adityajamdhade.netlify.app/ground/hackathon25', image: './images/projects/hackathon.jpg', narrative: 'An intelligent venue-matching platform and recommendation engine designed and shipped in 24 hours during the MESA hackathon. The rapid prototype translated wedding preferences into useful venue recommendations under a strict time constraint.' },
  { number: '12', title: 'Nurture: A Plant Care Companion', category: 'UI/UX Design / Mobile App', description: 'End-to-end plant care app design with research, personas, IA and 25+ high-fidelity screens.', tone: 'project-ink', link: 'https://adityajamdhade.netlify.app/ground/nurture', image: './images/projects/nurture.png', narrative: 'An end-to-end plant wellness app project covering user research, personas, information architecture and 25+ high-fidelity screens. The experience turns plant-care routines into a clearer, more supportive companion for everyday use.' },
  { number: '13', title: 'INHAUS Coffee: Brand Launch & D2C Growth', category: 'Co-Founder / Growth Marketing', description: 'Co-founded and scaled a D2C coffee brand from 0 to 1.', tone: 'project-rust', link: 'https://adityajamdhade.netlify.app/ground/inhaus', image: './images/projects/inhaus.png', narrative: 'Co-founded a premium coffee concentrate brand and took it from 0 to 1. The work covered product strategy, GTM, subscription setup, growth funnel automation, email marketing and the storefront needed to turn a product idea into a D2C business.' },
  { number: '14', title: 'Zupper: B2B Marketplace UI/UX Design', category: 'B2B SaaS / Mobile App', description: 'Onboarding, marketplace auctions, Store+ and BNPL financing screens.', tone: 'project-plum', link: 'https://adityajamdhade.netlify.app/ground/zupper', image: './images/projects/zupper.jpg', narrative: 'End-to-end B2B marketplace flows for India\'s MSME retailers, including onboarding, marketplace auctions, Store+ and BNPL financing. The work covered 45+ screens, user journeys and developer handoffs for a multi-commerce app.' },
  { number: '15', title: 'Simple Threads Business & Campaign Analysis', category: 'Data Analytics / Excel', description: 'Analytics report and campaign ROI audits for retail fashion collections.', tone: 'project-charcoal', link: 'https://adityajamdhade.netlify.app/ground/simple-threads', narrative: 'An Excel analytics report for retail fashion collections, auditing campaign ROI and turning sales and marketing data into business strategy recommendations.' },
  { number: '16', title: 'Gold Price Prediction Model', category: 'Python / Machine Learning', description: 'Linear Regression forecasting model in Python with 99.97% accuracy.', tone: 'project-wine', link: 'https://adityajamdhade.netlify.app/ground/gold-prediction', narrative: 'A Python Linear Regression model for forecasting gold prices, reaching 99.97% reported accuracy and demonstrating a complete machine-learning workflow from data preparation through prediction.' },
  { number: '17', title: 'Titanic Survival Prediction Model', category: 'Python / Classification', description: 'Logistic Regression model predicting passenger survival probabilities.', tone: 'project-ink', link: 'https://adityajamdhade.netlify.app/ground/titanic-prediction', narrative: 'A Logistic Regression classification model that uses passenger data to estimate survival probabilities, turning a familiar dataset into a clear study of feature-based prediction.' },
  { number: '18', title: 'Streamverse ETL Watch History Pipeline', category: 'Data Engineering / ETL', description: 'Python data engineering pipeline for ingesting and normalizing watch logs.', tone: 'project-rust', link: 'https://adityajamdhade.netlify.app/ground/streamverse-etl', narrative: 'A Python ETL pipeline for ingesting watch-history logs, normalizing inconsistent records and preparing reliable data for downstream analysis.' },
  { number: '19', title: 'City Open - Tennis Event Poster', category: 'Visual Archive / Canva / Typography', description: 'Sports event poster using clean layout, typography and motion tilt.', tone: 'project-plum', link: 'https://adityajamdhade.netlify.app/play', image: './images/graphic-design/city-open.png', narrative: 'A sports event poster built in Canva around clean layout, typography and a motion-tilt treatment.' },
  { number: '20', title: 'Retro Rides - Classic Car Show', category: 'Visual Archive / Retro / Grain', description: 'Vintage advertising poster inspired by 90s American retro aesthetics.', tone: 'project-charcoal', link: 'https://adityajamdhade.netlify.app/play', image: './images/graphic-design/retro-rides.png', narrative: 'A vintage advertising poster inspired by 90s American retro aesthetics, using grain texture and a classic-car visual language.' },
  { number: '21', title: 'SoulStretch: Yoga & Wellness', category: 'Visual Archive / Figma / Branding', description: 'Instagram social posts promoting mindfulness through earthy visuals.', tone: 'project-wine', link: 'https://adityajamdhade.netlify.app/play', image: './images/graphic-design/soulstretch.png', narrative: 'A Figma branding and social-content system for yoga and wellness, using earthy visuals to promote mindfulness across Instagram posts.' },
  { number: '22', title: 'Velvoria Cupcake Delight Poster', category: 'Visual Archive / Canva / Food Advertising', description: 'Premium food product advertising poster highlighting consumer indulgence.', tone: 'project-rust', link: 'https://adityajamdhade.netlify.app/play', image: './images/graphic-design/velvoria.png', narrative: 'A Canva Pro food-advertising poster designed to make a premium cupcake product feel indulgent and desirable.' },
]

const productProjectNumbers = new Set(['01', '02', '03', '07', '08', '09', '10', '12', '13', '14'])
const graphicProjectNumbers = new Set(['19', '20', '21', '22'])
const experimentProjectNumbers = new Set(['05', '06', '11'])
const productProjects = projects.filter((project) => productProjectNumbers.has(project.number))
const graphicProjects = projects.filter((project) => graphicProjectNumbers.has(project.number))
const experimentProjects = projects.filter((project) => experimentProjectNumbers.has(project.number))

function projectCardStyle(project: Project): React.CSSProperties | undefined {
  if (!project.image) return undefined
  const isPoster = Number(project.number) >= 19
  return {
    backgroundImage: `linear-gradient(180deg, rgb(0 0 0 / 0.05), rgb(0 0 0 / 0.82)), url(${project.image})`,
    backgroundSize: isPoster ? '100% 100%, contain' : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = revealRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.14 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <div ref={revealRef} className={`scroll-reveal ${className}`}>{children}</div>
}

function RevealLayer({ image, radius }: RevealLayerProps) {
  const revealRef = useRef<HTMLDivElement>(null)
  const mouse = useRef<CursorPosition>({ x: -999, y: -999 })
  const smooth = useRef<CursorPosition>({ x: -999, y: -999 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY }
    }

    const reveal = revealRef.current
    if (!reveal) return

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      reveal.style.setProperty('--spotlight-x', `${smooth.current.x}px`)
      reveal.style.setProperty('--spotlight-y', `${smooth.current.y}px`)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={revealRef}
      className="spotlight-reveal absolute inset-0 z-30 pointer-events-none bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${image})`, '--spotlight-radius': `${radius}px` } as React.CSSProperties}
      aria-hidden="true"
    />
  )
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  const selectProject = (project: Project) => {
    setSelectedProject(project)
    window.setTimeout(() => {
      const detail = detailRef.current
      if (!detail) return
      const top = detail.getBoundingClientRect().top + window.scrollY - 104
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        <a href="#hero" className="flex items-center gap-2 text-white" aria-label="ADITYA home">
          <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" aria-hidden="true">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-sm font-semibold tracking-[0.18em]">ADITYA</span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/20 px-2 py-2 backdrop-blur-md md:flex">
          <a href="#about" className="rounded-full px-4 py-1.5 text-sm font-medium text-white">About</a>
          <a href="#portfolio" className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">Portfolio</a>
          <a href="#collaborate" className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">Collaborate</a>
        </div>

        <a href="#contact" className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 md:block">Let's Create</a>
        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-full border border-white/25 bg-white/15 p-2 text-white backdrop-blur-md md:hidden" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
          {mobileMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
        {mobileMenuOpen && (
          <div className="absolute left-4 right-4 top-16 flex flex-col gap-1 rounded-2xl border border-white/20 bg-black/75 p-2 text-white shadow-2xl backdrop-blur-xl md:hidden">
            {[
              ['About', '#about'],
              ['Portfolio', '#portfolio'],
              ['Collaborate', '#collaborate'],
              ["Let's Create", '#contact'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/80 transition-colors hover:bg-white/15 hover:text-white">{label}</a>
            ))}
          </div>
        )}
      </nav>

      <section id="hero" className="relative h-screen w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
        <div className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('./images/Base_image.png')" }} />
        <RevealLayer image="./images/Reveal_image.png" radius={SPOTLIGHT_R} />

        <div className="absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-start px-5 text-left" style={{ left: '80px' }}>
          <h1 className="leading-[0.95] text-white">
            <span className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}>I'm</span>
            <span className="hero-anim hero-reveal -mt-1 block text-5xl font-normal sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}>ADITYA</span>
          </h1>
          <span className="hero-anim hero-reveal mt-3 font-playfair text-base italic text-white/90 sm:mt-4 sm:text-lg md:text-xl" style={{ letterSpacing: '-0.02em', animationDelay: '0.58s' }}>AI CREATOR &amp; DEVELOPER</span>
        </div>

        <div className="hero-anim hero-fade absolute bottom-14 z-50 hidden max-w-[260px] sm:block" style={{ left: '100px', animationDelay: '0.7s' }}>
          <p className="text-sm leading-relaxed text-white/80">I create content with authenticity and creativity...</p>
        </div>

        <div className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[260px] sm:gap-5 md:right-14" style={{ animationDelay: '0.85s' }}>
          <p className="text-xs leading-relaxed text-white/80 sm:text-sm">Content creator who turns ideas into engaging stories...</p>
        </div>
      </section>

      <section id="about" className="portfolio-section bg-[#090707] text-white">
        <div className="section-shell grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <ScrollReveal className="section-kicker">
            <span className="eyebrow">01 / About</span>
            <span className="mt-5 block h-px w-14 bg-[#a33f43]" />
          </ScrollReveal>
          <ScrollReveal className="max-w-5xl">
            <h2 className="display-heading">Product thinker and AI builder turning ideas into <em>intelligent, engaging</em> and useful digital experiences.</h2>
            <div className="mt-12 grid gap-8 border-t border-white/15 pt-7 text-sm leading-7 text-white/60 md:grid-cols-2 md:gap-16">
              <p>Co-Founder of INHAUS Coffee and Growth Intern at Inventive AI (YC), working across data analytics, GTM loops and the interfaces in between.</p>
              <p>ADITYA leads product work end-to-end: research, information architecture, interaction design, systems and build. The goal is simple: design for people, not pages.</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-7 text-xs uppercase tracking-[0.16em] text-white/45 sm:grid-cols-4">
              <div><strong className="block font-normal text-2xl tracking-[-0.04em] text-white">2+</strong>years shipping product</div>
              <div><strong className="block font-normal text-2xl tracking-[-0.04em] text-white">12+</strong>case studies</div>
              <div><strong className="block font-normal text-2xl tracking-[-0.04em] text-white">4,000+</strong>research calls</div>
              <div><strong className="block font-normal text-2xl tracking-[-0.04em] text-white">0</strong>ego in the room</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="portfolio" className="portfolio-section bg-[#100909] text-white">
        <div className="section-shell">
          <ScrollReveal className="mb-20 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">02 / Selected work</span>
              <h2 className="section-heading mt-5">Made for the <em>in-between.</em></h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/55">A growing archive of experiments, systems and stories built with a future-facing point of view.</p>
          </ScrollReveal>

          {selectedProject && (
            <div ref={detailRef} className={`project-detail ${selectedProject.tone} mb-8`} aria-labelledby="project-detail-title">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/55">Project {selectedProject.number}</span>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-white/60">{selectedProject.category}</p>
                </div>
                <button type="button" onClick={() => setSelectedProject(null)} className="rounded-full border border-white/25 p-2 text-white/75 transition-colors hover:bg-white/15 hover:text-white" aria-label="Close project details">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>
              <h3 id="project-detail-title" className="mt-16 max-w-4xl font-playfair text-4xl italic leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">{selectedProject.title}</h3>
              <div className={`mt-10 grid gap-8 border-t border-white/20 pt-7 ${selectedProject.image ? 'md:grid-cols-[0.8fr_1.2fr]' : 'md:grid-cols-[0.7fr_1.3fr]'}`}>
                {selectedProject.image && (
                  <figure>
                    <img src={selectedProject.image} alt={selectedProject.title} className="project-detail-image" />
                    <figcaption className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/45">{Number(selectedProject.number) >= 19 ? 'Full poster view' : 'Project preview'} / {selectedProject.category}</figcaption>
                  </figure>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Project brief</p>
                  <p className="mt-4 text-sm leading-7 text-white/75">{selectedProject.description}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">Case study information</p>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-white/80 sm:text-lg">{selectedProject.narrative ?? selectedProject.description}</p>
                </div>
              </div>
            </div>
          )}

          <div className="portfolio-grid">
            {productProjects.map((project, index) => (
              <ScrollReveal key={project.number} className={`project-tile ${index === 0 ? 'md:col-span-2' : ''}`}>
                <button type="button" onClick={() => selectProject(project)} className={`project-art ${project.tone} w-full text-left`} style={projectCardStyle(project)} aria-label={`View details for ${project.title}`}>
                  <div className="flex items-start justify-between text-xs tracking-[0.16em] text-white/55">
                    <span>{project.number}</span>
                    <ArrowUpRight size={18} strokeWidth={1.4} />
                  </div>
                  <div className="mt-auto">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/55">{project.category}</p>
                    <h3 className="font-playfair text-3xl italic tracking-[-0.04em] sm:text-4xl">{project.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{project.description}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-32 mb-12 flex flex-col justify-between gap-7 border-t border-white/15 pt-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">03 / Graphic design</span>
              <h3 className="section-heading mt-5 text-5xl sm:text-7xl">The <em>visual</em> archive.</h3>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/55">Posters, type, branding and visual experiments from the creative side of the practice.</p>
          </ScrollReveal>

          <div className="portfolio-grid">
            {graphicProjects.map((project) => (
              <ScrollReveal key={project.number} className="project-tile">
                <button type="button" onClick={() => selectProject(project)} className={`project-art ${project.tone} w-full text-left`} style={projectCardStyle(project)} aria-label={`View details for ${project.title}`}>
                  <div className="flex items-start justify-between text-xs tracking-[0.16em] text-white/55">
                    <span>{project.number}</span>
                    <ArrowUpRight size={18} strokeWidth={1.4} />
                  </div>
                  <div className="mt-auto">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/55">{project.category}</p>
                    <h3 className="font-playfair text-3xl italic tracking-[-0.04em] sm:text-4xl">{project.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{project.description}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-32 mb-12 flex flex-col justify-between gap-7 border-t border-white/15 pt-8 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">04 / Experiments</span>
              <h3 className="section-heading mt-5 text-5xl sm:text-7xl">The <em>side quests.</em></h3>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/55">Smaller product explorations and visual studies, kept separate from the main case-study work.</p>
          </ScrollReveal>

          <div className="portfolio-grid">
            {experimentProjects.map((project) => (
              <ScrollReveal key={project.number} className="project-tile">
                <button type="button" onClick={() => selectProject(project)} className={`project-art ${project.tone} w-full text-left`} style={projectCardStyle(project)} aria-label={`View details for ${project.title}`}>
                  <div className="flex items-start justify-between text-xs tracking-[0.16em] text-white/55">
                    <span>{project.number}</span>
                    <ArrowUpRight size={18} strokeWidth={1.4} />
                  </div>
                  <div className="mt-auto">
                    <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/55">{project.category}</p>
                    <h3 className="font-playfair text-3xl italic tracking-[-0.04em] sm:text-4xl">{project.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">{project.description}</p>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      <section id="collaborate" className="portfolio-section bg-[#0a0707] text-white">
        <div className="section-shell grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <ScrollReveal>
            <span className="eyebrow">03 / Collaborate</span>
            <h2 className="section-heading mt-5">Bring the <em>unusual</em> idea.</h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mb-10 max-w-lg text-lg leading-8 text-white/65">I collaborate with people who want to build with curiosity, clarity and a little more imagination.</p>
            <div className="border-t border-white/15">
              {['AI Development', 'AI Automation', 'Creative AI', 'Web Experiences', 'Content & Visual Creation', 'Digital Product Ideas'].map((service, index) => (
                <div key={service} className="service-row group flex items-center justify-between border-b border-white/15 py-5 text-lg text-white/80 transition-colors hover:text-white sm:text-2xl">
                  <span><span className="mr-5 text-xs text-[#a33f43]">0{index + 1}</span>{service}</span>
                  <ArrowUpRight className="text-white/35 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={20} strokeWidth={1.4} />
                </div>
              ))}
            </div>
            <div className="mt-16 grid gap-6 border-t border-white/15 pt-6 sm:grid-cols-5">
              {[
                ['01', 'Listen', 'User interviews, surveys and competitive audits.'],
                ['02', 'Structure', 'Information architecture, flows and sketches.'],
                ['03', 'Design', 'High-fidelity wireframes and prototypes in Figma.'],
                ['04', 'Build', 'Working in the repo, validating logic and responsiveness.'],
                ['05', 'Refine', 'Post-launch reviews, analytics and usability logs.'],
              ].map(([number, title, description]) => (
                <div key={number}>
                  <span className="text-xs text-[#a33f43]">{number} / 05</span>
                  <h3 className="mt-4 text-lg text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">{description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="contact" className="portfolio-section contact-section bg-[#160909] text-white">
        <div className="section-shell">
          <ScrollReveal>
            <span className="eyebrow">04 / Contact</span>
            <h2 className="contact-heading mt-8">Let's Create <em>Something.</em></h2>
          </ScrollReveal>
          <ScrollReveal className="mt-20 grid gap-10 border-t border-white/20 pt-7 sm:grid-cols-2">
            <a href="mailto:aditichora2003@gmail.com" className="contact-link group">
              <span className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50"><Mail size={15} /> Email</span>
              <span className="mt-4 block text-base text-white/85 transition-colors group-hover:text-white sm:text-lg">aditichora2003@gmail.com</span>
            </a>
            <div className="contact-link">
              <span className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50"><Instagram size={15} /> Elsewhere</span>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-base text-white/85 sm:text-lg">
                <a href="https://www.instagram.com/_adiiiii_09" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Instagram</a>
                <a href="https://github.com/adityajamdhade6" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
                <a href="https://www.linkedin.com/in/adityajamdhade" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">LinkedIn</a>
                <a href="https://www.behance.net/adityajamdhade6" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">Behance</a>
              </div>
            </div>
          </ScrollReveal>
          <p className="mt-8 text-sm text-white/45">Additional contact: <a href="mailto:adityajamdhade6@gmail.com" className="text-white/75 hover:text-white">adityajamdhade6@gmail.com</a></p>
          <p className="mt-28 text-xs uppercase tracking-[0.2em] text-white/35">ADITYA / AI creator &amp; developer</p>
        </div>
      </section>
    </main>
  )
}

export default App
