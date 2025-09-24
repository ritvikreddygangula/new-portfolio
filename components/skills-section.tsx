"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "C/C++", "HTML/CSS"],
    icon: "💻",
  },
  {
    title: "Web Development",
    skills: [
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "REST APIs",
      "Next.js",
    ],
    icon: "🌐",
  },
  {
    title: "AI/ML",
    skills: [
      "TensorFlow",
      "Keras",
      "Hugging Face",
      "LLMs",
      "LangChain",
      "CrewAI",
    ],
    icon: "🤖",
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    icon: "🗄️",
  },
  {
    title: "Cloud/DevOps",
    skills: ["AWS", "Cloudflare", "Vercel", "Docker", "Git/GitHub"],
    icon: "☁️",
  },
  {
    title: "Automation",
    skills: [
      "n8n",
      "Google Sheets API",
      "Workflow Automation",
      "Data Processing",
    ],
    icon: "⚡",
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-10 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-primary/5 to-accent/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ color: "var(--foreground)" }}
          >
            Skills & Technologies
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-premium p-5 h-full group relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 justify-center">
                    <span className="text-xl">{category.icon}</span>
                    <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + i * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="glass bg-primary/10 text-primary border-primary/20 text-base px-3 py-1 hover:bg-primary/20 hover:border-primary/40 hover:scale-105 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
