# Ritvik Reddy's Portfolio

Personal site built with Next.js 15, Tailwind CSS v4 and TypeScript. Deployed on Vercel.

The hero shows one real result at a time beside the name. The Forge project's detail view
holds a playable model of its Raft cluster. See `DESIGN.md` for the idea and the design system.

## Run locally

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## Layout

```
app/
  layout.tsx          fonts, metadata, theme flag script, header, analytics
  page.tsx            page structure: hero, sections, footer
  not-found.tsx       404
  globals.css         color tokens (dark + light) and every style
  sitemap.ts, robots.ts, icon.svg
data/site.ts          ALL content: roles, projects, skills, links
lib/
  cluster.ts          the Forge simulation (canvas)
  motion.ts           smooth scroll, reveals and scroll spy
components/
  results.tsx         the hero card: one result at a time
  sim.tsx             canvas + readout for the Forge simulation
  header.tsx          signature, glass island nav, theme toggle
  entry.tsx           the folding row used by Experience and Projects
  scene.tsx           the small looping picture of what each project does
  sections/           one file per page section
public/               headshot, company logos, certification badge, og.png
design/               standalone design explorations (not part of the site)
```

## Editing content

Everything visible is in `data/site.ts`:

- **Now exploring**: `about.now` (update the date when the list changes)
- **Hero results**: `hero.results` points at entries in `experiences` / `projects` and one of their highlights
- **Karate card**: `about.karate`
- **Experience / Projects / Skills**: `experiences`, `projects`, `skillCategories`
- **Colors**: the `:root` (dark) and `:root.light` blocks in `app/globals.css`
