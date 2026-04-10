"use client";

import { Card } from "@/components/ui/card";
import { GraduationCap, Award, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { value: "4.0", label: "GPA", icon: "🎓" },
  { value: "5×", label: "Dean's List", icon: "🏆" },
  { value: "3+", label: "Years Building", icon: "⚡" },
  { value: "AWS", label: "Certified", icon: "☁️" },
];

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
          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* B — single strong paragraph */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              CS student at Arizona State University focused on full-stack development,
              backend engineering, and applied AI — building production-ready systems
              that solve real problems and scale reliably.
            </p>

            {/* E — Currently line */}
            <div className="flex items-center gap-3 py-3 px-4 rounded-xl border border-accent/30 bg-accent/5">
              <Briefcase className="h-4 w-4 text-accent flex-shrink-0" />
              <p className="text-sm">
                <span className="font-semibold text-accent">Currently:</span>
                <span className="text-muted-foreground ml-1">Building AI tools & seeking Summer 2026 internships</span>
              </p>
            </div>

            {/* A — stat callouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-4 text-center border-accent/20 hover:border-accent/40 transition-colors duration-200 group">
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-200">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Education + Recognition condensed */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-accent" />
                <span>B.S. Computer Science · Arizona State University</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-accent" />
                <span>NAMU Scholar</span>
              </div>
            </div>
          </motion.div>

          {/* Right — image with D overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20 p-1.5 shadow-lg group">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
                <Image
                  src="/ocean-image.jpg"
                  alt="Ocean"
                  fill
                  sizes="(max-width: 768px) 100vw, 28rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* D — quote overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white/90 text-sm italic leading-snug">
                    "The sea teaches patience and power — the same principles I bring to software."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
