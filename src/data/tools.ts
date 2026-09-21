export type Tool = {
  name: string
  /** Full-colour logo in `public/logos`. Omit to fall back to a database icon (SQL has no single brand). */
  logo?: string
}

export const tools: Tool[] = [
  { name: 'Python', logo: 'python' },
  { name: 'SQL' },
  { name: 'Claude Code', logo: 'claude' },
  { name: 'Cursor', logo: 'cursor' },
  { name: 'GitHub', logo: 'github' },
  { name: 'n8n', logo: 'n8n' },
  { name: 'Zapier', logo: 'zapier' },
  { name: 'Shopify', logo: 'shopify' },
  { name: 'Figma', logo: 'figma' },
  { name: 'Notion', logo: 'notion' },
  { name: 'Google Analytics', logo: 'google-analytics' },
  { name: 'Webflow', logo: 'webflow' },
]
