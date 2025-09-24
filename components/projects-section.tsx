"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Trading Simulation",
    date: "July 2025",
    description:
      "Distributed AI agents system for automated trading with advanced decision-making capabilities.",
    longDescription:
      "Built a sophisticated multi-agent trading system using CrewAI framework with Docker containerization. Integrated OpenAI APIs for intelligent decision-making, resulting in 35% faster trade execution compared to traditional methods.",
    technologies: [
      "CrewAI",
      "Docker",
      "OpenAI API",
      "Python",
      "Distributed Systems",
    ],
    achievements: [
      "35% faster trades",
      "Multi-agent coordination",
      "Real-time decision making",
    ],
    github: "https://github.com/ritvikreddygangula/trading-simulation",
    demo: "#",
  },
  {
    title: "Multi Agent Research Team",
    date: "June 2025",
    description:
      "Multi-agent research system with intuitive UI for comprehensive data analysis and insights.",
    longDescription:
      "Developed a collaborative AI research platform using Gradio for the frontend and CrewAI for agent orchestration. Implemented LangGraph for complex workflow management, enabling researchers to conduct deep analysis with AI assistance.",
    technologies: ["Gradio", "CrewAI", "LangGraph", "Python", "AI Agents"],
    achievements: [
      "Multi-agent collaboration",
      "Interactive UI",
      "Complex workflow management",
    ],
    github: "https://github.com/ritvikreddygangula/multi-agent-research-team",
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
            >
              <Card className="card-premium p-8 h-full group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col h-full relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-accent" />
                    {project.date}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-sm text-accent">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {project.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="glass bg-primary/10 text-primary border-primary/20 text-xs hover:bg-primary/20 transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <Button
                      asChild
                      className="btn-premium text-primary-foreground font-semibold px-8 py-3 text-lg"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
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
