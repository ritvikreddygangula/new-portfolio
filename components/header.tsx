"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/site";

function setTheme(next: "light" | "dark") {
  document.documentElement.classList.toggle("light", next === "light");
  try {
    localStorage.setItem("theme", next);
  } catch {}
  window.dispatchEvent(new Event("themechange"));
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // The new theme opens from the toggle like a signal spreading from a node.
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.classList.contains("light") ? "dark" : "light";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = (document as Document & { startViewTransition?: (cb: () => void) => unknown }).startViewTransition;
    if (!start || reduced) return setTheme(next);
    const r = e.currentTarget.getBoundingClientRect();
    root.style.setProperty("--vt-x", `${r.left + r.width / 2}px`);
    root.style.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    start.call(document, () => setTheme(next));
  };

  const close = useCallback((restore = true) => {
    setOpen(false);
    if (restore) button.current?.focus();
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("menu", { detail: open }));
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const links = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    links()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const items = [button.current!, ...links()];
      const i = items.indexOf(document.activeElement as HTMLElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <header className="frame">
        <a className="sign" href="/#top" aria-label={`${site.name}, back to top`}>
          <span className="sign__ink">{site.shortName}</span>
          <span className="sign__node" aria-hidden="true" />
        </a>

        <nav className="nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.id} className="nav__link" href={`/#${item.id}`} data-nav={item.id}>
              {item.name}
            </a>
          ))}
        </nav>

        <div className="frame__tools">
          <button type="button" className="tool" onClick={toggleTheme} aria-label="Switch between dark and light mode">
            <svg className="tool__sun" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <circle cx="10" cy="10" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M10 1.5v2.6M10 15.9v2.6M1.5 10h2.6M15.9 10h2.6M4 4l1.8 1.8M14.2 14.2 16 16M4 16l1.8-1.8M14.2 5.8 16 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            <svg className="tool__moon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            ref={button}
            type="button"
            className="tool tool--menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div id="menu" className="menu" ref={menu} hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((item, i) => (
            <a
              key={item.id}
              className="menu__link"
              href={`/#${item.id}`}
              data-nav={item.id}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => close(false)}
            >
              <span className="menu__node" aria-hidden="true" />
              {item.name}
            </a>
          ))}
        </nav>
        <p className="menu__foot">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </>
  );
}
