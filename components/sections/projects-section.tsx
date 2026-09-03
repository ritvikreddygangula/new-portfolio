"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const AgentWorkflowAnimation = dynamic(
  () => import("@/components/animations/AgentWorkflowAnimation"),
  { ssr: false }
);

const projects = [
    {
    title: "Multi Agent Research Team",
    date: "June 2025",
    description:
      "A full-stack AI system that decomposes topics into parallel sub-questions and synthesizes source-backed research reports using a stateful agent workflow.",
    longDescription:
      "Developed a collaborative AI research platform using Gradio for the frontend and CrewAI for agent orchestration. Implemented LangGraph for complex workflow management, enabling researchers to conduct deep analysis with AI assistance.",
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
    date: "December 2024",
    description:
      "Real-time chat application with rooms, presence indicators, and multi-device conversation sync.",
    longDescription:
      "Built a real-time messaging platform using Node.js, Express, and Socket.IO with rooms, presence indicators, and message delivery acknowledgements, backed by MongoDB for reliable multi-device conversations. Implemented JWT authentication, REST APIs, and server-side rate limiting (express-rate-limit / Redis) to mitigate spam and ensure availability, with a React + Socket.IO client and Dockerized backend services for repeatable deployments.",
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
    date: "March 2026",
    description:
      "AI-powered platform for intelligent meeting transcript analysis with hierarchical NLP summarization and action item extraction.",
    longDescription:
      "Built a full-stack meeting intelligence platform with a FastAPI backend and Next.js frontend. Implements a multi-stage NLP pipeline using BERT-based semantic chunking (512-token chunks with 50-token overlap), extractive TextRank summarization, and pattern-based action item extraction with confidence scoring. Features JWT authentication, per-user transcript isolation, full CRUD with re-analysis on edit, and a real-time multi-step progress indicator.",
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
    date: "May 2025",
    description:
      "AI-powered career assistant providing personalized guidance and recommendations.",
    longDescription:
      "Created an intelligent career guidance system using LangChain for natural language processing and Hugging Face models for personalized recommendations. Deployed on Vercel with a modern React interface.",
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
    date: "December 2024",
    description:
      "LSTM-based machine learning model for accurate stock price forecasting.",
    longDescription:
      "Implemented a deep learning solution using LSTM networks with TensorFlow and Keras. Utilized Pandas for data preprocessing and Matplotlib for visualization, achieving high accuracy in stock price predictions.",
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
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">// 03 — projects</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={project.showWorkflow ? "md:col-span-2" : ""}
            >
              <div className="panel rounded-xl p-6 md:p-8 h-full">
                <div className={`flex ${project.showWorkflow ? 'flex-col lg:flex-row gap-6' : 'flex-col'} h-full`}>
                  {/* Left side - Project Details */}
                  <div className={`flex flex-col ${project.showWorkflow ? 'lg:w-[45%]' : 'w-full'}`}>
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground flex-shrink-0">
                        {project.date}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {project.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-secondary text-muted-foreground border border-border font-mono text-xs font-normal"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.github !== "#" && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo !== "#" && (
                        <Button
                          asChild
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Try Now
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Right side - Workflow Animation */}
                  {project.showWorkflow && (
                    <div className="lg:w-[55%] flex items-center justify-end">
                      <div className="w-full h-full">
                        <AgentWorkflowAnimation autoPlay={true} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
