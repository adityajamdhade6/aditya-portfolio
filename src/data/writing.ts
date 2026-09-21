import posts from './writing.json'

export type Article = { url: string; title: string; description: string; date: string; image: string }
export type LinkedInEmbed = { id: string; src: string; height: number }

/** Emuski blog posts. Refreshed from emuski.com by `npm run sync:writing`; the list lives in writing.sources.json. */
export const articles: Article[] = [...posts].sort((a, b) => b.date.localeCompare(a.date))

/** Public LinkedIn posts, using LinkedIn's own embed URLs. Add another by pasting its "Embed this post" iframe values. */
export const linkedInPosts: LinkedInEmbed[] = [
  { id: 'bsx-2026', src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7504589966690119681?collapsed=1', height: 628 },
  { id: 'post-3', src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7497723299062415360?collapsed=1', height: 551 },
]

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

/** LinkedIn newsletter published under EMUSKI. */
export const newsletter = {
  name: 'Manufacturing Cost Signals',
  description: 'Data-driven perspectives on manufacturing economics, process efficiency, sourcing and production strategy.',
  href: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7499455520618135552',
}
