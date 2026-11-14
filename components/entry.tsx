"use client";

import { useState, type ReactNode } from "react";

/**
 * One row of Experience or Projects. Title, summary and results are always visible;
 * the detail list folds open. Links stay outside the fold so they are one click away.
 */
export function Entry({
  id,
  title,
  role,
  aside,
  summary,
  marks,
  links,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  role?: string;
  aside: ReactNode;
  summary: string;
  marks: string[];
  links?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panel = `${id}-panel`;

  const toggle = () => {
    setOpen((v) => !v);
    // Page height changes once the fold settles; scroll-linked motion re-measures.
    window.setTimeout(() => window.dispatchEvent(new Event("layout")), 560);
  };

  return (
    <li className="entry" data-open={open} data-reveal="">
      <div className="entry__aside">{aside}</div>
      <div className="entry__main">
        <h3 className="entry__title">
          <button type="button" className="entry__toggle" aria-expanded={open} aria-controls={panel} onClick={toggle}>
            <span className="entry__name">{title}</span>
            <span className="entry__more">
              <span className="entry__word">{open ? "Close" : "Details"}</span>
              <span className="entry__plus" aria-hidden="true" />
            </span>
          </button>
        </h3>
        {role && <p className="entry__role">{role}</p>}
        <p className="entry__sum">{summary}</p>
        <ul className="marks">
          {marks.map((mark) => (
            <li key={mark}>{mark}</li>
          ))}
        </ul>
        {links}
        <div className="fold" id={panel}>
          <div className="fold__in" inert={!open}>
            <div className="fold__pad">{children}</div>
          </div>
        </div>
      </div>
    </li>
  );
}
