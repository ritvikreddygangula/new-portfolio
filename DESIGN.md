# Design notes

Written before the build and kept so later changes stay consistent.

## Brief

- **Subject:** Ritvik Reddy Gangula, software engineer, CS at Arizona State (May 2027).
- **Audience:** recruiters and engineers.
- **Job of the site:** get hired. A recruiter should find role, results and resume in seconds; an engineer should find something worth poking.
- **Constraints:** Next.js 15, Tailwind v4, TypeScript, Vercel. Every role, project, metric and link is copied verbatim from the previous site into `data/site.ts`. Nothing is invented. Dark by default with a light mode. One signature moment, everything else quiet.
- **Stack:** the existing Next.js app, plus GSAP and Lenis. Canvas 2D for the hero (no WebGL: 30 nodes do not need a GPU, and it keeps the page light).

## Concepts considered

| | Idea | Anchor | Originality / Fit / Feasible / Portable (lower is better) |
|---|---|---|---|
| A. Material | The hero is a running model of his own systems. You can take nodes down and it recovers. | Forge: 3 Raft coordinators, 25 workers, leader failover, no acknowledged job lost. DeltaLedger: aligner, classifier, verifier. His own line: "systems that stay up when parts of them fail". | 4 / 5 / 4 / 1 |
| B. Process | The page is one request: each section is a hop, and a latency budget ticks down as you scroll. | His work on retrieval latency and tracing. | 3 / 4 / 4 / 3 |
| C. Formal | Everything is a log line: the whole site is one monospace stream you scroll through. | Observability work. | 2 / 3 / 5 / 4 |

**Picked A.** It only works for someone who built these two systems, and it turns his headline claim into something a visitor can test with one click. Borrowed from B for the page rail: a packet that travels the page with a stop per section.

## Concept card

```
Idea:        The site runs a small copy of the systems he built. Break it and watch it recover.
Metaphor:    A cluster and the agents on top of it: nodes, edges, packets, failures, elections.
Signature:   Hero canvas. A Raft cluster (Forge) passes jobs; take any node down and jobs are
             re-queued, a leader is elected, writes are held without quorum. Scrolling through
             the hero moves the same 30 nodes into DeltaLedger's three-agent pipeline.
Emotion:     "Wait, this is live." Precise, calm, confident.
Motion verb: Route. Things travel along a path and land on a node.
Screenshot:  The cluster mid-failover: one coordinator dashed red, a new leader pulsing, the name beside it.
```

The simulation is a model, and says so ("Modeled on Forge"). It shows no measured numbers. Elections take about half a second on screen so they can be seen.

### The driver

`lib/driver.ts` holds one number, `p` (0 = infrastructure, 1 = agents), written by scroll through the hero. It drives the node layout and behavior, the readout, and which clause of the hero sentence is underlined ("backend systems that stay up..." then "the AI agents that run on top of them").

Idle: packets keep flowing and a worker is taken down by fault injection every 9 to 15 seconds when nobody has touched anything. The simulation pauses off screen and has a Pause button. Under reduced motion it is one still frame that still answers clicks.

## System

**Palette** (dark is default, `.light` on `<html>` switches)

| Role | Dark | Light |
|---|---|---|
| ground | `#0a0b0d` | `#f1f2ee` |
| ink | `#ecede8` | `#0c0e11` |
| muted | `#969b98` | `#565b60` |
| accent (healthy, leader, active) | `#6b93ff` | `#1c40d8` |
| fault (a node that is down) | `#ff6b4a` | `#c2311a` |
| line | ink at 15% | ink at 15% |

Color is semantic, not decorative: blue means live or leading, red-orange only ever means down. No gradients.

**Type**

- Supreme 400/500 (Fontshare, self-hosted): display and text. Display tracking -0.05em, leading 0.9.
- Martian Mono 400: data only (dates, stacks, readout, graph labels).
- Mrs Saint Delafield: the signature, in the header and the footer, nowhere else.

**Grid:** 12 columns, gutter `clamp(1.125rem, 3.2vw, 3.25rem)`. Two hanging lines: column 1 and column 4. Section titles and labels sit on 1, content on 4.

**Shape:** rectangles have square corners. Circles are reserved for nodes, so anything round on the page is a node.

**Motion:** one easing family (`expo.out` and a softer cubic-bezier for hovers). Lenis on GSAP's ticker, ScrollTrigger reads Lenis, the simulation runs on the same ticker. The hero intro is CSS so the first paint never waits for JavaScript.

**Interaction, one treatment per role**

- Buttons and contact rows: flood with ink from the left, like a signal filling a wire.
- Nav links and entry titles: a node appears and the label moves over for it.
- Text links: the underline thickens; external arrows travel.
- Project rows: a packet runs the project's own topology.
- Theme switch: the new theme spreads from the toggle (View Transitions).

**Sections (each a different layout)**

```
Hero        sticky stage: name + sentence left, live graph right, readout strip under the graph
About       large statement, then portrait | facts table | now exploring
Experience  rows: when | company, role, summary, three results, folding detail
Projects    rows: topology drawing + date | title, summary, results, links, folding detail
Skills      six layers: name | inline list with hairline separators
Contact     big link rows | form
Footer      the signature at full width, status line, links
404         "This node is down."
```

## Decisions worth knowing

- **Single page.** There are no case-study pages because writing them would mean inventing content. Detail folds open in place and the code and demo links stay outside the fold.
- **Dashes.** "Jun – Aug 2026" and similar keep their dashes because the content is copied as written.
- **Genericness check.** Changed from the obvious answer: no particle network background (the graph is a specific system with real rules), no glowing gradient, no card grid, no mono-for-everything, no green-on-black terminal look.
