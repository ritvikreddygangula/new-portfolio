import { SectionHead } from "@/components/section-head";
import { skillCategories } from "@/data/site";

export function SkillsSection() {
  return (
    <section id="skills" className="section section--tight" aria-labelledby="skills-title" tabIndex={-1}>
      <SectionHead id="skills" title="Skills" meta={`${skillCategories.length} layers of the stack`} />

      <dl className="skills">
        {skillCategories.map((category) => (
          <div key={category.title} className="skills__row" data-reveal="">
            <dt>{category.title}</dt>
            <dd>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
