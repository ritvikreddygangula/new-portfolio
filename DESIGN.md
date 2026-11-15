# Design

Second direction, after the owner's review of the first (cluster-graph hero, blue on black, sans only).

## Brief

- **Subject:** Ritvik Reddy Gangula, software engineer, CS at Arizona State (May 2027), karate black belt.
- **Audience:** recruiters and engineers. **Job:** get interviews.
- **Constraints:** every role, project, metric and link is copied as written. Light and dark. Vercel.
- **Owner's review, applied:** colour portrait; no text running the width of the screen; a warm, authored
  palette and type (the warmth of claude.ai was the reference, not its brand); karate as its own moment;
  About in one screen; keep the signature emblem; "Now exploring" in the hero; replace the hero graph with
  something that shows AI work (RAG, LLM as judge); a centered glass island for navigation; company logos
  and sites beside the employer names; the cluster simulation moves into Forge's detail view.

## Concept card

```
Idea:        Practice, feedback, repeat: a calm page that puts one real result in front of you at a time.
Metaphor:    The dojo. One technique at a time, done properly, then the next.
Signature:   The hero card: a single result set large in serif, held for a few seconds, then the next,
             with a dot that fills as its time runs.
Emotion:     Calm, exact, confident. Readable by someone who is not an engineer.
Motion verb: Strike and hold. Quick out, then completely still.
Screenshot:  The serif name beside "560+ team hours saved per quarter".
```

**History.** The first version of this direction put a live retrieval panel in the hero (question, scored
passages, judge, quoted answer). The owner found it overwhelming and confusing for non-technical visitors,
so it was replaced by the result card. The words on the card are the same highlights and summaries used in
Experience and Projects (`hero.results` only points at them).

## System

| Role | Dark | Light |
|---|---|---|
| ground | `#1c1a17` | `#f3efe4` |
| surface | `#25221e` | `#ebe5d6` |
| ink | `#f0ebdf` | `#1f1c17` |
| muted | `#a8a092` | `#5f594d` |
| accent (clay) | `#e27a54` | `#a63c1a` |
| moss (passes, healthy) | `#a3b684` | `#45662f` |
| fault | `#ef6247` | `#b3261e` |

The clay is the red of the polo logo in the portrait pushed toward earth; the moss is the garden behind him.
The theme follows the system until the visitor picks one.

- **Type:** Boska (Fontshare) for the name, section titles, employer and project names, the statement and
  the hero result; italic for the surname. Supreme for reading text. Martian Mono
  only for data. Mrs Saint Delafield only for the signature.
- **Grid:** one centered column, 72rem. Reading text never exceeds about 46rem.
- **Shape:** 18px on surfaces (panel, portrait, simulation), full pills for anything you press, glass only
  on the island.
- **Motion:** one ease out family; the stamp alone overshoots. GSAP ticker is the only clock; Lenis scroll.
- **Idle:** the card moves to the next result every 5.5 s. It waits while pointed at, focused or off screen.
- **Reduced motion:** the card stays on the first result until a dot is pressed; no smooth scroll.

## Karate

- A card in About, in his words, with the quote, under a stitched black belt.
- The reading bar at the top of the page is a belt: white at the start, black at the end.

## Navigation

A centered glass island (blur, saturation, top highlight). A lens of thicker glass sits under the current
section and slides to whatever is pointed at. On phones the island moves to the bottom, where the thumb is.
The signature emblem belongs to the first screen and leaves with it.

## Not changed

Project topology drawings, the fold rows, the contact form, the footer signature.
