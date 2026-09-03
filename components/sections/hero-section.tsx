"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-32 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10 w-full flex flex-col items-center text-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          src="/r1.jpg"
          alt="Ritvik Reddy Gangula"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover mb-6 border border-border"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="w-full panel rounded-xl overflow-hidden text-left"
        >
          <div className="editor-chrome">
            <div className="flex gap-1.5">
              <span className="editor-dot editor-dot-red" />
              <span className="editor-dot editor-dot-yellow" />
              <span className="editor-dot editor-dot-green" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-muted-foreground">
              ritvik.ts
            </span>
            <div className="w-12" />
          </div>

          <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed overflow-x-auto">
            <p>
              <span className="text-accent">const</span>{" "}
              <span className="text-foreground">ritvik</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-muted-foreground">{"{"}</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">name</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">"Ritvik Reddy Gangula"</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">role</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">"Software Engineer"</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">school</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">"Arizona State University"</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-4">
              <span className="text-accent">latest</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">"SWE Intern @ GCM Grosvenor"</span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p className="pl-4 flex flex-wrap items-baseline gap-1">
              <span className="text-accent">focus</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">
                "
                <Typewriter
                  words={[
                    "AI-powered products",
                    "backend systems",
                    "cloud infrastructure",
                    "developer tools",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={55}
                  deleteSpeed={35}
                  delaySpeed={1400}
                />
                "
              </span>
              <span className="text-muted-foreground">,</span>
            </p>
            <p>
              <span className="text-muted-foreground">{"}"}</span>
              <span className="text-muted-foreground">;</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8"
        >
          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6"
          >
            View My Work
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-border text-foreground hover:border-primary/50 hover:bg-primary/5 font-semibold px-6"
          >
            <a
              href="https://drive.google.com/file/d/1ljn3LtcAytQhGw48tADiptlbSmsuOvc5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border hover:border-primary/50 hover:bg-primary/5"
            >
              <a
                href="https://github.com/ritvikreddygangula"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border hover:border-primary/50 hover:bg-primary/5"
            >
              <a
                href="https://linkedin.com/in/gritvik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button
              variant="outline"
              size="icon"
              asChild
              className="border-border hover:border-primary/50 hover:bg-primary/5"
            >
              <a href="mailto:ritvikreddygangula@gmail.com">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="eyebrow">scroll</span>
        <div className="animate-bounce">
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
