import { CursorGlow } from './components/CursorGlow'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectModal } from './components/ProjectModal'
import { projectBySlug } from './data/projects'
import { About } from './sections/About'
import { Collaborate } from './sections/Collaborate'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Toolkit } from './sections/Toolkit'
import { Work } from './sections/Work'
import { useProjectRoute } from './useProjectRoute'

function App() {
  const { slug, open, swap, close } = useProjectRoute()
  const activeProject = slug ? (projectBySlug.get(slug) ?? null) : null

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <CursorGlow />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work onOpen={open} />
        <Toolkit />
        <Collaborate />
        <Contact />
      </main>
      <footer className="border-t border-white/10 bg-[#160909] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 text-xs uppercase tracking-[0.2em] text-white/55 sm:flex-row sm:items-center sm:justify-between md:px-20">
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
