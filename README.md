# Aditya Jamdhade — Portfolio

Single-page portfolio built with Vite, React 19, TypeScript and Tailwind CSS v4.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run lint
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/projects.ts` | Every project. Add or edit work here; the page renders from it. |
| `src/data/site.ts` | Email, social links, services and process steps. |
| `src/sections/` | Page sections: About, Work, Collaborate, Contact. |
| `src/components/` | Nav, Hero (spotlight effect), project cards, cover art and the detail dialog. |
| `public/images/` | Hero photos, project screenshots (`projects/`) and posters (`graphic-design/`), all `.webp`. |

## Adding a project

Add an entry to `projects` in `src/data/projects.ts`:

- `group` decides where it appears: `product` (case studies), `graphic` (poster wall), `experiment`, or `archive` (text-only list).
- `image` is optional. Screenshots are framed automatically on a `tone` backdrop; posters are shown as-is.
  Without an image the card uses typographic cover art built from `metric` (and an optional `art` icon).
- `metric` is one headline number shown on the card and in the detail dialog.
- The `slug` becomes the shareable URL: `/#project-<slug>`.

## Images

Export screenshots at about 1400px wide and posters at about 1200px wide, then convert to WebP:

```bash
cwebp -q 80 input.png -o public/images/projects/name.webp
```
