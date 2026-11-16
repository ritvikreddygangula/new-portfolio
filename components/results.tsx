"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { about, experiences, hero, projects } from "@/data/site";

const HOLD = 3.5; // seconds each result stays up

const slides = hero.results.map((r) => {
  if (r.from === "experience") {
    const e = experiences[r.index];
    return { headline: e.highlights[r.highlight], text: e.summary, source: e.company, when: e.period, href: "/#experience", logo: e.logo };
  }
  const p = projects[r.index];
  return { headline: p.highlights[r.highlight], text: p.description, source: p.title, when: p.date, href: "/#projects", logo: undefined };
});

/** The hero's right side: one real result at a time, in the words used further down the page. */
export function Results() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const root = useRef<HTMLElement>(null);
  const timer = useRef<gsap.core.Tween | null>(null);
  const hold = useRef({ visible: true, hover: false, focus: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAuto(true);
    const el = root.current;
    const sync = () => {
      const h = hold.current;
      const paused = !h.visible || h.hover || h.focus;
      el?.toggleAttribute("data-paused", paused);
      if (paused) timer.current?.pause();
      else timer.current?.resume();
    };
    const tick = () => {
      timer.current = gsap.delayedCall(HOLD, () => {
        setActive((i) => (i + 1) % slides.length);
        tick();
      });
      sync();
    };
    tick();
    const io = new IntersectionObserver(([entry]) => {
      hold.current.visible = entry.isIntersecting;
      sync();
    });
    if (el) io.observe(el);
    const on = (key: "hover" | "focus", value: boolean) => () => {
      hold.current[key] = value;
      sync();
    };
    const enter = on("hover", true), leave = on("hover", false), fin = on("focus", true), fout = on("focus", false);
    el?.addEventListener("pointerenter", enter);
    el?.addEventListener("pointerleave", leave);
    el?.addEventListener("focusin", fin);
    el?.addEventListener("focusout", fout);
    return () => {
      io.disconnect();
      timer.current?.kill();
      el?.removeEventListener("pointerenter", enter);
      el?.removeEventListener("pointerleave", leave);
      el?.removeEventListener("focusin", fin);
      el?.removeEventListener("focusout", fout);
    };
  }, []);

  const go = (i: number) => {
    setActive(i);
    // Picking a result restarts the clock, so it is never swapped out a moment later.
    timer.current?.restart(true);
    if (hold.current.hover || hold.current.focus) timer.current?.pause();
  };

  return (
    <section
      ref={root}
      className="results intro-fade"
      style={{ "--i": 2, "--hold": `${HOLD}s` } as React.CSSProperties}
      data-auto={auto}
      aria-roledescription="carousel"
      aria-label="Selected results"
    >
      <header className="results__head">
        <h2 className="results__kicker">
          Now exploring <span>{about.now.updated}</span>
        </h2>
        <ul className="results__topics">
          {about.now.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </header>

      <div className="results__stage">
        {slides.map((slide, i) => (
          <article
            key={slide.source + slide.headline}
            className="result"
            data-on={i === active}
            inert={i !== active}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <p className="result__headline">{slide.headline}</p>
            <p className="result__text">{slide.text}</p>
            <a className="result__source" href={slide.href}>
              {slide.logo && <img src={slide.logo} alt="" width={28} height={28} />}
              <span>
                <b>{slide.source}</b>
                <i>{slide.when}</i>
              </span>
              <span className="result__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </article>
        ))}
      </div>

      <footer className="results__foot">
        <div className="results__dots" role="group" aria-label="Choose a result">
          {slides.map((slide, i) => (
            <button
              key={slide.source + slide.headline}
              type="button"
              className="dot"
              aria-label={`${slide.source}: ${slide.headline}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
        <a className="link" href={about.now.cta.href}>
          {about.now.cta.label}
        </a>
      </footer>
    </section>
  );
}
