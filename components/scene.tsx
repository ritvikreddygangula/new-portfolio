"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import type { SceneName } from "@/data/site";

/**
 * A small looping picture of what each project does. The markup alone is the finished
 * frame, so reduced motion and no-JS visitors see a complete drawing. With motion on,
 * a GSAP timeline replays it, and only while the picture is on screen.
 */

type Q = (selector: string) => Element[];
type Build = (tl: gsap.core.Timeline, q: Q) => void;

const s = (name: string) => `[data-s="${name}"]`;
const drawn = { strokeDashoffset: 1 };

function Bar({ x, y, w, tone = "bar", name }: { x: number; y: number; w: number; tone?: string; name?: string }) {
  return <rect x={x} y={y} width={w} height={3} rx={1.5} className={`sc-${tone}`} data-s={name} />;
}

function Label({ x, y, end, name, children }: { x: number; y: number; end?: boolean; name?: string; children: ReactNode }) {
  return (
    <text x={x} y={y} className="sc-t" textAnchor={end ? "end" : undefined} data-s={name}>
      {children}
    </text>
  );
}

function Tick({ x, y, name }: { x: number; y: number; name?: string }) {
  return <path d={`M${x} ${y}l2.2 2.2l4-4.6`} className="sc-tick" pathLength={1} strokeDasharray={1} data-s={name} />;
}

/* ---------------------------------------------------------------- drawings */

// TagAlong: the board is read term by term; a pointer plus the word "this" becomes a whisper.
function Point() {
  return (
    <>
      <Label x={8} y={10}>board</Label>
      <rect x={8} y={15} width={96} height={56} rx={4} className="sc-card" />
      <rect x={30} y={22} width={34} height={15} rx={3} className="sc-hl" data-s="hit" />
      {[[30, 22, 34, 15], [30, 47, 34, 15], [80, 35, 14, 15]].map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx={3} className="sc-win sc-win--read" data-s="box" />
      ))}
      <text x={47} y={33.4} className="sc-math">x + 3</text>
      <line x1={27} x2={67} y1={42} y2={42} className="sc-series sc-series--thin" />
      <text x={47} y={58.4} className="sc-math">x − 1</text>
      <text x={73.5} y={46.2} className="sc-math">=</text>
      <text x={87} y={46.4} className="sc-math">2</text>
      <circle cx={58} cy={26} r={3} className="sc-laser" data-s="laser" />

      <Label x={112} y={10}>teacher</Label>
      <g data-s="say">
        <rect x={112} y={15} width={40} height={17} rx={8.5} className="sc-accfill" />
        <text x={132} y={26} className="sc-t sc-t--onacc" textAnchor="middle">“this”</text>
      </g>
      <Label x={112} y={47}>student</Label>
      <g data-s="ear">
        <circle cx={118} cy={63} r={5.5} className="sc-card" />
        <circle cx={118} cy={63} r={2} className="sc-accfill" />
      </g>
      {[8.5, 12, 15.5].map((r) => (
        <path key={r} d={`M${118 + r * 0.72} ${63 - r * 0.7}a${r} ${r} 0 0 1 0 ${r * 1.4}`} className="sc-wire sc-wire--two" data-s="wave" />
      ))}
      <g data-s="heard">
        <rect x={8} y={79} width={144} height={17} rx={5} className="sc-card" />
        <Label x={15} y={89.6}>hears: “the x plus 3 on top”</Label>
      </g>
    </>
  );
}

