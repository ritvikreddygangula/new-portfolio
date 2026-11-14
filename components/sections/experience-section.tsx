import { Fragment } from "react";
import { Entry } from "@/components/entry";
import { SectionHead } from "@/components/section-head";
import { experiences } from "@/data/site";

// A result wrapped in **double asterisks** is set in the strong ink.
function Emphasized({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title" tabIndex={-1}>
      <SectionHead id="experience" title="Experience" meta={`${experiences.length} roles, 2024 to 2026`} />

      <ol className="entries">
        {experiences.map((exp, index) => (
          <Entry
            key={exp.company}
            id={`exp-${index}`}
            title={exp.company}
            role={exp.title}
            logo={exp.logo}
            site={exp.url ? { href: exp.url, label: new URL(exp.url).hostname.replace(/^www\./, "") } : undefined}
            summary={exp.summary}
            marks={exp.highlights}
            defaultOpen={index === 0}
            aside={
              <p className="entry__when">
                <span>{exp.period}</span>
                <span>{exp.location}</span>
              </p>
            }
          >
            <ul className="detail">
              {exp.achievements.map((a) => (
                <li key={a}>
                  <Emphasized text={a} />
                </li>
              ))}
            </ul>
            <p className="stack">{exp.stack.join(" / ")}</p>
          </Entry>
        ))}
      </ol>
    </section>
  );
}
