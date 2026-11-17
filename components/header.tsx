"use client";

import { useEffect, useRef } from "react";
import { nav, site } from "@/data/site";

function setTheme(next: "light" | "dark") {
  document.documentElement.classList.toggle("light", next === "light");
  try {
    localStorage.setItem("theme", next);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

export function Header() {
  const island = useRef<HTMLElement>(null);
  const lens = useRef<HTMLSpanElement>(null);

  // The lens: a drop of glass that sits under the current section and slides to whatever is pointed at.
  useEffect(() => {
    const el = island.current;
    const glass = lens.current;
    if (!el || !glass) return;
    const links = Array.from(el.querySelectorAll<HTMLElement>("[data-nav]"));
    let hovered: HTMLElement | null = null;
    const place = () => {
      const target = hovered ?? links.find((a) => a.hasAttribute("aria-current")) ?? null;
      glass.dataset.on = String(!!target);
      if (!target) return;
      glass.style.width = `${target.offsetWidth}px`;
      glass.style.translate = `${target.offsetLeft}px 0`;
    };
    const enter = (e: Event) => {
      hovered = e.currentTarget as HTMLElement;
      place();
    };
    const leave = () => {
      hovered = null;
      place();
    };
    links.forEach((a) => {
      a.addEventListener("pointerenter", enter);
      a.addEventListener("focus", enter);
      a.addEventListener("blur", leave);
    });
    el.addEventListener("pointerleave", leave);
    const mo = new MutationObserver(place);
    links.forEach((a) => mo.observe(a, { attributes: true, attributeFilter: ["aria-current"] }));
    const ro = new ResizeObserver(place);
    ro.observe(el);
    place();
    return () => {
      mo.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerleave", leave);
      links.forEach((a) => {
        a.removeEventListener("pointerenter", enter);
        a.removeEventListener("focus", enter);
        a.removeEventListener("blur", leave);
      });
    };
  }, []);

  // The new theme spreads from the toggle with a soft edge, at a steady pace to the far corner.
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return setTheme(next);
    const start = (document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition;
    if (!start) {
      // No view transitions here: cross-fade the colours instead of snapping.
      root.classList.add("theme-fade");
      setTheme(next);
      window.setTimeout(() => root.classList.remove("theme-fade"), 600);
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-end", `${Math.ceil(far) + 140}px`);
    // Colours must not be mid-fade when the new frame is captured.
    root.classList.add("theme-snap");
    const done = () => root.classList.remove("theme-snap");
    start.call(document, () => setTheme(next)).finished.then(done, done);
  };

  return (
    <header className="top">
      <a className="sign" href="/#top" aria-label={`${site.name}, back to top`}>
        <span className="sign__ink">{site.shortName}</span>
        <span className="sign__node" aria-hidden="true" />
      </a>

      <nav className="island" aria-label="Primary" ref={island}>
        <span className="island__lens" ref={lens} aria-hidden="true" />
        {nav.map((item) => (
          <a key={item.id} className="island__link" href={`/#${item.id}`} data-nav={item.id}>
            {item.name}
          </a>
        ))}
        <button type="button" className="island__theme" onClick={toggleTheme} aria-label="Switch between dark and light mode">
          <svg className="tool__sun" viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
            <circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M10 1.5v2.6M10 15.9v2.6M1.5 10h2.6M15.9 10h2.6M4 4l1.8 1.8M14.2 14.2 16 16M4 16l1.8-1.8M14.2 5.8 16 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <svg className="tool__moon" viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
            <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
