"use client";

import { useEffect, useRef } from "react";

/**
 * A sparse network of nodes drawn behind the whole page in the site's ink.
 * It rests when nothing happens: scrolling slides it (parallax) and sends packets
 * along a few links, and the cursor joins the network as a node, nudging nearby
 * nodes aside and lighting up their links. Every few nodes is a "leader" with a ring.
 */

type Node = { x: number; y: number; dx: number; dy: number; leader: boolean };
type Packet = { a: number; b: number; t: number; speed: number };

const SPACING = 120; // average distance between nodes in CSS px
const LINK = 175; // longest link drawn
const PARALLAX = 0.35; // how far the network moves per px scrolled
const CURSOR_R = 170; // cursor reach
const MAX_PACKETS = 14;

// Seeded random so the network looks the same on every visit
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function build(width: number, height: number) {
  const r = rng(7);
  const nodes: Node[] = [];
  // Jittered grid keeps nodes evenly spread without looking regular
  for (let y = SPACING / 2; y < height; y += SPACING) {
    for (let x = SPACING / 2; x < width; x += SPACING) {
      if (r() < 0.18) continue;
      nodes.push({
        x: x + (r() - 0.5) * SPACING * 0.9,
        y: y + (r() - 0.5) * SPACING * 0.9,
        dx: 0,
        dy: 0,
        leader: r() < 0.08,
      });
    }
  }
  // Link each node to its two nearest neighbours within reach
  const links = new Set<string>();
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter(({ j, d }) => j !== i && d < LINK)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ j }) => links.add(i < j ? `${i}-${j}` : `${j}-${i}`));
  });
  return { nodes, links: [...links].map((k) => k.split("-").map(Number) as [number, number]) };
}

