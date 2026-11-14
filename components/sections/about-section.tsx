import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import { about, site } from "@/data/site";

export function AboutSection() {
  return (
    <section id="about" className="section section--airy about" aria-labelledby="about-title" tabIndex={-1}>
      <SectionHead id="about" title="About" />

      <p className="about__statement" data-reveal="">
        {about.statement}
      </p>

      <div className="about__grid">
        <figure className="about__portrait" data-reveal="clip">
          <Image
            src="/headshot.webp"
            alt={`Portrait of ${site.name}`}
            width={1200}
            height={1500}
            sizes="(min-width: 900px) 30vw, 80vw"
          />
        </figure>

        <dl className="facts" data-reveal="">
          {about.facts.map((fact) => (
            <div key={fact.term} className="facts__row">
              <dt>{fact.term}</dt>
              <dd>
                {fact.detail}
                {fact.badge && (
                  <Image src="/certifications/aws-ccp-badge.png" alt="" width={28} height={28} className="facts__badge" />
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="now" data-reveal="">
          <h3 className="now__title">
            Now exploring <span>{about.now.updated}</span>
          </h3>
          <ul className="now__list">
            {about.now.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <a className="link" href={about.now.cta.href}>
            {about.now.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
