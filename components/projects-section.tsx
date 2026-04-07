"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { RippleButton } from "@/components/RippleButton";

const AgentWorkflowAnimation = dynamic(
  () => import("@/components/AgentWorkflowAnimation"),
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
    <section id="projects" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            style={{ color: "var(--foreground)" }}
          >
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={project.showWorkflow ? "md:col-span-2" : ""}
            >
              <Card className="card-premium p-8 h-full group relative overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-border"
                       style={{
                         padding: '2px',
                         WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                         WebkitMaskComposite: 'xor',
                         maskComposite: 'exclude'
                       }} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`flex ${project.showWorkflow ? 'flex-col lg:flex-row gap-6' : 'flex-col'} h-full relative z-10`}>
                  {/* Left side - Project Details */}
                  <div className={`flex flex-col ${project.showWorkflow ? 'lg:w-[45%]' : 'w-full'}`}>
                    <h3 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-5 leading-relaxed text-sm">
                      {project.description}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {project.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mt-1.5 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-primary/20 text-primary border-primary/40 text-xs hover:bg-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 cursor-default"
                            style={{
                              animationDelay: `${i * 50}ms`,
                            }}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.github !== "#" && (
                        <RippleButton
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 hover:border-primary transition-all duration-200"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </RippleButton>
                      )}
                      {project.demo !== "#" && (
                        <RippleButton
                          asChild
                          size="sm"
                          className="btn-premium text-primary-foreground font-semibold"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Try Now
                          </a>
                        </RippleButton>
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
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
