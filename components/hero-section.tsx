"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="profile-image-container mb-6 flex justify-center">
          <img
            src="/r1.jpg"
            alt="Profile Picture"
            className="profile-image"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "1rem",
              boxShadow: "0 4px 32px rgba(107,63,29,0.10)",
              border: "4px solid #fff7ed",
              maxWidth: "90vw",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.04)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-shimmer font-orbitron">
            Ritvik Reddy
          </h1>
          <div className="text-xl md:text-2xl font-semibold mb-4 text-muted-foreground">
            Hi, I am
            <span className="ml-2 text-primary">
              <Typewriter
                words={[
                  "an AI agentic developer",
                  "a Dean's list student",
                  "a Data Analyst",
                  "a Software Developer",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={90}
                delaySpeed={1200}
              />
            </span>
          </div>
          <p className="text-lg text-muted-foreground/80 mb-8 max-w-2xl mx-auto text-pretty leading-relaxed">
            Building intelligent apps and automation tools with AI, Cloud, and
            modern web technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="btn-premium text-primary-foreground font-semibold px-8 py-3 text-lg"
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="glass hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
            >
              <a
                href="https://github.com/ritvikreddygangula"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="glass hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
            >
              <a
                href="https://linkedin.com/in/gritvik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="glass hover:bg-primary/10 transition-all duration-300 hover:scale-110 bg-transparent"
            >
              <a href="mailto:ritvikreddygangula@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce">
          <ArrowDown className="h-6 w-6 text-accent drop-shadow-lg" />
        </div>
      </motion.div>
    </section>
  );
}
