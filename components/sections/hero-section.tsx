import { Cluster } from "@/components/cluster";
import { hero, site } from "@/data/site";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export function HeroSection() {
  const { lede } = hero;
  return (
    <section id="top" className="hero" data-hero tabIndex={-1}>
      <div className="hero__stage">
        <div className="hero__copy">
          <h1 className="hero__name">
            <span className="line">
              <span style={i(0)}>Ritvik Reddy</span>
            </span>{" "}
            <span className="line">
              <span style={i(1)}>Gangula</span>
            </span>
          </h1>

          <p className="hero__lede intro-fade" style={i(3)}>
            {lede.before}
            <span className="clause clause--infra">{lede.infra}</span>
            {lede.between}
            <span className="clause clause--agents">{lede.agents}</span>
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

        <Cluster />
      </div>
    </section>
  );
}
