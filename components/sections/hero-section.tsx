import { Results } from "@/components/results";
import { hero, site } from "@/data/site";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export function HeroSection() {
  const { lede } = hero;
  return (
    <section id="top" className="hero" tabIndex={-1}>
      <div className="hero__in">
        <div className="hero__copy">
          <h1 className="hero__name">
            <span className="line">
              <span style={i(0)}>Ritvik Reddy</span>
            </span>{" "}
            <span className="line">
              <span style={i(1)}>
                <em>Gangula</em>
              </span>
            </span>
          </h1>

          <p className="hero__lede intro-fade" style={i(3)}>
            {lede.before}
            {lede.infra}
            {lede.between}
            {lede.agents}
            {lede.after}
          </p>

          <div className="hero__actions intro-fade" style={i(4)}>
            <a className="btn btn--solid" href={site.resume} target="_blank" rel="noopener noreferrer">
              <span>View resume</span>
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="btn btn--line" href="/#projects">
              <span>See projects</span>
            </a>
          </div>
        </div>

        <Results />
      </div>
    </section>
  );
}
