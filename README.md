# Ritvik Reddy's Portfolio

Personal site built with Next.js 15, Tailwind CSS v4 and TypeScript. Deployed on Vercel.

The hero runs a small simulation of two of the projects: a Raft cluster (Forge) that turns into a
three-agent pipeline (DeltaLedger MCP) as you scroll. Any node can be taken down. See `DESIGN.md`
for the idea and the design system.

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
  page.tsx            page structure: hero, sections, footer, scroll rail
  not-found.tsx       404
  globals.css         color tokens (dark + light) and every style
  sitemap.ts, robots.ts, icon.svg
data/site.ts          ALL content: roles, projects, skills, links
lib/
  cluster.ts          the hero simulation (canvas)
  driver.ts           the one scroll value the hero reads
  motion.ts           smooth scroll, reveals, header and rail behavior
components/
  cluster.tsx         canvas + readout for the simulation
  header.tsx          signature, nav, theme toggle, mobile menu
  entry.tsx           the folding row used by Experience and Projects
  glyph.tsx           the small topology drawing for each project
  sections/           one file per page section
public/               headshot, certification badge, og.png
design/               standalone design explorations (not part of the site)
```

## Editing content

Everything visible is in `data/site.ts`:

- **Now exploring**: `about.now` (update the date when the list changes)
- **Experience / Projects / Skills**: `experiences`, `projects`, `skillCategories`
- **Colors**: the `:root` (dark) and `:root.light` blocks in `app/globals.css`
