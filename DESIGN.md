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
Idea:        The page answers questions about its owner, shows its sources, and refuses when it has none.
Metaphor:    Practice with feedback. One technique, repeated, judged every time.
Signature:   Ask this page: a question is typed, passages are retrieved and scored, a judge keeps or
             drops each one, the stamp lands, the answer is quoted with citations.
Emotion:     Calm, exact, a little dry. A person who checks their work.
Motion verb: Strike and hold. Quick out, then completely still.
Screenshot:  The serif name beside the panel with a green GROUNDED stamp and three cited passages.
```

**Anchor.** Three facts only this person has: he is exploring exactly these three topics now (RAG, LLM as a
judge, evaluating LLM systems), which are the three parts of the panel; he says karate taught him "focus,
and how important feedback is", which is what a judge is; and the quote he gave about one kick practiced
10,000 times, which is the panel's rep counter.

**Honesty.** Retrieval is real: BM25 over passages built from `data/site.ts`, in the browser. The judge is a
rule (a score floor and a ratio to the best passage), and the panel says so. Answers are verbatim passages.
The six sample questions carry an expected source and run as an eval on every load. No model is called and
no number is invented.

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

- **Type:** Boska (Fontshare) for the name, section titles, employer and project names, the statement, the
  question and the answer; italic for the surname and the question. Supreme for reading text. Martian Mono
  only for data. Mrs Saint Delafield only for the signature.
- **Grid:** one centered column, 72rem. Reading text never exceeds about 46rem.
- **Shape:** 18px on surfaces (panel, portrait, simulation), full pills for anything you press, glass only
  on the island.
- **Motion:** one ease out family; the stamp alone overshoots. GSAP ticker is the only clock; Lenis scroll.
- **Idle:** the panel practices the sample questions until someone takes over. It pauses off screen.
- **Reduced motion:** the first question is shown answered; typing still searches instantly; no smooth scroll.

## Karate

- A card in About, in his words, with the quote, under a stitched black belt.
- The reading bar at the top of the page is a belt: white at the start, black at the end.
- "Rep 0001 of 10,000" counts every retrieval the panel runs.

## Navigation

A centered glass island (blur, saturation, top highlight). A lens of thicker glass sits under the current
section and slides to whatever is pointed at. On phones the island moves to the bottom, where the thumb is.
The signature emblem belongs to the first screen and leaves with it.

## Not changed

Project topology drawings, the fold rows, the contact form, the footer signature.
