"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "LANGUAGES",
    skills: ["Python", "Java", "C#", "JavaScript", "TypeScript", "SQL", "HTML/CSS"],
  },
  {
    title: "FRAMEWORKS_TOOLS",
    skills: [".NET", "React", "Express", "REST APIs", "Git", "Cypress", "xUnit", "Socket.IO", "Tailwind CSS"],
  },
  {
    title: "CLOUD_DEVOPS",
    skills: ["AWS", "Microsoft Azure", "Datadog", "Docker"],
  },
  {
    title: "DATABASES",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Firebase"],
  },
  {
    title: "AGENTIC_AI",
    skills: ["LangGraph", "CrewAI", "LangChain", "LLM APIs"],
  },
  {
    title: "MACHINE_LEARNING",
    skills: ["TensorFlow", "Hugging Face"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">// 04 — skills</p>
          <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="panel rounded-xl overflow-hidden"
        >
          <div className="editor-chrome">
            <div className="flex gap-1.5">
              <span className="editor-dot editor-dot-red" />
              <span className="editor-dot editor-dot-yellow" />
              <span className="editor-dot editor-dot-green" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-muted-foreground">
              ritvik@portfolio — bash
            </span>
            <div className="w-12" />
          </div>

          <div className="p-5 md:p-6 font-mono text-sm min-h-[320px]">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-accent select-none">ritvik@portfolio</span>
              <span className="text-muted-foreground select-none">~</span>
              <span className="text-muted-foreground select-none">$</span>
              <span className="text-foreground">skills --list</span>
            </div>

            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * catIndex }}
                viewport={{ once: true }}
              >
                <div className="mb-1 text-primary">
                  {catIndex === skillCategories.length - 1 ? "└──" : "├──"}{" "}
                  <span className="font-semibold">{category.title}</span>
                </div>
                <div className="ml-4 mb-3 flex flex-wrap gap-x-4 gap-y-1">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {skillIndex < category.skills.length - 1
                        ? `${skill},`
                        : skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="flex items-baseline gap-2 mt-4 pt-2">
              <span className="text-accent select-none">ritvik@portfolio</span>
              <span className="text-muted-foreground select-none">~</span>
              <span className="text-muted-foreground select-none">$</span>
              <span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
