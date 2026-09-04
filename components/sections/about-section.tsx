"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const facts = [
  { key: "school", value: "Arizona State University" },
  { key: "degree", value: "B.S. Computer Science" },
  { key: "gpa", value: "4.0" },
  { key: "honors", value: "6× Dean's List" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="eyebrow mb-3">// 01 — about</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-foreground leading-relaxed mb-10 max-w-2xl"
        >
          Software Engineer with experience in building AI-powered products
          and backend systems. Most recently a SWE Intern at
          GCM Grosvenor, shipping LLM-powered analytics and backend
          infrastructure for a $96B AUM investment platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="panel rounded-xl overflow-hidden"
        >
          <div className="editor-chrome">
            <div className="flex gap-1.5">
              <span className="editor-dot editor-dot-red" />
              <span className="editor-dot editor-dot-yellow" />
              <span className="editor-dot editor-dot-green" />
            </div>
            <span className="flex-1 text-center text-xs font-mono text-muted-foreground">
              profile.ts
            </span>
            <div className="w-12" />
          </div>

          <div className="p-5 md:p-6 font-mono text-sm space-y-2">
            <p>
              <span className="text-accent">const</span>{" "}
              <span className="text-foreground">profile</span>{" "}
              <span className="text-muted-foreground">=</span>{" "}
              <span className="text-muted-foreground">{"{"}</span>
            </p>
            {facts.map((fact) => (
              <p key={fact.key} className="pl-4">
                <span className="text-accent">{fact.key}</span>
                <span className="text-muted-foreground">:</span>{" "}
                <span className="text-primary">"{fact.value}"</span>
                <span className="text-muted-foreground">,</span>
              </p>
            ))}
            <p className="pl-4 flex items-center gap-2">
              <span className="text-accent">certified</span>
              <span className="text-muted-foreground">:</span>{" "}
              <span className="text-primary">"AWS Cloud Practitioner"</span>
              <span className="text-muted-foreground">,</span>
              <Image
                src="/certifications/aws-ccp-badge.png"
                alt="AWS Certified badge"
                width={20}
                height={20}
                className="object-contain"
                unoptimized
              />
            </p>
            <p>
              <span className="text-muted-foreground">{"}"}</span>
              <span className="text-muted-foreground">;</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
