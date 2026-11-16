import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__row">
        <p>&copy; 2026 {site.name}</p>
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
    </footer>
  );
}
