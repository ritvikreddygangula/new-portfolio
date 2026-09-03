"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "GCM Grosvenor",
    logo: "/GCM-LOGO.jpg",
    location: "Chicago, IL",
    period: "May – August 2026",
    description:
      "Software engineering intern at a $96B AUM investment firm, building LLM-powered portfolio analytics and core backend infrastructure for enterprise-scale client-facing platforms.",
    achievements: [
      "Developed an LLM-powered portfolio insights feature in C#/.NET that synthesized live investment portfolio data into client-facing performance reports, enabling automated portfolio analysis within the enterprise client portal",
      "Built core backend infrastructure in C#/.NET and SQL for an in-house enterprise client document portal replacing a third-party platform, implementing document categorization, REST APIs, and workflows for search, access control, and notifications",
      "Rolled out Datadog APM instrumentation across 6+ .NET web applications and Azure Functions, standardizing application observability through end-to-end distributed tracing across production services",
    ],
    technologies: ["C#/.NET", "SQL", "REST APIs", "Azure Functions", "Datadog APM", "LLMs"],
  },
  {
    title: "Jr. Data Analyst",
    company: "Food Forest AI",
    logo: "/foodforest_logo.jpeg",
    location: "Philadelphia, PA",
    period: "June – May 2025",
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
    logo: undefined as string | undefined,
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
    <section id="experience" className="py-24 px-6 bg-muted/20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">// 02 — experience</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
        </motion.div>

        <div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`relative pl-8 ml-1.5 ${
                index === experiences.length - 1
                  ? "pb-0"
                  : "pb-12 border-l border-border"
              }`}
            >
              <span
                className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 bg-background ${
                  index === 0 ? "border-primary" : "border-accent"
                }`}
              />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                <span className="flex items-center gap-2 text-muted-foreground">
                  @ {exp.company}
                  {exp.logo && (
                    <span className="inline-flex items-center justify-center h-6 rounded-md bg-white px-1.5 py-1">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={80}
                        height={24}
                        className="h-4 w-auto object-contain"
                        unoptimized
                      />
                    </span>
                  )}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {exp.period}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {exp.location}
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                {exp.description}
              </p>

              <ul className="space-y-2 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-secondary text-muted-foreground border border-border font-mono text-xs font-normal"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
