import { Entry } from "@/components/entry";
import { Glyph } from "@/components/glyph";
import { SectionHead } from "@/components/section-head";
import { projects } from "@/data/site";

export function ProjectsSection() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title" tabIndex={-1}>
      <SectionHead id="projects" title="Projects" meta={`${projects.length} projects, each drawn as its own topology`} />

      <ol className="entries">
        {projects.map((project, index) => (
          <Entry
            key={project.title}
            id={`project-${index}`}
            title={project.title}
            summary={project.description}
            marks={project.highlights}
            defaultOpen={index < 2}
            aside={
              <>
                <Glyph name={project.glyph} label={project.glyphAlt} />
                <p className="entry__when">
                  <span>{project.date}</span>
                </p>
              </>
            }
            links={
              <p className="entry__links">
                {project.github && (
                  <a className="link link--ext" href={project.github} target="_blank" rel="noopener noreferrer">
                    Code<span className="sr-only"> for {project.title}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.demo && (
                  <a className="link link--ext" href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live demo<span className="sr-only"> of {project.title}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            }
          >
            <ul className="detail">
              {project.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="stack">{project.technologies.join(" / ")}</p>
          </Entry>
        ))}
      </ol>
    </section>
  );
}
