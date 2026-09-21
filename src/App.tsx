import { CursorGlow } from './components/CursorGlow'
import { Hero } from './components/Hero'
import { Interactions } from './components/Interactions'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { ProjectModal } from './components/ProjectModal'
import { ScrollProgress } from './components/ScrollProgress'
import { projectBySlug } from './data/projects'
import { About } from './sections/About'
import { Collaborate } from './sections/Collaborate'
import { ScrollReveal } from './components/ScrollReveal'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Toolkit } from './sections/Toolkit'
import { Work } from './sections/Work'
import { Writing } from './sections/Writing'
import { useProjectRoute } from './useProjectRoute'

function App() {
  const { slug, open, swap, close } = useProjectRoute()
  const activeProject = slug ? (projectBySlug.get(slug) ?? null) : null

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Interactions />
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Work onOpen={open} />
        <Experience />
        <Writing />
        <Toolkit />
        <Collaborate />
        <Contact />
      </main>
      <footer className="overflow-hidden border-t border-white/10 bg-[#100808] text-white">
        <div className="px-4 pt-16 sm:px-8">
          <ScrollReveal>
            <div className="wordmark" aria-hidden="true">
              ADITYA
            </div>
          </ScrollReveal>
        </div>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-white/10 px-6 py-8 text-xs uppercase tracking-[0.2em] text-white/55 sm:flex-row sm:items-center sm:justify-between md:px-20">
          <p>© {new Date().getFullYear()} Aditya Jamdhade / AI creator &amp; developer</p>
          <a href="#hero" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
      <ProjectModal project={activeProject} onClose={close} onNavigate={swap} />
    </>
  )
}

export default App
