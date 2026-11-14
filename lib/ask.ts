// The hero's retrieval, run for real in the browser over this site's own content.
// Passages come from data/site.ts and are quoted verbatim; nothing is generated.
// BM25 ranks them, then a rule plays the judge: weak passages are dropped, and
// when nothing clears the bar the page refuses instead of guessing.
import { about, contact, experiences, hero, projects, site, skillCategories } from "@/data/site";

export type Passage = {
  id: number;
  source: string; // where it comes from; the eval checks this
  part: string; // which piece of that source, so two passages never share a label
  href: string; // where to read it in context
  text: string; // shown verbatim
  extra: string; // indexed, not shown (titles, stack names)
};

export type Hit = { passage: Passage; score: number; rel: number; kept: boolean };
export type Result = { hits: Hit[]; kept: Hit[]; grounded: boolean };

const plain = (s: string) => s.replace(/\*\*/g, "");

function build(): Passage[] {
  const list: Omit<Passage, "id">[] = [];
  const add = (source: string, part: string, href: string, text: string, extra = "") =>
    list.push({ source, part, href, text: plain(text), extra });

  add("About", "statement", "/#about", about.statement, "who is he about background");
  add(
    "About",
    "facts",
    "/#about",
    about.facts.map((f) => `${f.term}: ${f.detail}`).join(". ") + ".",
    "study student university college education school degree asu graduate certification",
  );
  add("About", "karate", "/#about", about.karate.text, "karate black belt martial arts discipline practice hobby outside work teach taught");
  add(
    "Now exploring",
    "topics",
    "/#top",
    `Now exploring: ${about.now.topics.join(", ")}.`,
    "learning currently interested interests",
  );

  for (const e of experiences) {
    const extra = `${e.company} ${e.title} ${e.location} ${e.stack.join(" ")} work job intern internship built`;
    add(e.company, "role", "/#experience", e.summary, extra);
    e.achievements.forEach((a, i) => add(e.company, `result ${i + 1}`, "/#experience", a, `${e.company} ${e.title}`));
  }
  for (const p of projects) {
    const extra = `${p.title} project ${p.technologies.join(" ")} ${p.highlights.join(" ")}`;
    add(p.title, "overview", "/#projects", p.description, extra);
    const long = p.achievements.filter((a) => a.length >= 60);
    const short = p.achievements.filter((a) => a.length < 60);
    long.forEach((a, i) => add(p.title, `detail ${i + 1}`, "/#projects", a, p.title));
    if (short.length) add(p.title, "details", "/#projects", short.join(". ") + ".", p.title);
  }
  for (const c of skillCategories) add("Skills", c.title.toLowerCase(), "/#skills", `${c.title}: ${c.skills.join(", ")}.`, "skills know stack tools languages");
  add(
    "Contact",
    "channels",
    "/#contact",
    `${contact.intro} Email ${site.email}, or find me at ${site.linkedin.label} and ${site.github.label}.`,
    "contact reach hire hiring email message talk recruit",
  );
  return list.map((p, id) => ({ ...p, id }));
}

const STOP = new Set(
  "a an and are as at be been but by can did do does for from had has have he her him his how i if in into is it its me my of on or our she so than that the their them they this to was we were what when where which who why will with you your about him's".split(" "),
);

// Query words are widened to the vocabulary the passages actually use.
const WIDEN: Record<string, string[]> = {
  rag: ["retrieval", "grounded"],
  llm: ["gpt", "openai", "agent"],
  ai: ["agent", "llm", "gpt", "openai", "langgraph"],
  evaluate: ["eval", "gated", "accuracy", "labeled", "verifier"],
  evaluation: ["eval", "gated", "accuracy", "labeled", "verifier"],
  evals: ["eval", "gated", "accuracy", "labeled"],
  judge: ["verifier", "critic", "eval"],
  output: ["finding"],
  crash: ["kill", "failover", "recovered", "fault"],
  survive: ["recovered", "failover", "replicated"],
  fail: ["failover", "kill", "fault", "recovered"],
  failure: ["failover", "kill", "fault", "recovered"],
  die: ["kill", "failover"],
  production: ["clients", "serving", "deployed"],
  shipped: ["engineered", "built", "deployed"],
  study: ["university", "degree", "school"],
  school: ["university", "degree"],
  college: ["university", "degree"],
  distributed: ["raft", "kafka", "replicated"],
  backend: ["api", "apis", "service"],
  fast: ["latency", "faster"],
  performance: ["latency", "faster", "render"],
  cloud: ["aws", "azure"],
  hire: ["contact", "email", "opportunities"],
  reach: ["contact", "email"],
  agents: ["langgraph", "crewai", "mcp"],
};

const stem = (w: string) => {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("es")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
};
const words = (s: string) => (s.toLowerCase().match(/[a-z0-9#+]+/g) ?? []).filter((w) => !STOP.has(w));
const tokens = (s: string) => words(s).map(stem);

export const passages = build();

type Doc = { tf: Map<string, number>; len: number };
const docs: Doc[] = passages.map((p) => {
  const tf = new Map<string, number>();
  // The visible text counts in full; titles and stack names count for less.
  for (const t of tokens(`${p.source} ${p.text}`)) tf.set(t, (tf.get(t) ?? 0) + 1);
  for (const t of new Set(tokens(p.extra))) tf.set(t, (tf.get(t) ?? 0) + 0.6);
  let len = 0;
  tf.forEach((v) => (len += v));
  return { tf, len };
});
const avg = docs.reduce((n, d) => n + d.len, 0) / docs.length;
const df = new Map<string, number>();
docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)));
const idf = (t: string) => Math.log(1 + (docs.length - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));

const K1 = 1.4;
const B = 0.7;
const SHOW = 5; // passages retrieved
const KEEP = 3; // most the judge lets through
const FLOOR = 2.4; // below this the best passage is not good enough to answer from
const RATIO = 0.55; // a kept passage must score at least this share of the best

export function ask(question: string): Result {
  const weights = new Map<string, number>();
  for (const w of words(question)) {
    weights.set(stem(w), 1);
    for (const extra of WIDEN[w] ?? WIDEN[stem(w)] ?? []) {
      const t = stem(extra);
      if (!weights.has(t)) weights.set(t, 0.45);
    }
  }
  const scored = docs.map((d, i) => {
    let score = 0;
    weights.forEach((weight, t) => {
      const f = d.tf.get(t);
      if (!f) return;
      score += weight * idf(t) * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / avg)));
    });
    return { passage: passages[i], score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored[0]?.score ?? 0;
  const grounded = top >= FLOOR;
  let n = 0;
  const hits: Hit[] = scored
    .slice(0, SHOW)
    .filter((h) => h.score > 0)
    .map((h) => {
      const kept = grounded && h.score >= top * RATIO && n < KEEP;
      if (kept) n++;
      return { ...h, rel: top ? h.score / top : 0, kept };
    });
  return { hits, kept: hits.filter((h) => h.kept), grounded };
}

// The sample questions double as an eval set, run on every load.
export function evaluate() {
  let pass = 0;
  for (const s of hero.questions) {
    const r = ask(s.q);
    const got = r.grounded ? r.hits[0]?.passage.source ?? null : null;
    if (got === s.expect) pass++;
  }
  return { pass, total: hero.questions.length };
}
