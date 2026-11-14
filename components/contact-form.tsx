"use client";

import { useState } from "react";

type Status = { kind: "idle" | "error" | "ok" | "sending"; text: string };

export function ContactForm({ endpoint }: { endpoint: string }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fail = (text: string) => setStatus({ kind: "error", text });
    if (!form.name.trim()) return fail("Please enter your name.");
    if (!form.email.trim()) return fail("Please enter your email.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return fail("Please enter a valid email address.");
    if (!form.message.trim()) return fail("Please enter a message.");

    setStatus({ kind: "sending", text: "Sending..." });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus({ kind: "ok", text: "Message sent! I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      fail("Failed to send message. Please try again.");
    }
  };

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" value={form.name} onChange={change} placeholder="Your name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={change}
          placeholder="your.email@example.com"
        />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={change}
          placeholder="Tell me about your project or just say hello!"
        />
      </div>
      <div className="form__foot">
        <button type="submit" className="btn btn--solid" disabled={status.kind === "sending"}>
          <span>{status.kind === "sending" ? "Sending..." : "Send Message"}</span>
        </button>
        <p className="form__status" role="status" data-kind={status.kind}>
          {status.kind === "sending" ? "" : status.text}
        </p>
      </div>
    </form>
  );
}