// DeltaLedger: two filings compared; one change is cited, an unsupported one is dropped.
function Diff() {
  const widths = [34, 28, 32, 22, 34, 26, 30];
  return (
    <>
      <Label x={8} y={10}>before</Label>
      <Label x={58} y={10}>after</Label>
      <Label x={112} y={10}>findings</Label>
      <rect x={8} y={15} width={44} height={80} rx={4} className="sc-card" />
      <rect x={58} y={15} width={44} height={80} rx={4} className="sc-card" />
      <rect x={60.5} y={40} width={39} height={9} rx={2} className="sc-hl" data-s="hl" />
      <rect x={60.5} y={70} width={39} height={9} rx={2} className="sc-hl" data-s="hl" />
      {widths.map((w, i) => (
        <g key={i}>
          <Bar x={13} y={23 + i * 10} w={w} />
          <Bar x={63} y={23 + i * 10} w={i === 2 ? 31 : i === 5 ? 33 : w} tone={i === 2 || i === 5 ? "acc" : "bar"} />
        </g>
      ))}
      <line x1={6} x2={104} y1={0} y2={0} className="sc-scan" opacity={0} data-s="scan" />

      <g data-s="kept">
        <line x1={102} x2={112} y1={44.5} y2={44.5} className="sc-wire" />
        <rect x={112} y={36} width={40} height={17} rx={5} className="sc-card" />
        <Tick x={117} y={45} name="tick" />
        <Label x={127} y={46.6}>cited</Label>
      </g>
      <g data-s="dropped" opacity={0.5}>
        <line x1={102} x2={112} y1={74.5} y2={74.5} className="sc-wire" />
        <rect x={112} y={66} width={40} height={17} rx={5} className="sc-card sc-card--dash" />
        <Label x={117} y={76.6}>dropped</Label>
        <line x1={115} x2={149} y1={74.5} y2={74.5} className="sc-strike" pathLength={1} strokeDasharray={1} data-s="strike" />
      </g>
    </>
  );
}

// Forge: jobs keep landing on workers while the leader fails and another takes over.
function Failover() {
  const cx = [44, 80, 116];
  const wx = (i: number) => 12 + i * 14.2;
  return (
    <>
      <Label x={8} y={10}>coordinators</Label>
      <Label x={152} y={10} end name="ms">145 ms failover</Label>
      {cx.map((x) => (
        <g key={x}>
          <circle cx={x} cy={32} r={8} className="sc-card" />
          <circle cx={x} cy={32} r={3} className="sc-ink" />
        </g>
      ))}
      <g data-s="dead" opacity={0}>
        <circle cx={44} cy={32} r={8} className="sc-down" />
        <path d="M40.5 28.5l7 7m0-7l-7 7" className="sc-cross" />
      </g>
      <g data-s="lead">
        <circle cx={44} cy={32} r={12} className="sc-ring" />
        <Label x={36} y={54}>leader</Label>
      </g>
      <Label x={8} y={72}>workers</Label>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={wx(i)} y={78} width={9} height={9} rx={2} className="sc-card" />
      ))}
      {[1, 3, 6, 8].map((i) => (
        <rect key={i} x={wx(i)} y={78} width={9} height={9} rx={2} className="sc-done" data-s="done" />
      ))}
      {[0, 1].map((i) => (
        <circle key={i} cx={44} cy={32} r={2.3} className="sc-accfill" opacity={0} data-s={`a${i}`} />
      ))}
      {[0, 1].map((i) => (
        <circle key={i} cx={116} cy={32} r={2.3} className="sc-accfill" opacity={0} data-s={`b${i}`} />
      ))}
    </>
  );
}

