"use client"

import { Card } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"

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
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                <div className="w-64 h-64 bg-muted rounded-xl flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
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
              I'm a passionate Computer Science student at Arizona State University with a perfect 4.0 GPA, specializing
              in AI, machine learning, and full-stack development. I love building intelligent applications that solve
              real-world problems and create meaningful user experiences.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My expertise spans across modern web technologies, AI/ML frameworks, and cloud platforms. I'm particularly
              interested in the intersection of artificial intelligence and web development, creating scalable agentic and autonomous solutions
              that leverage the power of both domains.
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
                  Dean's List
                  <br />
                  Fall 2023 – Spring 2025
                  <br />
                  Academic Excellence
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
