# Ritvik Reddy's Portfolio

Personal site built with Next.js 15, Tailwind CSS v4 and TypeScript. Deployed on Vercel.

## Run locally

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## Layout

```
app/
  layout.tsx          fonts, metadata, theme provider, toaster, analytics
  page.tsx            page structure: framed nav + hero, sections, footer
  globals.css         color tokens (light + dark) and shared styles (.display, .label, .btn, ...)
components/
  navigation.tsx      top nav with theme toggle
  expandable-row.tsx  the "+" row used by Experience and Projects
  sections/           one file per page section; content lives at the top of each file
  animations/         agent workflow graph shown in the Deep Research project
  ui/                 shadcn primitives used by the contact form
lib/utils.ts          cn() class helper
public/               headshot, favicon, certification badge
design/               standalone design explorations (not part of the site)
```

## Editing content

- **Now exploring** (hero): `nowTopics` and `nowUpdated` in `components/sections/hero-section.tsx`
- **Experience / Projects / Skills**: the data arrays at the top of each section file
- **Colors**: the `:root` (light) and `:root.dark` blocks in `app/globals.css`
