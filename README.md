# Ritvik Reddy's Portfolio

Personal site built with Next.js 15, Tailwind CSS v4 and TypeScript. Deployed on Vercel.

The hero answers questions about the site's own content: real BM25 retrieval in the browser, a rule
that keeps or drops each passage, and a quoted answer with citations. The Forge project's detail view
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
  page.tsx            page structure: hero, sections, footer, belt progress bar
  not-found.tsx       404
  globals.css         color tokens (dark + light) and every style
  sitemap.ts, robots.ts, icon.svg
data/site.ts          ALL content: roles, projects, skills, links
lib/
  ask.ts              the hero's retrieval, judge rule and eval over data/site.ts
  cluster.ts          the Forge simulation (canvas)
  motion.ts           smooth scroll, reveals, scroll spy and the belt
components/
  ask.tsx             the hero panel: question, passages, verdict, answer
  sim.tsx             canvas + readout for the Forge simulation
  header.tsx          signature, glass island nav, theme toggle
  belt.tsx            reading progress, white belt to black
  entry.tsx           the folding row used by Experience and Projects
  glyph.tsx           the small topology drawing for each project
  sections/           one file per page section
public/               headshot, company logos, certification badge, og.png
design/               standalone design explorations (not part of the site)
```

## Editing content

Everything visible is in `data/site.ts`:

- **Now exploring**: `about.now` (update the date when the list changes)
- **Hero questions**: `hero.questions`; each has the source expected to rank first, so they double as a test
- **Karate card**: `about.karate`
- **Experience / Projects / Skills**: `experiences`, `projects`, `skillCategories`
- **Colors**: the `:root` (dark) and `:root.light` blocks in `app/globals.css`
