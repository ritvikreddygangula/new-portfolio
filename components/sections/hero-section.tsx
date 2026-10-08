"use client";

import { useState } from "react";
import { Check, Copy, FileText, Mail } from "lucide-react";
import Image from "next/image";

// What I'm learning right now; update the date whenever this list changes
const nowUpdated = "Oct 2026";
const nowTopics = ["Evaluating LLM systems", "LLM as a judge", "RAG and ways to improve retrieval"];

const channels = [
  { name: "Email", value: "ritvikreddygangula@gmail.com", href: "mailto:ritvikreddygangula@gmail.com" },
  { name: "GitHub", value: "github.com/ritvikreddygangula", href: "https://github.com/ritvikreddygangula" },
  { name: "LinkedIn", value: "linkedin.com/in/gritvik", href: "https://linkedin.com/in/gritvik" },
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const channel = channels[active];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(channel.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = channel.href;
    }
  };

  return (
    <section id="top" className="px-5 pt-12 pb-10 md:px-8 md:pt-14 md:pb-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
        <div>
          <h1 className="display display-hero text-foreground">
            Ritvik
            <br />
            Reddy
            <br />
            Gangula
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/85">
            Software engineer building backend systems that stay up when parts
            of them fail, and the AI agents that run on top of them. Computer
            science at Arizona State, graduating May 2027.
          </p>

          <div className="mt-8 flex flex-wrap">
            <a
              href="https://drive.google.com/file/d/1Cftg989Ngyrtr3NPd3cSpAB34iSJRukc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              <FileText className="h-3.5 w-3.5" />
              View resume
            </a>
            <a href="#projects" className="btn btn-line -ml-px">
              See projects
            </a>
          </div>

          {/* Reach-me box, styled after a terminal install snippet */}
          <div className="mt-10 max-w-md">
            <p className="label text-muted-foreground mb-2">Reach me</p>
            <div className="border border-primary/60 bg-card">
              <div role="tablist" aria-label="Contact channel" className="grid grid-cols-3 border-b border-primary/30">
                {channels.map((c, i) => (
                  <button
                    key={c.name}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => {
                      setActive(i);
                      setCopied(false);
                    }}
                    className={`label py-2 transition-colors ${
                      active === i
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-primary"
                    } ${i > 0 ? "border-l border-primary/30" : ""}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="truncate font-mono text-[0.8125rem] text-foreground hover:text-primary"
                >
                  {channel.value}
                </a>
                <button
                  onClick={copy}
                  className="flex shrink-0 items-center gap-1.5 label text-foreground/70 hover:text-primary"
                  aria-live="polite"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Portrait + what I'm exploring right now */}
        <div className="w-full max-w-[21rem] justify-self-center lg:justify-self-end space-y-5">
          <figure className="plate bg-card p-2">
            <div className="relative aspect-[4/5]">
              <Image
                src="/headshot.webp"
                alt="Ritvik Reddy Gangula"
                fill
                priority
                sizes="(min-width: 1024px) 336px, 80vw"
                className="object-cover"
              />
            </div>
          </figure>

          <div id="now" className="border border-primary/60 bg-card">
            <div className="flex items-center justify-between border-b border-primary/30 px-3 py-2">
              <p className="label text-primary">Now exploring</p>
              <p className="label text-muted-foreground">{nowUpdated}</p>
            </div>
            <ul className="px-3 py-2">
              {nowTopics.map((topic) => (
                <li key={topic} className="flex items-baseline gap-2.5 py-1.5 text-[0.95rem] text-foreground">
                  <span className="label text-primary" aria-hidden="true">+</span>
                  {topic}
                </li>
              ))}
            </ul>
            <a
              href="mailto:ritvikreddygangula@gmail.com?subject=Evals%20and%20RAG"
              className="flex items-center justify-between gap-3 border-t border-primary/30 px-3 py-2.5 text-sm text-foreground/85 hover:text-primary transition-colors"
            >
              Exploring the same? Ping me, happy to chat.
              <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
