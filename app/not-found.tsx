import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404, node not found",
  description: "This address is not part of the cluster. Head back to the portfolio of Ritvik Reddy Gangula.",
};

export default function NotFound() {
  return (
    <section className="lost" aria-labelledby="lost-title">
      <div className="lost__copy">
        <p className="lost__code">404</p>
        <h1 id="lost-title" className="lost__title">
          This node is down.
        </h1>
        <p className="lost__text">
          Nothing answers at this address, and no retry will change that. The rest of the cluster is healthy.
        </p>
        <a className="btn btn--solid" href="/">
          <span>Route me home</span>
        </a>
      </div>
      <svg className="lost__glyph" viewBox="0 0 240 150" aria-hidden="true">
        <line x1="120" y1="24" x2="56" y2="118" className="glyph__edge" />
        <line x1="56" y1="118" x2="184" y2="118" className="glyph__edge" />
        <line x1="120" y1="24" x2="184" y2="118" className="glyph__edge" strokeDasharray="3 5" />
        <circle cx="120" cy="24" r="9" className="glyph__node glyph__node--hot" />
        <circle cx="56" cy="118" r="9" className="glyph__node glyph__node--big" />
        <circle cx="184" cy="118" r="11" className="lost__dead" />
        <path d="M179 113l10 10M189 113l-10 10" className="lost__cross" />
        {/* Requests still leave the leader for the dead node, and never arrive. */}
        <circle r="3.5" className="lost__packet" />
        <circle r="3.5" className="lost__packet lost__packet--live" />
      </svg>
    </section>
  );
}
