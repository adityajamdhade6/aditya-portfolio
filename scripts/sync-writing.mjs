// Pulls title, summary, date and cover image for the Emuski blog posts listed in
// src/data/writing.sources.json and writes src/data/writing.json.
// If a page can't be fetched, the previously saved entry is kept so a build never breaks.
import { readFile, writeFile } from 'node:fs/promises'

const SOURCES = new URL('../src/data/writing.sources.json', import.meta.url)
const OUTPUT = new URL('../src/data/writing.json', import.meta.url)
const ORIGIN = 'https://www.emuski.com'

const readJson = async (url, fallback) => {
  try {
    return JSON.parse(await readFile(url, 'utf8'))
  } catch {
    return fallback
  }
}

const findBlogPosting = (html) => {
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1])
      const nodes = Array.isArray(data) ? data : [data]
      const post = nodes.find((node) => node && node['@type'] === 'BlogPosting')
      if (post) return post
    } catch {
      // Not the block we want.
    }
  }
  return null
}

const absolute = (value) => (value && value.startsWith('/') ? `${ORIGIN}${value}` : value)

const { posts } = await readJson(SOURCES, { posts: [] })
const previous = await readJson(OUTPUT, [])
const results = []

for (const url of posts) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (portfolio sync)' } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const post = findBlogPosting(await response.text())
    if (!post) throw new Error('no BlogPosting data found')
    const image = typeof post.image === 'string' ? post.image : post.image?.url
    results.push({
      url,
      title: post.headline,
      description: post.description ?? '',
      date: (post.datePublished ?? '').slice(0, 10),
      image: absolute(image) ?? '',
    })
    console.log(`synced ${url}`)
  } catch (error) {
    const kept = previous.find((entry) => entry.url === url)
    console.warn(`could not sync ${url} (${error.message})${kept ? ', keeping saved copy' : ''}`)
    if (kept) results.push(kept)
  }
}

await writeFile(OUTPUT, `${JSON.stringify(results, null, 2)}\n`)
