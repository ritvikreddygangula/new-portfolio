import { Entry } from "@/components/entry";
import { Scene } from "@/components/scene";
import { SectionHead } from "@/components/section-head";
import { Sim } from "@/components/sim";
import { projects } from "@/data/site";

export function ProjectsSection() {
  return (
    <section id="projects" className="section projects" aria-labelledby="projects-title" tabIndex={-1}>
      <SectionHead id="projects" title="Projects" meta={`${projects.length} projects, each shown at work`} />

      <ol className="entries">
        {projects.map((project, index) => (
          <Entry
            key={project.title}
            id={`project-${index}`}
            title={project.title}
            summary={project.description}
            marks={project.highlights}
            feature={project.feature}
            aside={
              <>
                <Scene name={project.scene} label={project.sceneAlt} />
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
                {project.video && (
                  <a className="link link--ext" href={project.video} target="_blank" rel="noopener noreferrer">
                    Watch the demo<span className="sr-only"> of {project.title}</span>
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
            {project.clip && (
              <figure className="clip">
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={project.clip.poster}
                  width={960}
                  height={540}
                  aria-label={`A short video about ${project.title}`}
                >
                  <source src={project.clip.src} type="video/mp4" />
                </video>
                <figcaption>A short video about {project.title}. Use the player's full screen button to enlarge it.</figcaption>
              </figure>
            )}
            {project.sim && <Sim />}
          </Entry>
        ))}
      </ol>
    </section>
  );
}
