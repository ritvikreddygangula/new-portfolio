"use client";

import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { DetailList, ExpandableRow } from "@/components/expandable-row";
import dynamic from "next/dynamic";

const AgentWorkflowAnimation = dynamic(
  () => import("@/components/animations/AgentWorkflowAnimation"),
  { ssr: false }
);

const projects = [
  {
    title: "DeltaLedger MCP",
    highlights: ["3-agent LangGraph pipeline", "90% eval gate in CI", "MCP server on AWS"],
    date: "August 2026",
    description:
      "A three-agent LangGraph pipeline that turns SEC EDGAR filings into classified, cited findings, served as an MCP server and REST API on AWS.",
    technologies: [
      "Python",
      "LangGraph",
      "MCP",
      "AWS Lambda",
      "API Gateway",
      "SQS",
      "Step Functions",
      "Terraform",
    ],
    achievements: [
      "Aligner, Classifier, and Verifier agents; the Verifier retries retrieval once and drops unsupported findings",
      "Gated in CI by a 30-pair hand-labeled eval set at a 90% accuracy threshold",
      "Deployed as an MCP server and REST API with SQS-queued async requests, response caching, and Step Functions orchestration",
      "All infrastructure provisioned with Terraform",
    ],
    github: "https://github.com/ritvikreddygangula/DeltaLedger-MCP",
    demo: "https://d30z0su1b3sesp.cloudfront.net/",
  },
  {
    title: "Forge",
    highlights: ["16.7 jobs/s", "145 ms leader failover", "0 acknowledged jobs lost"],
    date: "January 2026",
    description:
      "A distributed job orchestrator in Go with Raft-replicated coordinators, gRPC workers, and a Kafka-backed event log.",
    technologies: ["Go", "gRPC", "Kafka", "Raft", "k3s", "Prometheus", "Grafana"],
    achievements: [
      "3 Raft-replicated coordinators and 25 gRPC workers sustaining 16.7 jobs/s across 1,000 real job submissions",
      "Recovered every acknowledged job across 5 process-kill trials, with a 145 ms median leader failover",
      "Followers forward writes to the leader; job state is durably replicated via Kafka",
      "Prometheus/Grafana dashboards plus automated crash and partition fault-injection tests",
    ],
    github: "https://github.com/ritvikreddygangula/Forge",
    demo: "#",
  },
  {
    title: "Deep Research Multi-Agent System",
    highlights: ["Parallel LangGraph agents", "Live agent graph UI", "Pinecone memory"],
    date: "June 2025",
    description:
      "A full-stack AI system that decomposes topics into parallel sub-questions and synthesizes source-backed research reports using a stateful agent workflow.",
    technologies: ["Gradio", "CrewAI", "LangGraph", "Python", "AI Agents"],
    achievements: [
      "Orchestrates planner, researcher, aggregator, critic, and synthesizer agents using LangGraph with parallel execution",
      "Streams real-time node-level updates to a React UI with live agent graph visualization",
      "Uses Pinecone vector memory to retrieve past context and improve future research quality",
    ],
    github: "https://github.com/ritvikreddygangula/multi-agent-research-",
    demo: "https://multi-agent-research-v773.onrender.com/",
    showWorkflow: true,
  },
  {
    title: "Chatify",
    highlights: ["Real-time rooms", "JWT + Redis rate limits", "Dockerized"],
    date: "December 2024",
    description:
      "Real-time chat application with rooms, presence indicators, and multi-device conversation sync.",
    technologies: [
      "Node.js",
      "Express",
      "Socket.IO",
      "React",
      "MongoDB",
      "Docker",
      "JWT",
      "Redis",
    ],
    achievements: [
      "Real-time rooms & presence indicators",
      "MongoDB persistence & multi-device sync",
      "JWT auth & Redis-backed rate limiting",
      "Dockerized full-stack deployment",
    ],
    github: "https://github.com/ritvikreddygangula/chatify",
    demo: "https://chatify-0eq1n.sevalla.app/login",
  },
    {
    title: "Meeting Intelligence Platform",
    highlights: ["BERT semantic chunking", "Action item extraction", "FastAPI + Next.js"],
    date: "March 2026",
    description:
      "AI-powered platform for intelligent meeting transcript analysis with hierarchical NLP summarization and action item extraction.",
    technologies: [
      "FastAPI",
      "Next.js",
      "Python",
      "SQLAlchemy",
      "BERT",
      "Hugging Face",
      "JWT",
      "TypeScript",
    ],
    achievements: [
      "BERT-based semantic chunking with overlap for context preservation",
      "Hierarchical extractive summarization (chunk → overall)",
      "Pattern-based action item extraction with assignee & deadline detection",
      "Secure JWT auth with bcrypt and per-user data isolation",
    ],
    github: "https://github.com/ritvikreddygangula/meeting-intelligence",
    demo: "#",
  },
  {
    title: "AI Career Assistant",
    highlights: ["LangChain", "Hugging Face models", "Deployed on Vercel"],
    date: "May 2025",
    description:
      "AI-powered career assistant providing personalized guidance and recommendations.",
    technologies: ["LangChain", "Hugging Face", "Vercel", "React", "AI/ML"],
    achievements: [
      "Personalized recommendations",
      "Natural language processing",
      "Cloud deployment",
    ],
    github: "https://github.com/ritvikreddygangula/ai-career-assistant",
    demo: "#",
  },
  {
    title: "Stock Price Forecasting",
    highlights: ["LSTM model", "TensorFlow / Keras", "Time series"],
    date: "December 2024",
    description:
      "LSTM-based machine learning model for accurate stock price forecasting.",
    technologies: [
      "TensorFlow",
      "Keras",
      "LSTM",
      "Pandas",
      "Matplotlib",
      "Python",
    ],
    achievements: [
      "High prediction accuracy",
      "Time series analysis",
      "Data visualization",
    ],
    github: "https://github.com/ritvikreddygangula/stock-forecasting",
    demo: "#",
  },
];

export function ProjectsSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="projects" className="px-6 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="display display-section text-foreground mb-8 md:mb-10">Projects</h2>

        <ol className="border-b border-dotted border-foreground/45">
          {projects.map((project, index) => (
            <ExpandableRow
              key={project.title}
              id={`project-${index}`}
              title={project.title}
              meta={project.date}
              summary={project.description}
              highlights={project.highlights}
              open={open === index}
              onToggle={() => setOpen(open === index ? null : index)}
            >
              <DetailList items={project.achievements} />
              <p className="mt-6 label text-muted-foreground max-w-3xl">{project.technologies.join(" / ")}</p>

              <div className="mt-6 flex flex-wrap">
                {project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                )}
                {project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-solid ${project.github !== "#" ? "-ml-px" : ""}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live demo
                  </a>
                )}
              </div>

              {project.showWorkflow && open === index && (
                <div className="mt-8 max-w-4xl">
                  <AgentWorkflowAnimation autoPlay={true} />
                </div>
              )}
            </ExpandableRow>
          ))}
        </ol>
      </div>
    </section>
  );
}
