"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Award } from "lucide-react";

const CREDLY_URL =
  "https://www.credly.com/badges/df742b24-8333-4285-8e6d-6c00caf0a15e/public_url";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    level: "Foundational",
    issuer: "Amazon Web Services",
    verifyUrl: CREDLY_URL,
    badgeSrc: "/certifications/aws-ccp-badge.png",
    description:
      "Validates foundational, high-level understanding of AWS services, cloud concepts, and architecture.",
  },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </motion.div>

        <TooltipProvider>
          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-sm"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View verification on Credly"
                      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
                      aria-label={`View ${cert.name} on Credly`}
                    >
                      <Card className="card-premium p-6 h-full group relative overflow-hidden border-accent/20 hover:border-accent/50 transition-colors cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted/50 flex items-center justify-center ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all duration-300 group-hover:scale-105">
                              <Image
                                src={cert.badgeSrc}
                                alt={`${cert.name} badge`}
                                width={128}
                                height={128}
                                className="object-contain p-1"
                                unoptimized
                              />
                            </div>
                            <div className="absolute -top-1 -right-1 rounded-full bg-accent/90 p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="h-3.5 w-3.5 text-accent-foreground" />
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 w-4 text-accent flex-shrink-0" />
                            <h3
                              className="font-semibold text-lg leading-tight"
                              style={{ color: "var(--foreground)" }}
                            >
                              {cert.name}
                            </h3>
                          </div>

                          <Badge
                            variant="secondary"
                            className="mb-3 bg-accent/15 text-accent border-accent/25 text-xs"
                          >
                            {cert.level}
                          </Badge>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                            {cert.description}
                          </p>

                          <span className="text-xs text-accent font-medium inline-flex items-center gap-1 group-hover:underline">
                            Verify on Credly
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        </div>
                      </Card>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    Open verification on Credly
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