export function NodeNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    // Reduced motion: no parallax, no packets, no cursor; the network is drawn once and stays put
    const rate = reduce ? 0 : PARALLAX;
    let w = 0, h = 0, dpr = 1;
    let net = build(1, 1);
    let ink = "#141413", accent = "#b4532f";
    let pointer: { x: number; y: number } | null = null;
    let packets: Packet[] = [];
    let lastScroll = window.scrollY;
    let frame = 0;
    let lastTime = 0;

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      ink = css.getPropertyValue("--foreground").trim() || ink;
      accent = css.getPropertyValue("--primary").trim() || accent;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // The network is tall enough to cover the parallax travel of the whole page
      const maxScroll = Math.max(document.documentElement.scrollHeight - h, 0);
      net = build(w, h + maxScroll * rate + SPACING);
      packets = [];
    };

    const spawnPacket = (near?: { x: number; y: number }) => {
      if (packets.length >= MAX_PACKETS || net.links.length === 0) return;
      const offset = window.scrollY * rate;
      // Prefer links that are on screen (and near the cursor when given)
      for (let tries = 0; tries < 12; tries++) {
        const [a, b] = net.links[Math.floor(Math.random() * net.links.length)];
        const n = net.nodes[a];
        const y = n.y - offset;
        if (y < -40 || y > h + 40) continue;
        if (near && Math.hypot(n.x - near.x, y - near.y) > CURSOR_R * 1.4) continue;
        const flip = Math.random() < 0.5;
        packets.push({ a: flip ? b : a, b: flip ? a : b, t: 0, speed: 0.0012 + Math.random() * 0.0008 });
        return;
      }
    };

    const draw = (dt: number) => {
      const offset = window.scrollY * rate;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      let moving = false;
      // Ease each node toward its rest spot, pushed aside by the cursor
      for (const n of net.nodes) {
        let tx = 0, ty = 0;
        if (pointer) {
          const px = n.x - pointer.x, py = n.y - offset - pointer.y;
          const d = Math.hypot(px, py);
          if (d < CURSOR_R && d > 0.01) {
            const push = (1 - d / CURSOR_R) ** 2 * 22;
            tx = (px / d) * push;
            ty = (py / d) * push;
          }
        }
        const k = reduce ? 1 : Math.min(dt * 0.008, 1);
        n.dx += (tx - n.dx) * k;
        n.dy += (ty - n.dy) * k;
        if (Math.abs(tx - n.dx) > 0.05 || Math.abs(ty - n.dy) > 0.05) moving = true;
      }

      const pos = (n: Node) => [n.x + n.dx, n.y + n.dy - offset] as const;
      const glow = (x: number, y: number) =>
        pointer ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / CURSOR_R) : 0;

      // Links: faint ink, warming to the accent near the cursor
      ctx.lineWidth = 1;
      for (const [a, b] of net.links) {
        const [x1, y1] = pos(net.nodes[a]);
        const [x2, y2] = pos(net.nodes[b]);
        if ((y1 < -LINK && y2 < -LINK) || (y1 > h + LINK && y2 > h + LINK)) continue;
        const g = glow((x1 + x2) / 2, (y1 + y2) / 2);
        ctx.strokeStyle = g > 0 ? accent : ink;
        ctx.globalAlpha = g > 0 ? 0.1 + g * 0.4 : 0.075;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // The cursor joins the network: hairlines to its nearest nodes
      if (pointer) {
        const near = net.nodes
          .map((n) => {
            const [x, y] = pos(n);
            return { x, y, d: Math.hypot(x - pointer!.x, y - pointer!.y) };
          })
          .filter((p) => p.d < CURSOR_R)
          .sort((p, q) => p.d - q.d)
          .slice(0, 3);
        ctx.strokeStyle = accent;
        for (const p of near) {
          ctx.globalAlpha = 0.45 * (1 - p.d / CURSOR_R);
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      }

      // Nodes, with a ring around each leader
      for (const n of net.nodes) {
        const [x, y] = pos(n);
        if (y < -20 || y > h + 20) continue;
        const g = glow(x, y);
        ctx.fillStyle = n.leader || g > 0 ? accent : ink;
        ctx.globalAlpha = n.leader ? 0.45 : 0.18 + g * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, n.leader ? 2.6 : 1.7, 0, Math.PI * 2);
        ctx.fill();
        if (n.leader) {
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.3 + g * 0.4;
          ctx.beginPath();
          ctx.arc(x, y, 6.5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Packets travelling along links
      ctx.fillStyle = accent;
      packets = packets.filter((p) => (p.t += p.speed * dt) < 1);
      for (const p of packets) {
        const [x1, y1] = pos(net.nodes[p.a]);
        const [x2, y2] = pos(net.nodes[p.b]);
        const e = p.t < 0.5 ? 2 * p.t * p.t : 1 - (-2 * p.t + 2) ** 2 / 2;
        ctx.globalAlpha = 0.85 * Math.sin(Math.PI * p.t) + 0.15;
        ctx.beginPath();
        ctx.arc(x1 + (x2 - x1) * e, y1 + (y2 - y1) * e, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      return moving || packets.length > 0;
    };

    // Only animate while something is happening; otherwise the network rests
    const loop = (now: number) => {
      const dt = lastTime ? Math.min(now - lastTime, 50) : 16;
      lastTime = now;
      frame = draw(dt) ? requestAnimationFrame(loop) : 0;
      if (!frame) lastTime = 0;
    };
    const wake = () => {
      if (reduce) {
        draw(16);
        return;
      }
      if (!frame && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      if (reduce) return;
      if (delta > 30 && Math.random() < 0.5) spawnPacket();
      wake();
    };
    let lastSpawn = 0;
    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      const now = performance.now();
      if (now - lastSpawn > 350) {
        lastSpawn = now;
        spawnPacket(pointer);
      }
      wake();
    };
    const onPointerLeave = () => {
      pointer = null;
      wake();
    };
    const onResize = () => {
      resize();
      wake();
    };

    readColors();
    resize();
    wake();

    // Recolor when the theme class on <html> changes
    const themeObserver = new MutationObserver(() => {
      readColors();
      draw(16);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    // Page height changes (expanding a card) change how far the network must reach
    const sizeObserver = new ResizeObserver(onResize);
    sizeObserver.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (finePointer && !reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }
    document.addEventListener("visibilitychange", wake);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      sizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", wake);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
