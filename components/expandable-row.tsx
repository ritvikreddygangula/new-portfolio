"use client";

import { Plus } from "lucide-react";
import type { ReactNode } from "react";

/**
 * One entry in a dotted-rule list: title, meta and a short summary are always
 * visible; the details expand with a height transition when the row is opened.
 */
export function ExpandableRow({
  id,
  title,
  subtitle,
  meta,
  summary,
  highlights,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  meta: ReactNode;
  summary: string;
  highlights: string[];
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const panelId = `${id}-panel`;
  return (
    <li className="rule-dotted">
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group w-full grid grid-cols-[1fr_auto] md:grid-cols-[1fr_14rem_auto] items-baseline gap-x-6 gap-y-1 py-6 text-left"
      >
        <span>
          <span className="display display-title block text-foreground group-hover:text-primary transition-colors">
            {title}
          </span>
          {subtitle && <span className="mt-1 block text-muted-foreground">{subtitle}</span>}
        </span>
        <span className="hidden md:block label text-muted-foreground text-right">{meta}</span>
        <Plus
          className={`h-5 w-5 self-center text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div className="pb-6 -mt-2">
        <p className="md:hidden label text-muted-foreground mb-3">{meta}</p>
        <p className="text-foreground/85 max-w-3xl">{summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {highlights.map((h) => (
            <li key={h} className="label border border-primary/50 px-2.5 py-1 text-primary">
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="pb-8">{children}</div>
        </div>
      </div>
    </li>
  );
}

export function DetailList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr] leading-relaxed text-muted-foreground">
          <span className="label text-primary pt-[0.3em]" aria-hidden="true">
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
