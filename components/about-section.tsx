"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 p-1.5 shadow-lg">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/ocean-image.jpg"
                  alt="Ocean"
                  fill
                  sizes="(max-width: 768px) 100vw, 28rem"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I’m a Computer Science student at Arizona State University with a
              4.0 GPA, focused on full-stack development, backend engineering,
              and applied AI. I build production-ready systems that solve real
              problems, scale reliably, and emphasize clean architecture and
              system reliability.{" "}
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
            Outside of code, I’m drawn to the sea for its balance of calm and power, a perspective that shapes how I design software. I’m especially interested in the intersection of AI and web development, where thoughtful engineering and intelligent automation come together to create resilient, scalable systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Card className="p-6 border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold">Education</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  B.S. Computer Science
                  <br />
                  Arizona State University
                  <br />
                  GPA: 4.0/4.0
                </p>
              </Card>

              <Card className="p-6 border-accent/20">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-6 w-6 text-accent" />
                  <h3 className="font-semibold">Recognition</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dean's List (5x)
                  <br />
                  Fall 2023, Spring 2024, Fall 2024, Spring 2025
                  <br />
                  NAMU Scholar ($108,000)
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
