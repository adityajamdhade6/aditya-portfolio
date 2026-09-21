import { useCallback, useEffect, useState } from 'react'

const PREFIX = '#project-'

const readSlug = () => (window.location.hash.startsWith(PREFIX) ? decodeURIComponent(window.location.hash.slice(PREFIX.length)) : null)

/**
 * Keeps the open project in the URL hash (`#project-founderos`) so a project can be
 * shared, and so the browser back button closes the dialog.
 */
export function useProjectRoute() {
  const [slug, setSlug] = useState<string | null>(readSlug)

  useEffect(() => {
    const sync = () => setSlug(readSlug())
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((next: string) => {
    window.history.pushState({ project: true }, '', `${PREFIX}${next}`)
    setSlug(next)
  }, [])

  // Prev/next inside the dialog replaces the entry, so "back" still closes it in one step.
  const swap = useCallback((next: string) => {
    window.history.replaceState({ project: true }, '', `${PREFIX}${next}`)
    setSlug(next)
  }, [])

  const close = useCallback(() => {
    if (window.history.state?.project) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setSlug(null)
    }
  }, [])

  return { slug, open, swap, close }
}
