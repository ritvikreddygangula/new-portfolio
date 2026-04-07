"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "LANGUAGES",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C/C++", "HTML/CSS"],
  },
  {
    title: "WEB_DEV",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "REST APIs",
      "Next.js",
    ],
  },
  {
    title: "AI_ML",
    skills: [
      "TensorFlow",
      "Keras",
      "Hugging Face",
      "LLMs",
      "LangChain",
      "CrewAI",
    ],
  },
  {
    title: "DATABASES",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "CLOUD_DEVOPS",
    skills: ["AWS", "Cloudflare", "Vercel", "Docker", "Git/GitHub"],
  },
  {
    title: "AUTOMATION",
    skills: [
      "n8n",
      "Google Sheets API",
      "Workflow Automation",
      "Data Processing",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-primary/5 to-accent/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ color: "var(--foreground)" }}
          >
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="terminal-window overflow-hidden rounded-xl border border-border/50 shadow-2xl shadow-black/20"
        >
          {/* Terminal header bar */}
          <div className="terminal-header flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <div className="flex gap-2">
              <span className="terminal-dot terminal-dot-red w-3 h-3 rounded-full" />
              <span className="terminal-dot terminal-dot-yellow w-3 h-3 rounded-full" />
              <span className="terminal-dot terminal-dot-green w-3 h-3 rounded-full" />
            </div>
            <span className="terminal-title flex-1 text-center text-xs font-mono text-muted-foreground">
              ritvik@portfolio — bash
            </span>
            <div className="w-14" />
          </div>

          {/* Terminal content */}
          <div className="terminal-body p-5 md:p-6 font-mono text-sm md:text-base min-h-[320px]">
            <div className="terminal-output space-y-1">
              <div className="terminal-prompt flex items-baseline gap-2 mb-4">
                <span className="terminal-prompt-user select-none">
                  ritvik@portfolio
                </span>
                <span className="terminal-prompt-path select-none">~</span>
                <span className="terminal-prompt-symbol select-none">$</span>
                <span className="terminal-command">skills --list</span>
              </div>

              {skillCategories.map((category, catIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.05 * catIndex,
                  }}
                  viewport={{ once: true }}
                  className="terminal-block"
                >
                  <div className="terminal-category mb-1">
                    {catIndex === skillCategories.length - 1 ? "└──" : "├──"}{" "}
                    <span className="font-semibold">{category.title}</span>
                  </div>
                  <div className="ml-4 mb-3 flex flex-wrap gap-x-4 gap-y-1">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="terminal-skill transition-colors duration-200"
                      >
                        {skillIndex < category.skills.length - 1
                          ? `${skill},`
                          : skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              <div className="terminal-prompt flex items-baseline gap-2 mt-4 pt-2">
                <span className="terminal-prompt-user select-none">
                  ritvik@portfolio
                </span>
                <span className="terminal-prompt-path select-none">~</span>
                <span className="terminal-prompt-symbol select-none">$</span>
                <span className="terminal-cursor ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
