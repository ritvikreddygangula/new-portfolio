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
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">// 01 — about</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
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
            className="col-span-2 md:row-span-2 relative rounded-xl overflow-hidden min-h-[260px] md:min-h-[280px] group border border-border hover:border-primary/40 transition-colors duration-300"
          >
            <Image
              src="/ocean-image.jpg"
              alt="Ocean"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white/90 text-sm italic leading-snug font-mono">
                "The sea teaches patience and power — the same principles I bring to software."
              </p>
            </div>
          </motion.div>

          {/* GPA — col 3, row 1 */}
          <motion.div
            {...tile(0.07)}
            className="panel col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[130px] cursor-default"
          >
            <p className="eyebrow">gpa</p>
            <div>
              <p className="text-6xl font-bold text-primary leading-none">4.0</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">Arizona State Univ.</p>
            </div>
          </motion.div>

          {/* Dean's List — col 4, row 1 */}
          <motion.div
            {...tile(0.14)}
            className="panel col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[130px] cursor-default"
          >
            <p className="eyebrow">recognition</p>
            <div>
              <p className="text-6xl font-bold text-primary leading-none">6×</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">Dean's List · NAMU</p>
            </div>
          </motion.div>

          {/* Currently — col 3-4, row 2 */}
          <motion.div
            {...tile(0.21)}
            className="panel col-span-2 rounded-xl p-5 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="eyebrow mb-0.5">latest</p>
              <p className="text-sm font-medium text-foreground font-mono">
                Back at ASU · SWE Intern @ GCM Grosvenor this past summer
              </p>
            </div>
          </motion.div>

          {/* Education — col 1, row 3 */}
          <motion.div
            {...tile(0.28)}
            className="panel col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[110px] cursor-default"
          >
            <p className="eyebrow">education</p>
            <div>
              <p className="text-sm font-bold text-foreground leading-snug">B.S. Computer Science</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-accent" />
                <p className="text-xs text-muted-foreground font-mono">Tempe, Arizona</p>
              </div>
            </div>
          </motion.div>

          {/* Fun fact — col 2, row 3 */}
          <motion.div
            {...tile(0.35)}
            className="panel col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[110px] cursor-default"
          >
            <p className="eyebrow">fun fact</p>
            <p className="text-sm font-medium text-foreground leading-snug">
              I debug best with ocean waves in the background.
            </p>
          </motion.div>

          {/* AWS — col 3-4, row 3 */}
          <motion.div
            {...tile(0.42)}
            className="panel col-span-2 rounded-xl p-5 flex items-center gap-4"
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
              <p className="eyebrow mb-0.5">certified</p>
              <p className="text-sm font-bold text-foreground">AWS Cloud Practitioner</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
