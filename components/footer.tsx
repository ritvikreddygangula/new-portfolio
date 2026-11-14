import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="foot">
      <p className="foot__sign" aria-hidden="true">
        {site.shortName}
      </p>
      <div className="foot__row">
        <p>&copy; 2026 {site.name}</p>
        <p className="foot__status">
          <span className="foot__dot" aria-hidden="true" />
          Black belt. You read to the end.
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
      <p className="foot__colophon">Set in Boska, Supreme and Martian Mono. Built with Next.js, GSAP and Lenis.</p>
    </footer>
  );
}
