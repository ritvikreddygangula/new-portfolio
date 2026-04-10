"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Briefcase, MapPin } from "lucide-react";

const tile = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: "easeOut" as const },
  viewport: { once: true },
});

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </motion.div>

        {/*
          Desktop 4-col grid layout:
          Row 1: [ Ocean 2col ] [ GPA ]     [ Dean's ]
          Row 2: [ Ocean 2col ] [ Currently          ]
          Row 3: [ Education ] [ Fun Fact ] [ AWS 2col]
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          {/* Ocean photo — col 1-2, row 1-2 */}
          <motion.div
            {...tile(0)}
            className="col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[280px] group border border-border/30 hover:border-accent/30 transition-colors duration-300"
          >
            <Image
              src="/ocean-image.jpg"
              alt="Ocean"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/90 text-sm italic leading-snug">
                "The sea teaches patience and power — the same principles I bring to software."
              </p>
            </div>
          </motion.div>

          {/* GPA — col 3, row 1 */}
          <motion.div
            {...tile(0.07)}
            className="col-span-1 rounded-2xl p-5 flex flex-col justify-between min-h-[130px] border border-border/30 hover:border-accent/40 transition-colors duration-300 cursor-default"
            style={{ background: "var(--secondary)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">GPA</p>
            <div>
              <p className="text-6xl font-bold text-primary leading-none">4.0</p>
              <p className="text-xs text-muted-foreground mt-1">Arizona State Univ.</p>
            </div>
          </motion.div>

          {/* Dean's List — col 4, row 1 */}
          <motion.div
            {...tile(0.14)}
            className="col-span-1 rounded-2xl p-5 flex flex-col justify-between min-h-[130px] border border-border/30 hover:border-accent/40 transition-colors duration-300 cursor-default"
            style={{ background: "var(--muted)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recognition</p>
            <div>
              <p className="text-6xl font-bold text-primary leading-none">5×</p>
              <p className="text-xs text-muted-foreground mt-1">Dean's List · NAMU</p>
            </div>
          </motion.div>

          {/* Currently — col 3-4, row 2 */}
          <motion.div
            {...tile(0.21)}
            className="col-span-2 rounded-2xl p-5 flex items-center gap-4 border border-border/30 hover:border-accent/40 transition-colors duration-300"
            style={{ background: "color-mix(in srgb, var(--accent) 10%, var(--card))" }}
          >
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-accent" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-0.5">Currently</p>
              <p className="text-sm font-medium text-foreground">Building AI tools & seeking Summer 2026 SWE internships</p>
            </div>
          </motion.div>

          {/* Education — col 1, row 3 */}
          <motion.div
            {...tile(0.28)}
            className="col-span-1 rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-border/30 hover:border-accent/40 transition-colors duration-300 cursor-default"
            style={{ background: "var(--card)" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Education</p>
            <div>
              <p className="text-sm font-bold text-foreground leading-snug">B.S. Computer Science</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-accent" />
                <p className="text-xs text-muted-foreground">Tempe, Arizona</p>
              </div>
            </div>
          </motion.div>

          {/* Fun fact — col 2, row 3 */}
          <motion.div
            {...tile(0.35)}
            className="col-span-1 rounded-2xl p-5 flex flex-col justify-between min-h-[110px] border border-border/30 hover:border-accent/40 transition-colors duration-300 cursor-default"
            style={{ background: "color-mix(in srgb, var(--primary) 10%, var(--card))" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Fun fact</p>
            <p className="text-sm font-medium text-foreground leading-snug">
              I debug best with ocean waves in the background.
            </p>
          </motion.div>

          {/* AWS — col 3-4, row 3 */}
          <motion.div
            {...tile(0.42)}
            className="col-span-2 rounded-2xl p-5 flex items-center gap-4 border border-border/30 hover:border-accent/40 transition-colors duration-300"
            style={{ background: "var(--secondary)" }}
          >
            <Image
              src="/certifications/aws-ccp-badge.png"
              alt="AWS Certified"
              width={48}
              height={48}
              className="object-contain"
              unoptimized
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Certified</p>
              <p className="text-sm font-bold text-foreground">AWS Cloud Practitioner</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