// Deep research: one topic, sub-questions researched in parallel, one sourced report.
function Fan() {
  const lines = [38, 42, 34, 42, 30, 40, 24];
  return (
    <>
      <Label x={8} y={10}>topic</Label>
      <g data-s="topic">
        <rect x={8} y={15} width={64} height={13} rx={6.5} className="sc-card" />
        <Bar x={14} y={20} w={40} tone="ink" />
      </g>
      <Label x={8} y={43}>in parallel</Label>
      {[0, 1, 2].map((i) => {
        const y = 52 + i * 15;
        return (
          <g key={i}>
            <rect x={8} y={y - 1.5} width={64} height={3} rx={1.5} className="sc-track" data-s="track" />
            <rect x={8} y={y - 1.5} width={64} height={3} rx={1.5} className="sc-ink" data-s={`fill${i}`} />
            <path d={`M72 ${y}C86 ${y} 84 55 98 55`} className="sc-wire" pathLength={1} strokeDasharray={1} data-s={`wire${i}`} />
          </g>
        );
      })}
      <Label x={98} y={10}>report</Label>
      <rect x={98} y={15} width={54} height={80} rx={4} className="sc-card" />
      {lines.map((w, i) => (
        <g key={i}>
          <Bar x={103} y={24 + i * 9} w={w} name="line" />
          {i % 2 === 1 && <rect x={105 + w} y={24 + i * 9} width={3} height={3} rx={0.8} className="sc-accfill" data-s="cite" />}
        </g>
      ))}
      <g data-s="pass">
        <circle cx={144} cy={87} r={5.5} className="sc-done" />
        <path d="M141.2 87l2.1 2.1l3.6-4.2" className="sc-tick sc-tick--on" />
      </g>
    </>
  );
}

// Chatify: presence, a message each way, typing, then the reply.
function Chat() {
  return (
    <>
      <circle cx={18} cy={18} r={7.5} className="sc-card" />
      <circle cx={18} cy={16} r={2.6} className="sc-bar" />
      <path d="M13.2 22.4a5 5 0 0 1 9.6 0" className="sc-wire" />
      <circle cx={24} cy={23.5} r={2.8} className="sc-on" data-s="on" />
      <Bar x={31} y={13} w={34} tone="ink" />
      <Label x={31} y={25} name="onl">online</Label>
      <line x1={8} x2={152} y1={32} y2={32} className="sc-wire" />

      <g data-s="b1">
        <rect x={8} y={39} width={70} height={16} rx={8} className="sc-card" />
        <Bar x={15} y={45.5} w={46} />
      </g>
      <g data-s="b2">
        <rect x={74} y={59} width={78} height={16} rx={8} className="sc-accfill" />
        <Bar x={81} y={65.5} w={52} tone="onacc" />
      </g>
      <g data-s="typing" opacity={0}>
        <rect x={8} y={79} width={30} height={16} rx={8} className="sc-card" />
        {[17, 23, 29].map((x) => (
          <circle key={x} cx={x} cy={87} r={1.8} className="sc-bar" data-s="dot" />
        ))}
      </g>
      <g data-s="b3">
        <rect x={8} y={79} width={58} height={16} rx={8} className="sc-card" />
        <Bar x={15} y={85.5} w={36} />
      </g>
    </>
  );
}

// Meeting intelligence: a transcript, cut into chunks, becomes a summary and action items.
function Notes() {
  const rows = [46, 38, 50, 30, 44, 48, 34, 42];
  const chunks = [[0, 2], [3, 5], [6, 7]];
  return (
    <>
      <Label x={8} y={10}>transcript</Label>
      {rows.map((w, i) => (
        <g key={i} data-s="row">
          <circle cx={10.5} cy={21 + i * 10} r={2} className={i % 3 === 1 ? "sc-accfill" : "sc-bar"} />
          <Bar x={16} y={19.5 + i * 10} w={w} />
        </g>
      ))}
      {chunks.map(([a, b]) => (
        <path key={a} d={`M72 ${17 + a * 10}h3V${25 + b * 10}h-3`} className="sc-wire sc-wire--strong" pathLength={1} strokeDasharray={1} data-s="chunk" />
      ))}
      <Label x={90} y={10}>summary</Label>
      <rect x={90} y={15} width={62} height={31} rx={4} className="sc-card" />
      {[48, 42, 28].map((w, i) => (
        <Bar key={i} x={96} y={23 + i * 7} w={w} tone={i ? "ink" : "two"} name="sum" />
      ))}
      <Label x={90} y={60}>action items</Label>
      {[66, 82].map((y, i) => (
        <g key={y} data-s="act">
          <rect x={90} y={y} width={8} height={8} rx={2} className="sc-card" />
          <Bar x={102} y={y + 2.5} w={i ? 20 : 26} />
          <circle cx={136} cy={y + 4} r={3.6} className="sc-accfill" data-s="who" />
          <rect x={142.5} y={y + 1} width={9.5} height={6} rx={3} className="sc-card" />
        </g>
      ))}
    </>
  );
}

