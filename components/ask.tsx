"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ask, evaluate, type Result } from "@/lib/ask";
import { about, hero } from "@/data/site";

type State = { q: string; typed: number; result: Result; stage: 0 | 1 | 2 | 3; rep: number };

const SLOTS = [0, 1, 2, 3, 4];
const pad = (n: number) => String(n).padStart(4, "0");
// The three things being explored right now are the three parts of this panel.
const [topicEval, topicJudge, topicRag] = about.now.topics;

/**
 * The hero's signature: ask the page a question. Retrieval runs for real over the site's own
 * text, a judge keeps or drops each passage, and the answer is quoted, never generated.
 * Left alone it practices the sample questions, one rep at a time.
 */
export function Ask() {
  const samples = hero.questions;
  const first = samples[0].q;
  const [s, setS] = useState<State>(() => ({ q: first, typed: first.length, result: ask(first), stage: 3, rep: 1 }));
  const [live, setLive] = useState(false);
  const score = useMemo(evaluate, []);
  const root = useRef<HTMLElement>(null);
  const run = useRef<(q: string, instant?: boolean) => void>(() => {});
  const auto = useRef(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tl: gsap.core.Timeline | null = null;
    let next: gsap.core.Tween | null = null;
    let index = 0;
    let visible = true;

    run.current = (q, instant = false) => {
      tl?.kill();
      next?.kill();
      const result = ask(q);
      if (instant || reduced) {
        setS((p) => ({ q, typed: q.length, result, stage: 3, rep: p.rep + 1 }));
        return;
      }
      const type = { n: 0 };
      // The last answer stays, dimmed, while the next question is typed.
      setS((p) => ({ ...p, q, typed: 0, stage: 0 }));
      tl = gsap
        .timeline()
        .to(type, {
          n: q.length,
          duration: Math.min(1.1, q.length * 0.03),
          ease: "none",
          onUpdate: () => setS((p) => (p.typed === Math.round(type.n) ? p : { ...p, typed: Math.round(type.n) })),
        })
        .call(() => setS((p) => ({ ...p, typed: q.length, result, stage: 1, rep: p.rep + 1 })), [], "+=0.12")
        .call(() => setS((p) => ({ ...p, stage: 2 })), [], "+=0.85")
        .call(() => setS((p) => ({ ...p, stage: 3 })), [], "+=0.6")
        .call(() => schedule(), [], "+=0.1");
    };

    // Practice: the next sample question, for as long as nobody has taken over.
    const schedule = () => {
      next?.kill();
      if (!auto.current || reduced) return;
      next = gsap.delayedCall(4.6, () => {
        if (!auto.current) return;
        index = (index + 1) % samples.length;
        run.current(samples[index].q);
      });
      if (!visible) next.pause();
    };
    schedule();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        tl?.resume();
        next?.resume();
      } else {
        tl?.pause();
        next?.pause();
      }
    });
    const el = root.current;
    if (el) io.observe(el);
    // Nothing changes under a pointer: practice waits while someone is reading the panel.
    const hold = () => next?.pause();
    const release = () => visible && next?.resume();
    el?.addEventListener("pointerenter", hold);
    el?.addEventListener("pointerleave", release);
    return () => {
      io.disconnect();
      el?.removeEventListener("pointerenter", hold);
      el?.removeEventListener("pointerleave", release);
      tl?.kill();
      next?.kill();
    };
  }, [samples]);

  const takeOver = () => {
    auto.current = false;
    setLive(true);
  };

  const { result } = s;
  const top = result.kept[0];
  const empty = s.q.trim() === "";
  const verdict = empty
    ? "Waiting for a question."
    : result.grounded
      ? `${result.kept.length} of ${result.hits.length} passages kept${result.hits.length > result.kept.length ? ", the rest dropped as too weak" : ""}.`
      : "Nothing clears the bar. No answer beats a guess.";

  return (
    <section
      ref={root}
      className="ask intro-fade"
      style={{ "--i": 2 } as React.CSSProperties}
      data-stage={s.stage}
      data-grounded={result.grounded}
      aria-label="Ask this page"
    >
      <header className="ask__head">
        <h2 className="ask__kicker">
          Now exploring <span>{about.now.updated}</span>
        </h2>
        <p className="ask__rep">
          Rep <b>{pad(s.rep)}</b> of 10,000
        </p>
      </header>

      <form
        className="ask__form"
        onSubmit={(e) => {
          e.preventDefault();
          takeOver();
          run.current(s.q.trim());
        }}
      >
        <label htmlFor="ask-q" className="sr-only">
          Ask a question about Ritvik
        </label>
        <input
          id="ask-q"
          className="ask__input"
          aria-label="Ask a question about Ritvik"
          value={s.q.slice(0, s.typed)}
          onFocus={() => {
            takeOver();
            run.current(s.q, true);
          }}
          onChange={(e) => run.current(e.target.value, true)}
          placeholder="Ask about my work"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <button type="submit" className="ask__go" aria-label="Ask">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M4 10h11M10.5 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </form>

      <ul className="ask__samples" aria-label="Sample questions">
        {samples.map((sample) => (
          <li key={sample.q}>
            <button
              type="button"
              className="pill"
              aria-pressed={s.q === sample.q}
              onClick={() => {
                takeOver();
                run.current(sample.q);
              }}
            >
              {sample.q}
            </button>
          </li>
        ))}
      </ul>

      <ol className="ask__steps" aria-live={live ? "polite" : "off"}>
        <li className="step" data-step="1">
          <p className="step__label">
            <b>Retrieve</b>
            <span>{topicRag}</span>
          </p>
          <ol className="hits">
            {SLOTS.map((i) => {
              const hit = result.hits[i];
              return (
                <li
                  key={i}
                  className="hit"
                  data-kept={hit?.kept ?? false}
                  data-empty={!hit}
                  style={{ "--i": i, "--rel": hit ? hit.rel.toFixed(3) : 0 } as React.CSSProperties}
                >
                  {hit && (
                    <>
                      <span className="hit__score">{hit.score.toFixed(2)}</span>
                      <span className="hit__bar" aria-hidden="true" />
                      <span className="hit__src">
                        {hit.passage.source}
                        <i>{hit.passage.part}</i>
                      </span>
                      <span className="hit__text">{hit.passage.text}</span>
                      <span className="hit__mark">{hit.kept ? "kept" : "dropped"}</span>
                    </>
                  )}
                </li>
              );
            })}
            {result.hits.length === 0 && (
              <li className="hits__none">{empty ? "Nothing to look up yet." : "No passage on this page shares a word with that."}</li>
            )}
          </ol>
        </li>

        <li className="step" data-step="2">
          <p className="step__label">
            <b>Judge</b>
            <span>{topicJudge}</span>
          </p>
          <p className="verdict">
            <span className="stamp">{result.grounded ? "Grounded" : "Refused"}</span>
            <span>{verdict}</span>
          </p>
        </li>

        <li className="step" data-step="3">
          <p className="step__label">
            <b>Answer</b>
            <span>Quoted, not generated</span>
          </p>
          <div className="answer">
            <p className={top ? "answer__text" : "answer__text answer__text--none"}>
              {top
                ? top.passage.text
                : empty
                  ? "Ask about my work, projects or stack."
                  : "Not in the sources. Try my work, projects or stack."}
            </p>
            {/* Three fixed slots, so a citation someone is reaching for is never swapped out from under them. */}
            <p className="answer__cites">
              {[0, 1, 2].map((i) => {
                const hit = result.kept[i];
                return (
                  <a key={i} className="link" href={hit?.passage.href ?? "/#top"} hidden={!hit}>
                    [{i + 1}] {hit?.passage.source}, {hit?.passage.part}
                  </a>
                );
              })}
            </p>
          </div>
        </li>
      </ol>

      <footer className="ask__foot">
        <p className="ask__eval">
          <b>
            Eval {score.pass}/{score.total}
          </b>
          <span>{topicEval}</span>
        </p>
        <p className="ask__note">
          Runs in your browser on this page&apos;s own text. The ranking is real BM25; a rule stands in for the LLM judge.
        </p>
        <a className="link" href={about.now.cta.href}>
          {about.now.cta.label}
        </a>
      </footer>
    </section>
  );
}
