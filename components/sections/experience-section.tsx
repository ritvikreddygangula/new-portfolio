"use client";

import { Fragment, useState } from "react";
import { DetailList, ExpandableRow } from "@/components/expandable-row";

// Wrap a result in **double asterisks** to set it in the accent ink
function Emphasized({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-semibold text-foreground">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "GCM Grosvenor",
    url: "https://gcmgrosvenor.com/",
    location: "Chicago, IL",
    period: "Jun – Aug 2026",
    summary:
      "A $96B AUM investment firm. I built a RAG service on Azure OpenAI and backend services for client-facing platforms.",
    highlights: ["560+ team hours saved per quarter", "730+ clients served", "1.5s median retrieval"],
    achievements: [
      "Engineered a RAG service in C#/.NET on Azure OpenAI (GPT-4o) that drafts client reports grounded in research documents via hybrid retrieval (Azure AI Search, **1.5s** median retrieval latency), covering **500+ portfolios** and saving **560+ team hours per quarter**",
      "Built production backend services for an in-house document portal replacing a third-party platform, using ASP.NET Core Web API, EF Core, and SQL Server, with client-scoped RBAC and SAS-based downloads from Azure Blob Storage, serving **730+ clients** and **500K+ migrated documents**, tested with xUnit and Cypress E2E",
      "Implemented distributed tracing, log correlation, and production dashboards across 6+ .NET web apps and Azure Functions with Datadog APM and Sumo Logic (Serilog trace IDs), cutting diagnosis of a production Azure Function timeout from hours to **under 30 minutes**",
    ],
    stack: ["C#/.NET", "ASP.NET Core", "EF Core", "SQL Server", "Azure OpenAI", "Azure AI Search", "Azure Functions", "Datadog", "xUnit", "Cypress"],
  },
  {
    title: "Jr. Data Analyst",
    company: "Food Forest AI",
    url: "https://www.foodforest.ai/",
    location: "Philadelphia, PA",
    period: "June – May 2025",
    summary:
      "Automated data enrichment and quality validation pipelines using Python and GPT, improving dataset reliability across analytics workflows.",
    highlights: ["25+ hours saved per week", "~40% more accurate data"],
    achievements: [
      "Improved dataset accuracy by **~40%** through automated validation and consistency checks",
      "Reduced manual data processing by **35%+** by streamlining Google Sheets–based workflows",
      "Implemented anomaly detection to identify data inconsistencies across production datasets",
      "Strengthened downstream ML and analytics reliability with preventative data checks",
    ],
    stack: ["Python", "OpenAI API", "Google Sheets API", "Data analysis"],
  },
  {
    title: "Software Engineering Intern",
    company: "Greater Hyderabad Municipal Corporation",
    url: undefined as string | undefined,
    location: "Hyderabad, India",
    period: "May – Aug 2024",
    summary:
      "Backend APIs and a fast React frontend for a civic permit portal used by 15,000+ citizens and officers.",
    highlights: ["75% faster reads", "3.4s → 0.8s render", "65% fewer search calls"],
    achievements: [
      "Built cursor-based pagination on DynamoDB (LastEvaluatedKey) and a React frontend with debounced search and react-window virtualization, cutting search API calls by **65%** and initial render of 5K+ record permit histories from **3.4s to 0.8s**",
      "Replaced full-table scans on a 50K+ record permit table with key-based queries by redesigning the DynamoDB partition and sort keys and adding a status GSI, cutting average read latency **75%** (400ms to 100ms, CloudWatch)",
      "Built **15+ REST APIs** in Node.js/Express (TypeScript) with Joi request validation and Okta-based authentication and RBAC, enforcing 6 permission tiers through authorization middleware and role-based guards",
    ],
    stack: ["Node.js", "Express", "TypeScript", "React", "DynamoDB", "AWS", "Okta", "Joi"],
  },
];

export function ExperienceSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="px-6 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="display display-section text-foreground mb-8 md:mb-10">Experience</h2>

        <ol className="border-b border-dotted border-foreground/45">
          {experiences.map((exp, index) => (
            <ExpandableRow
              key={exp.company}
              id={`exp-${index}`}
              title={exp.company}
              subtitle={exp.title}
              meta={
                <>
                  {exp.period}
                  <br className="hidden md:block" />
                  <span className="md:hidden">, </span>
                  {exp.location}
                </>
              }
              summary={exp.summary}
              highlights={exp.highlights}
              open={open === index}
              onToggle={() => setOpen(open === index ? null : index)}
            >
              <DetailList items={exp.achievements.map((a) => <Emphasized key={a} text={a} />)} />
              <p className="mt-6 label text-muted-foreground max-w-3xl">{exp.stack.join(" / ")}</p>
              {exp.url && (
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-block mt-4 text-primary underline underline-offset-4"
                >
                  Visit {exp.company}
                </a>
              )}
            </ExpandableRow>
          ))}
        </ol>
      </div>
    </section>
  );
}