// Career assistant: a profile goes in, ranked recommendations come out.
function Advise() {
  return (
    <>
      <Label x={8} y={10}>you</Label>
      <g data-s="me">
        <rect x={8} y={15} width={50} height={80} rx={4} className="sc-card" />
        <circle cx={33} cy={33} r={9.5} className="sc-card" />
        <circle cx={33} cy={30.5} r={3.2} className="sc-bar" />
        <path d="M26.8 38.6a6.4 6.4 0 0 1 12.4 0" className="sc-wire sc-wire--strong" />
        <Bar x={18} y={49} w={30} tone="ink" />
      </g>
      {[[14, 60, 18], [35, 60, 17], [14, 71, 24], [14, 82, 14], [31, 82, 20]].map(([x, y, w]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={7} rx={3.5} className="sc-pill" data-s="pill" />
      ))}
      <line x1={58} x2={74} y1={55} y2={55} className="sc-wire" />
      <circle cx={58} cy={55} r={2.2} className="sc-accfill" opacity={0} data-s="pulse" />
      <Label x={74} y={10}>recommended</Label>
      {[0, 1, 2].map((i) => {
        const y = 15 + i * 28;
        return (
          <g key={i} data-s="rec">
            <rect x={74} y={y} width={78} height={24} rx={4} className="sc-card" />
            <Bar x={81} y={y + 7} w={i ? 38 - i * 4 : 44} tone="ink" />
            <Bar x={81} y={y + 14} w={30 - i * 3} tone={i ? "bar" : "two"} />
          </g>
        );
      })}
      <g data-s="best">
        <circle cx={142} cy={27} r={5.5} className="sc-accfill" />
        <path d="M139.2 27l2.1 2.1l3.6-4.2" className="sc-tick sc-tick--onacc" />
      </g>
    </>
  );
}

// Stock forecasting: the observed series, the window the model reads, then the forecast.
function Forecast() {
  return (
    <>
      {[32, 52, 72].map((y) => (
        <line key={y} x1={10} x2={152} y1={y} y2={y} className="sc-grid" />
      ))}
      <line x1={10} x2={152} y1={92} y2={92} className="sc-wire sc-wire--strong" />
      <Label x={10} y={10}>observed</Label>
      <Label x={152} y={10} end>forecast</Label>
      <line x1={100} x2={100} y1={16} y2={92} className="sc-today" />
      <g data-s="win">
        <rect x={52} y={36} width={48} height={50} rx={3} className="sc-win" />
        <Label x={55} y={82}>LSTM</Label>
      </g>
      <path
        d="M10 78L20 72L30 76L40 64L50 68L60 56L70 60L80 48L90 52L100 44"
        className="sc-series"
        pathLength={1}
        strokeDasharray={1}
        data-s="series"
      />
      <defs>
        <clipPath id="sc-forecast">
          <rect x={100} y={0} width={54} height={104} data-s="clip" />
        </clipPath>
      </defs>
      <g clipPath="url(#sc-forecast)">
        <path d="M100 44L150 14V40Z" className="sc-band" />
        <path d="M100 44L112 40L124 34L136 31L150 26" className="sc-series sc-series--next" />
      </g>
      <circle cx={150} cy={26} r={2.8} className="sc-two" data-s="end" />
    </>
  );
}

/* --------------------------------------------------------------- timelines */

const pop = { scale: 0, transformOrigin: "50% 50%", ease: "back.out(2.4)", duration: 0.45 };

