"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="chip copy" onClick={copy}>
      <span className="chip__dot" aria-hidden="true" />
      <span aria-live="polite">{copied ? "Copied" : "Copy email address"}</span>
    </button>
  );
}
