"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "GCM Grosvenor",
    logo: "/gcm-mark.png",
    url: "https://gcmgrosvenor.com/",
    location: "Chicago, IL",
    period: "May – August 2026",
    description:
      "Software engineering intern at a $96B AUM investment firm, building LLM-powered portfolio analytics and core backend infrastructure for enterprise-scale client-facing platforms.",
    achievements: [
      "Developed an LLM-powered portfolio insights feature in C#/.NET that synthesized live investment data into client-facing performance reports, streamlining reporting across 500+ portfolios previously requiring 560 hours of team effort per quarter",
      "Built core backend infrastructure and SQL-driven data models for an in-house enterprise client document portal replacing a third-party platform, implementing document categorization, REST APIs, and access-control workflows supporting 730+ clients and 500,000+ migrated documents",
      "Rolled out Datadog APM alongside Sumo Logic across 6+ .NET web applications and Azure Functions, correlating distributed traces with centralized logs to cut production issue diagnosis time from hours to minutes",
    ],
    technologies: ["C#/.NET", "SQL", "REST APIs", "Azure Functions", "Datadog APM", "Sumo Logic", "LLMs"],
  },
  {
    title: "Jr. Data Analyst",
    company: "Food Forest AI",
    logo: "/foodforest_logo.jpeg",
    url: "https://www.foodforest.ai/",
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
    title: "Software Engineering Intern",
    company: "Greater Hyderabad Municipal Corporation",
    logo: undefined as string | undefined,
    url: undefined as string | undefined,
    location: "Hyderabad, India",
    period: "May – August 2024",
    description:
      "Engineered a full-stack civic automation platform serving 15,000+ citizens, redesigning backend data access patterns and access-control workflows to improve reliability and reduce manual effort.",
    achievements: [
      "Engineered a full-stack automation platform (React, Python, AWS) to digitize permits and tax workflows for 15,000+ citizens, reducing manual effort by 60%",
      "Designed and implemented 15+ REST APIs with input validation and JWT-based RBAC, enforcing customized access across 6 permission tiers for citizen and officer workflows",
      "Refactored DynamoDB access patterns by redesigning partition and index strategy, eliminating full-table scans and reducing read latency by ~75% (measured via AWS CloudWatch)",
    ],
    technologies: ["React", "Python", "AWS", "DynamoDB", "REST APIs", "JWT"],
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
              className={`relative pl-12 ml-1.5 ${
                index === experiences.length - 1
                  ? "pb-0"
                  : "pb-12 border-l border-border"
              }`}
            >
              {exp.logo ? (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${exp.company}`}
                  className="absolute -left-4 top-0 w-8 h-8 rounded-lg bg-white border border-border flex items-center justify-center overflow-hidden transition-opacity hover:opacity-80"
                >
                  <Image
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain p-0.5"
                    unoptimized
                  />
                </a>
              ) : (
                <span className="absolute -left-4 top-0 w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full border-2 bg-background border-accent" />
                </span>
              )}

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                <span className="text-muted-foreground">@ {exp.company}</span>
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