const builds: Record<SceneName, Build> = {
  point: (tl, q) => {
    tl.from(q(s("box")), { opacity: 0, scale: 0.8, transformOrigin: "50% 50%", stagger: 0.28 }, 0.3)
      .from(q(s("laser")), { x: 34, y: 36, opacity: 0, duration: 0.9, ease: "power3.inOut" }, 1.3)
      .from(q(s("say")), { ...pop, transformOrigin: "50% 100%" }, 2.1)
      .from(q(s("hit")), { opacity: 0, duration: 0.25 }, 2.3)
      .from(q(s("ear")), { opacity: 0, duration: 0.3 }, 2.5)
      .from(q(s("wave")), { opacity: 0, x: -3, stagger: 0.12, duration: 0.35 }, 2.6)
      .from(q(s("heard")), { opacity: 0, y: 5 }, 2.9);
  },
  diff: (tl, q) => {
    const at = (y: number) => 0.3 + (2.4 * (y - 17)) / 76;
    tl.fromTo(q(s("scan")), { y: 17, opacity: 1 }, { y: 93, duration: 2.4, ease: "none", immediateRender: false }, 0.3)
      .to(q(s("scan")), { opacity: 0, duration: 0.2 })
      .from(q(s("hl"))[0], { scaleX: 0, transformOrigin: "0% 50%" }, at(44))
      .from(q(s("kept")), { opacity: 0, x: -6 }, at(44) + 0.12)
      .from(q(s("tick")), { ...drawn, duration: 0.35, ease: "power2.out" }, at(44) + 0.4)
      .from(q(s("hl"))[1], { scaleX: 0, transformOrigin: "0% 50%" }, at(74))
      .fromTo(q(s("dropped")), { opacity: 0, x: -6 }, { opacity: 1, x: 0 }, at(74) + 0.12)
      .from(q(s("strike")), { ...drawn, duration: 0.3, ease: "power2.out" }, 3.2)
      .to(q(s("dropped")), { opacity: 0.5, duration: 0.3 }, 3.3);
  },
  failover: (tl, q) => {
    const done = q(s("done"));
    const fly = (name: string, dx: number, i: number, t: number) => {
      tl.fromTo(q(s(name)), { x: 0, y: 0, opacity: 1 }, { x: dx, y: 50, duration: 0.55, ease: "power2.in", immediateRender: false }, t)
        .set(q(s(name)), { opacity: 0 })
        .from(done[i], { opacity: 0, duration: 0.25 }, t + 0.55);
    };
    // Worker centres sit at 16.5 + 14.2 * index.
    fly("a0", 16.5 + 14.2 * 1 - 44, 0, 0.4);
    fly("a1", 16.5 + 14.2 * 3 - 44, 1, 0.75);
    tl.fromTo(q(s("dead")), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 1.7)
      .fromTo(q(s("lead")), { x: 0 }, { x: 72, duration: 0.4, ease: "back.out(1.6)" }, 1.95)
      .from(q(s("ms")), { opacity: 0, y: 3 }, 2.05);
    fly("b0", 16.5 + 14.2 * 6 - 116, 2, 2.6);
    fly("b1", 16.5 + 14.2 * 8 - 116, 3, 2.95);
    tl.to(q(s("dead")), { opacity: 0, duration: 0.4 }, 4);
  },
  fan: (tl, q) => {
    const time = [1.3, 1.7, 1.5];
    tl.from(q(s("topic")), { opacity: 0, y: -4 }, 0.2).from(q(s("track")), { opacity: 0, stagger: 0.08 }, 0.6);
    time.forEach((d, i) => {
      tl.from(q(s(`fill${i}`)), { scaleX: 0, transformOrigin: "0% 50%", duration: d, ease: "power1.inOut" }, 0.9)
        .from(q(s(`wire${i}`)), { ...drawn, duration: 0.4, ease: "power2.out" }, 0.9 + d);
    });
    tl.from(q(s("line")), { scaleX: 0, transformOrigin: "0% 50%", stagger: 0.07 }, 2.8)
      .from(q(s("cite")), { ...pop, stagger: 0.1 }, 3.4)
      .from(q(s("pass")), pop, 3.9);
  },
  chat: (tl, q) => {
    tl.from(q(s("on")), pop, 0.3)
      .from(q(s("onl")), { opacity: 0 }, 0.4)
      .from(q(s("b1")), { opacity: 0, y: 6, scale: 0.9, transformOrigin: "0% 100%" }, 0.9)
      .from(q(s("b2")), { opacity: 0, y: 6, scale: 0.9, transformOrigin: "100% 100%" }, 1.7)
      .fromTo(q(s("typing")), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 2.5)
      .to(q(s("dot")), { y: -3, duration: 0.22, stagger: 0.11, repeat: 3, yoyo: true, ease: "sine.inOut" }, 2.6)
      .to(q(s("typing")), { opacity: 0, duration: 0.12 }, 3.75)
      .from(q(s("b3")), { opacity: 0, y: 6, scale: 0.9, transformOrigin: "0% 100%" }, 3.85);
  },
  notes: (tl, q) => {
    tl.from(q(s("row")), { opacity: 0, x: -4, stagger: 0.06, duration: 0.35 }, 0.2)
      .from(q(s("chunk")), { ...drawn, duration: 0.4, stagger: 0.16, ease: "power2.out" }, 1)
      .from(q(s("sum")), { scaleX: 0, transformOrigin: "0% 50%", stagger: 0.1 }, 1.8)
      .from(q(s("act")), { opacity: 0, y: 4, stagger: 0.35 }, 2.5)
      .from(q(s("who")), { ...pop, stagger: 0.35 }, 2.75);
  },
  advise: (tl, q) => {
    tl.from(q(s("me")), { opacity: 0, y: 4 }, 0.2)
      .from(q(s("pill")), { ...pop, stagger: 0.09 }, 0.6)
      .fromTo(q(s("pulse")), { x: 0, opacity: 1 }, { x: 16, duration: 0.45, ease: "power2.in", immediateRender: false }, 1.5)
      .set(q(s("pulse")), { opacity: 0 })
      .from(q(s("rec")), { opacity: 0, x: 10, stagger: 0.18 }, 1.9)
      .from(q(s("best")), pop, 2.8);
  },
  forecast: (tl, q) => {
    tl.from(q(s("series")), { ...drawn, duration: 1.5, ease: "power1.inOut" }, 0.2)
      .from(q(s("win")), { opacity: 0, x: -34, duration: 1.2, ease: "power2.inOut" }, 1.1)
      .from(q(s("clip")), { attr: { width: 0 }, duration: 0.9, ease: "power2.out" }, 2.5)
      .from(q(s("end")), pop, 3.3);
  },
};

