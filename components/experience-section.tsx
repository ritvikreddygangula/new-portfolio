"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Jr. Data Analyst",
    company: "Food Forest AI",
    location: "Philadelphia, PA",
    period: "June – July 2025",
    description:
      "Automated data enrichment and quality validation pipelines using Python and GPT, improving dataset reliability and saving 25+ hours per week across analytics workflows.",
    achievements: [
      "Improved dataset accuracy by ~40% through automated validation and consistency checks",
      "Reduced manual data processing by 35%+ by streamlining Google Sheets–based workflows",
      "Implemented anomaly detection to identify data inconsistencies across production datasets",
      "Strengthened downstream ML and analytics reliability with preventative data checks",
    ],
    technologies: [
      "Python Automation",
      "OpenAI API",
      "Google Sheets API",
      "Data Analysis",
    ],
  },
  {
    title: "Software Development Intern",
    company: "Tandur Municipality",
    location: "Telangana, India",
    period: "May – August 2024",
    description:
      "Worked on a full-stack civic platform serving 15,000+ users, contributing to frontend development, backend validation, and workflow automation to improve reliability and operational efficiency.",
    achievements: [
      "Reduced production issues by ~35% through comprehensive functional and API-level testing",
      "Lowered post-release defects by ~30% with Python-based backend validation across 15+ endpoints",
      "Cut manual paperwork by ~60% by building a React + Tailwind dashboard and automating workflows",
      "Enabled real-time status updates via email and SMS for municipal officers",
    ],
    technologies: ["React", "Tailwind CSS", "n8n", "Python", "Flask", "MySQL"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40 h-full">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                      <h3
                        className="text-2xl font-bold"
                        style={{ color: "var(--foreground)" }}
                      >
                        {exp.title}
                      </h3>
                      <span className="text-xl text-muted-foreground">
                        at {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-accent/10 text-accent border-accent/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
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
