"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Footer() {
  // Mirrors the hero simulation, the way a status page would.
  const [status, setStatus] = useState({ up: 28, total: 28 });
  useEffect(() => {
    const on = (e: Event) => setStatus((e as CustomEvent<{ up: number; total: number }>).detail);
    window.addEventListener("cluster:status", on);
    return () => window.removeEventListener("cluster:status", on);
  }, []);

  return (
    <footer className="foot">
      <p className="foot__sign" aria-hidden="true">
        {site.shortName}
      </p>
      <div className="foot__row">
        <p>&copy; 2026 {site.name}</p>
        <p className="foot__status" data-ok={status.up === status.total}>
          <span className="foot__dot" aria-hidden="true" />
          Simulated cluster: {status.up} of {status.total} nodes up
        </p>
        <nav className="foot__links" aria-label="Elsewhere">
          <a href={site.github.href} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={site.linkedin.href} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href="/#top">Back to top</a>
        </nav>
      </div>
      <p className="foot__colophon">Set in Supreme and Martian Mono. Built with Next.js, GSAP and Lenis.</p>
    </footer>
  );
}