const drawings: Record<SceneName, () => ReactNode> = {
  point: Point,
  diff: Diff,
  failover: Failover,
  fan: Fan,
  chat: Chat,
  notes: Notes,
  advise: Advise,
  forecast: Forecast,
};

// How long the finished frame is held before the loop starts over.
const HOLD = 2;

export function Scene({ name, label }: { name: SceneName; label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const Drawing = drawings[name];

  useEffect(() => {
    const svg = ref.current;
    if (!svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | undefined;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(svg) as Q;
      const tl = gsap.timeline({ paused: true, repeat: -1, defaults: { duration: 0.5, ease: "expo.out" } });
      tl.from(q(s("all")), { opacity: 0, duration: 0.3, ease: "none" }, 0);
      builds[name](tl, q);
      tl.to(q(s("all")), { opacity: 0, duration: 0.35, ease: "none" }, `+=${HOLD}`);
      io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()), { rootMargin: "-8% 0px" });
      io.observe(svg);
    }, svg);

    return () => {
      io?.disconnect();
      ctx.revert();
    };
  }, [name]);

  return (
    <svg ref={ref} className="scene" data-scene={name} viewBox="0 0 160 104" role="img" aria-label={label}>
      <g data-s="all">
        <Drawing />
      </g>
    </svg>
  );
}
