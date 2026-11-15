import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import { about, site } from "@/data/site";

export function AboutSection() {
  const { karate } = about;
  return (
    <section id="about" className="section about" aria-labelledby="about-title" tabIndex={-1}>
      <SectionHead id="about" title="About" />

      <div className="about__grid">
        <figure className="about__portrait" data-reveal="clip">
          <Image
            src="/headshot.webp"
            alt={`Portrait of ${site.name}`}
            width={1200}
            height={1500}
            sizes="(min-width: 900px) 22rem, 70vw"
          />
        </figure>

        <div className="about__main">
          <p className="about__statement" data-reveal="">
            {about.statement}
          </p>
          <dl className="facts" data-reveal="">
            {about.facts.map((fact) => (
              <div key={fact.term} className="facts__row">
                <dt>{fact.term}</dt>
                <dd>
                  {fact.detail}
                  {fact.badge && (
                    <Image src="/certifications/aws-ccp-badge.png" alt="" width={24} height={24} className="facts__badge" />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="dojo" data-reveal="" aria-labelledby="dojo-title">
          <span className="dojo__belt" aria-hidden="true">
            <i />
          </span>
          <h3 id="dojo-title" className="dojo__title">
            {karate.title}
          </h3>
          <p className="dojo__text">{karate.text}</p>
          <figure className="dojo__quote">
            <blockquote>{karate.quote}</blockquote>
            <figcaption>{karate.by}</figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
