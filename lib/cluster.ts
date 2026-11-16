// A small simulation of Forge, drawn on one canvas: 3 Raft coordinators, 25 workers,
// a client and a Kafka log. Any coordinator or worker can be taken down; jobs are
// re-queued, a new leader is elected, and writes are held when there is no quorum.
// Nothing here is measured data: it is a model.

export type Hud = {
  up: number;
  total: number;
  leader: string;
  done: number;
  log: string;
  paused: boolean;
};

type Kind = "coord" | "worker" | "in" | "out";

type Node = {
  id: number;
  kind: Kind;
  idx: number;
  home: number; // coordinator a worker reports to right now
  group: number; // the coordinator it belongs to when everything is up
  ax: number; ay: number; // resting position
  x: number; y: number;
  ox: number; oy: number;
  up: boolean;
  recoverAt: number;
  born: number;
  busy: number;
  hit: number;
};

type Packet = {
  from: number;
  free: boolean;
  fx: number; fy: number;
  path: number[];
  i: number;
  t: number;
  x: number; y: number;
  dx: number; dy: number;
  workAt: number;
  done: boolean;
  hold: number;
  fade: number;
  dying: boolean;
  requeue: boolean;
};

const COORDS = 3;
const WORKERS = 25;
const IN = COORDS + WORKERS;
const OUT = IN + 1;
const D = Math.PI / 180;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const pick = <T,>(list: T[]) => list[(Math.random() * list.length) | 0];
const pad = (n: number) => String(n).padStart(2, "0");

export function createCluster(
  canvas: HTMLCanvasElement,
  opts: { onHud: (h: Hud) => void; reduced: boolean },
) {
  const ctx = canvas.getContext("2d")!;
  const still = opts.reduced;
  let W = 0, H = 0, dpr = 1, small = false;
  let rect = { x: 0, y: 0, w: 0, h: 0 };
  let colors = { ink: "#ecede8", muted: "#969b98", accent: "#6b93ff", fault: "#ff6b4a", ground: "#0a0b0d" };
  let mono = "monospace";

  let time = still ? 20 : 0;
  let leader = 1;
  let term = 1;
  let electAt = 0;
  let queue = 0;
  let flushAt = 0;
  let spawnAt = 0.9;
  let warm = false;
  let chaosAt = 7;
  let lastUserKill = -99;
  let done = 0;
  let logMsg = "Take down any node. The system routes around it.";
  let logUntil = 0;
  let paused = false;
  let hudAt = 0;
  let hudKey = "";
  let hover = -1;
  const pointer = { x: 0, y: 0, on: false, gx: 0, gy: 0 };

  const nodes: Node[] = [];
  const mk = (kind: Kind, idx: number): Node => ({
    id: nodes.length, kind, idx, home: idx % COORDS, group: idx % COORDS,
    ax: 0, ay: 0, x: 0, y: 0, ox: 0, oy: 0,
    up: true, recoverAt: 0, born: 0, busy: 0, hit: -9,
  });
  for (let i = 0; i < COORDS; i++) nodes.push(mk("coord", i));
  for (let i = 0; i < WORKERS; i++) nodes.push(mk("worker", i));
  nodes.push(mk("in", 0));
  nodes.push(mk("out", 0)); // separate pushes: each id is the array length at creation
  const coords = nodes.slice(0, COORDS);
  const workers = nodes.slice(COORDS, IN);
  // Each worker reports to the coordinator in its own third of the ring, so edges stay short.
  workers.forEach((n, i) => { n.home = n.group = Math.round(((i + 0.5) * (360 / WORKERS)) / 120) % COORDS; });
  nodes.forEach((n) => {
    n.born = still ? -9 : n.kind === "coord" ? 0.1 + n.idx * 0.09 : n.kind === "worker" ? 0.38 + n.idx * 0.028 : 0.25;
  });

  let packets: Packet[] = [];

  /* ---------- layout ---------- */

  function layout() {
    const { x, y, w, h } = rect;
    const cx = x + w / 2, cy = y + h / 2;
    const rx = Math.min(w * 0.47, h * 0.72), ry = Math.min(h * 0.46, w * 0.62);
    const rc = Math.min(rx, ry) * 0.36;
    coords.forEach((n, i) => {
      const a = (-90 + i * 120) * D;
      n.ax = cx + Math.cos(a) * rc;
      n.ay = cy + Math.sin(a) * rc + rc * 0.12;
    });
    workers.forEach((n, i) => {
      const a = (-90 + (i + 0.5) * (360 / WORKERS)) * D;
      n.ax = cx + Math.cos(a) * rx;
      n.ay = cy + Math.sin(a) * ry;
    });
    const a = nodes[IN], b = nodes[OUT];
    a.ax = x + 8; a.ay = y + 12;
    b.ax = x + w - 8; b.ay = y + h - 12;
  }

  function place(dt: number) {
    const k = still ? 1 : 1 - Math.pow(0.0004, dt);
    pointer.gx += ((pointer.on ? (pointer.x / W - 0.5) * -14 : 0) - pointer.gx) * k * 0.5;
    pointer.gy += ((pointer.on ? (pointer.y / H - 0.5) * -10 : 0) - pointer.gy) * k * 0.5;
    for (const n of nodes) {
      let bx = n.ax, by = n.ay;
      if (!still) {
        bx += Math.sin(time * 0.5 + n.id * 1.7) * 1.6;
        by += Math.cos(time * 0.42 + n.id * 2.3) * 1.6;
      }
      let tx = 0, ty = 0;
      if (pointer.on && n.kind !== "in" && n.kind !== "out") {
        const dx = bx - pointer.x, dy = by - pointer.y, d = Math.hypot(dx, dy) || 1;
        if (d < 150 && d > 22) {
          const f = Math.pow(1 - d / 150, 2) * 16;
          tx = (dx / d) * f; ty = (dy / d) * f;
        }
      }
      n.ox += (tx - n.ox) * k;
      n.oy += (ty - n.oy) * k;
      n.x = bx + n.ox + pointer.gx;
      n.y = by + n.oy + pointer.gy;
    }
  }

  /* ---------- behaviour ---------- */

  const liveCoords = () => coords.filter((c) => c.up);
  const name = (n: Node) =>
    n.kind === "coord" ? `coord-${n.idx + 1}`
    : n.kind === "worker" ? `worker-${pad(n.idx + 1)}`
    : n.kind === "in" ? "client"
    : "kafka log";

  function log(msg: string, hold = 3.2) {
    logMsg = msg;
    logUntil = time + hold;
  }
  function softLog(msg: string) {
    if (time > logUntil) log(msg, 1.6);
  }

  function dedupe(path: number[]) {
    return path.filter((id, i) => i === 0 || id !== path[i - 1]);
  }

  function jobPath(): { path: number[]; workAt: number } | null {
    if (leader < 0) return null;
    const ws = workers.filter((w) => w.up);
    const cs = liveCoords();
    if (!ws.length || !cs.length) return null;
    const calm = ws.filter((w) => w.busy < 0.2);
    const w = pick(calm.length ? calm : ws);
    const path = dedupe([pick(cs).id, leader, w.home, w.id, w.home, OUT]);
    return { path, workAt: path.indexOf(w.id) };
  }

  function packet(path: number[], workAt = -1): Packet {
    const s = nodes[IN];
    return {
      from: IN, free: false, fx: s.x, fy: s.y, path, i: 0, t: 0, x: s.x, y: s.y, dx: 0, dy: 0,
      workAt, done: false, hold: 0, fade: 1, dying: false, requeue: false,
    };
  }

  function spawn() {
    const job = jobPath();
    if (!job) { queue = Math.min(queue + 1, 14); return; }
    packets.push(packet(job.path, job.workAt));
  }

  function reroute(p: Packet) {
    p.fx = p.x; p.fy = p.y; p.free = true; p.t = 0; p.i = 0;
    if (p.done) {
      const cs = liveCoords();
      p.path = cs.length ? [pick(cs).id, OUT] : [OUT];
      p.workAt = -1;
      return;
    }
    const job = jobPath();
    if (job) { p.path = job.path; p.workAt = job.workAt; }
    else { p.path = [IN]; p.workAt = -1; p.requeue = true; }
  }

  function elect() {
    const cs = liveCoords();
    if (cs.length < 2) return;
    leader = pick(cs).id;
    term++;
    electAt = 0;
    nodes[leader].hit = time;
    log(`coord-${leader + 1} elected leader, term ${term}. Queue is draining.`);
  }

  function kill(n: Node, user: boolean) {
    if (n.kind === "in" || n.kind === "out") return;
    if (!n.up) {
      if (still) revive(n);
      return;
    }
    n.up = false;
    n.hit = time;
    n.recoverAt = time + (n.kind === "coord" ? 5.5 : 6.5) + Math.random();
    if (user) lastUserKill = time;
    if (n.kind === "worker") {
      log(`${name(n)} is down. Its jobs are re-queued.`);
    } else {
      const cs = liveCoords();
      workers.forEach((w) => { if (w.home === n.idx && cs.length) w.home = pick(cs).idx; });
      const wasLeader = leader === n.idx;
      if (wasLeader) { leader = -1; electAt = 0; }
      if (cs.length < 2) { leader = -1; log("No quorum. Writes are held until a coordinator returns.", 5); }
      else if (wasLeader) log(`${name(n)} is down. Electing a new leader.`);
      else log(`${name(n)} is down. The leader keeps its quorum.`);
    }
    if (still) settle();
  }

  function revive(n: Node) {
    n.up = true;
    n.born = still ? -9 : time;
    if (n.kind === "worker" && coords[n.group].up) n.home = n.group;
    // A coordinator that returns takes its own workers back.
    if (n.kind === "coord") workers.forEach((w) => { if (w.group === n.idx) w.home = n.idx; });
    softLog(`${name(n)} is back.`);
    if (still) settle();
  }

  // Reduced motion: resolve elections at once and repaint a single frame.
  function settle() {
    if (leader < 0 && liveCoords().length >= 2) elect();
    place(1);
    draw();
    emit(true);
  }

  function step(dt: number) {
    for (const n of nodes) {
      if (!n.up && time >= n.recoverAt) revive(n);
      n.busy = Math.max(0, n.busy - dt * 1.6);
    }

    if (leader < 0) {
      if (liveCoords().length >= 2) {
        if (!electAt) electAt = time + 0.5;
        else if (time >= electAt) elect();
      } else electAt = 0;
    }

    const ready = leader >= 0;
    // The cluster is already under load when it appears: a few jobs start mid-route.
    if (!warm && time >= spawnAt) {
      warm = true;
      for (let k = 0; k < 8; k++) {
        const job = jobPath();
        if (!job) break;
        const p = packet(job.path, job.workAt);
        p.i = 1 + ((Math.random() * (job.path.length - 1)) | 0);
        p.from = job.path[p.i - 1];
        p.t = Math.random() * 0.9;
        p.done = p.i > job.workAt;
        p.x = nodes[p.from].x; p.y = nodes[p.from].y;
        packets.push(p);
      }
    }
    if (time >= spawnAt) {
      spawnAt = time + 0.3 + Math.random() * 0.22;
      spawn();
    }
    if (queue > 0 && ready && time >= flushAt) {
      flushAt = time + 0.09;
      queue--;
      spawn();
    }

    // Fault injection keeps running while nobody touches it.
    if (time > chaosAt) {
      chaosAt = time + 9 + Math.random() * 6;
      if (time - lastUserKill > 8) {
        const ws = workers.filter((w) => w.up);
        if (ws.length > WORKERS - 3) kill(pick(ws), false);
      }
    }

    const speed = small ? 210 : 330;
    for (const p of packets) {
      if (p.dying) { p.fade -= dt * 2.4; continue; }
      if (p.hold > 0) { p.hold -= dt; continue; }
      const next = nodes[p.path[p.i]];
      if (!next.up) {
        reroute(p);
        continue;
      }
      const sx = p.free ? p.fx : nodes[p.from].x, sy = p.free ? p.fy : nodes[p.from].y;
      const len = Math.hypot(next.x - sx, next.y - sy) || 1;
      p.t += (speed * dt) / len;
      const t = Math.min(1, p.t);
      p.x = lerp(sx, next.x, t); p.y = lerp(sy, next.y, t);
      p.dx = (next.x - sx) / len; p.dy = (next.y - sy) / len;
      if (p.t >= 1) {
        p.from = next.id; p.free = false; p.t = 0;
        if (next.kind === "worker") {
          next.busy = 1;
          p.hold = 0.28 + Math.random() * 0.3;
          if (p.i === p.workAt) p.done = true;
        }
        p.i++;
        if (p.i >= p.path.length) {
          if (next.id === OUT) done++;
          if (p.requeue) queue = Math.min(queue + 1, 14);
          p.fade = 0;
        }
      }
    }
    packets = packets.filter((p) => p.fade > 0);
  }

  /* ---------- drawing ---------- */

  function edge(a: Node, b: Node, alpha: number, dashed = false, color = colors.ink) {
    if (alpha <= 0.004) return;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.setLineDash(dashed ? [3, 4] : []);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function label(text: string, x: number, y: number, align: CanvasTextAlign, color: string, alpha: number) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  }

  function draw() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const boot = still ? 1 : smooth(0.5, 1.5, time);
    const near = (a: Node, b: Node) => (hover === a.id || hover === b.id ? 3 : 1);
    const live = (a: Node, b: Node) => (a.up && b.up ? 1 : 0.35);
    const base = 0.17 * boot;
    ctx.lineWidth = 1;

    for (let i = 0; i < COORDS; i++) {
      const a = coords[i], b = coords[(i + 1) % COORDS];
      edge(a, b, base * 2 * live(a, b) * near(a, b), !(a.up && b.up));
      edge(nodes[IN], a, base * 0.8 * live(a, a));
      edge(a, nodes[OUT], base * 0.8 * live(a, a));
    }
    for (const w of workers) {
      const c = coords[w.home];
      edge(w, c, base * live(w, c) * near(w, c), !(w.up && c.up));
    }
    ctx.setLineDash([]);

    // Jobs waiting at the entry while writes are held.
    const q = nodes[IN];
    for (let i = 0; i < queue; i++) {
      ctx.globalAlpha = 0.9;
      ctx.strokeStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(q.x + 14 + i * 7, q.y, 2, 0, 7);
      ctx.stroke();
    }

    for (const p of packets) {
      const waiting = !nodes[p.path[Math.min(p.i, p.path.length - 1)]].up;
      const pulse = waiting ? 0.55 + 0.45 * Math.sin(time * 9) : 1;
      const color = p.done ? colors.ink : colors.accent;
      ctx.globalAlpha = clamp(p.fade) * 0.45 * pulse;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.dx * 16, p.y - p.dy * 16);
      ctx.stroke();
      ctx.globalAlpha = clamp(p.fade) * pulse;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, small ? 2 : 2.4, 0, 7);
      ctx.fill();
    }
    ctx.lineWidth = 1;

    ctx.font = `${small ? 9 : 10.5}px ${mono}`;
    ctx.textBaseline = "middle";
    const lab = boot;

    for (const n of nodes) {
      const age = time - n.born;
      if (age < 0) continue;
      const s = still ? 1 : age > 0.55 ? 1 : 1 + 0.35 * Math.sin(Math.min(1, age / 0.55) * Math.PI) - Math.pow(1 - Math.min(1, age / 0.55), 3);
      const shock = time - n.hit;
      if (!still && shock >= 0 && shock < 0.7) {
        ctx.globalAlpha = (1 - shock / 0.7) * 0.8;
        ctx.strokeStyle = n.up ? colors.accent : colors.fault;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8 + shock * 60, 0, 7);
        ctx.stroke();
      }

      if (n.kind === "in" || n.kind === "out") {
        const r = 4 * s;
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colors.ground;
        ctx.strokeStyle = colors.ink;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
        ctx.strokeRect(n.x - r, n.y - r, r * 2, r * 2);
        const left = n.kind === "in";
        label(name(n), n.x + (left ? 12 : -12), n.y, left ? "left" : "right", colors.muted, lab);
        continue;
      }

      const big = n.kind === "coord";
      const r = (big ? (small ? 8 : 10) : small ? 2.6 : 3.2) * s;
      const hot = hover === n.id;

      if (!n.up) {
        ctx.globalAlpha = 0.95;
        ctx.strokeStyle = colors.fault;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.arc(n.x, n.y, big ? r : r + 2, 0, 7);
        ctx.stroke();
        ctx.setLineDash([]);
        const c = big ? 3.5 : 1.8;
        ctx.beginPath();
        ctx.moveTo(n.x - c, n.y - c); ctx.lineTo(n.x + c, n.y + c);
        ctx.moveTo(n.x + c, n.y - c); ctx.lineTo(n.x - c, n.y + c);
        ctx.stroke();
      } else if (big) {
        const isLeader = leader === n.idx;
        ctx.globalAlpha = 1;
        ctx.fillStyle = isLeader ? colors.accent : colors.ground;
        ctx.strokeStyle = isLeader ? colors.accent : colors.ink;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, 7);
        ctx.fill();
        ctx.stroke();
        ctx.lineWidth = 1;
        if (isLeader) {
          // Heartbeat ring.
          const beat = still ? 0.5 : (time * 0.9) % 1;
          ctx.globalAlpha = (1 - beat) * 0.6;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4 + beat * 12, 0, 7);
          ctx.stroke();
        } else if (leader < 0 && !still) {
          ctx.globalAlpha = 0.35 + 0.35 * Math.sin(time * 14 + n.idx);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 5, 0, 7);
          ctx.stroke();
        }
      } else {
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = colors.ink;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, 7);
        ctx.fill();
        if (n.busy > 0.02) {
          ctx.globalAlpha = n.busy * 0.9;
          ctx.strokeStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 2 + (1 - n.busy) * 7, 0, 7);
          ctx.stroke();
        }
      }

      if (hot) {
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = n.up ? colors.ink : colors.fault;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + (big ? 7 : 6), 0, 7);
        ctx.stroke();
      }

      if (big) {
        const isLeader = leader === n.idx && n.up;
        const text = !n.up ? `${name(n)} down` : isLeader ? `${name(n)} leader` : name(n);
        label(text, n.x, n.y + r + 13, "center", !n.up ? colors.fault : isLeader ? colors.accent : colors.muted, lab);
      } else if (hot) {
        const right = n.x < rect.x + rect.w / 2;
        const text = n.up ? name(n) : `${name(n)} down`;
        const tw = ctx.measureText(text).width;
        const tx = right ? n.x + 13 : n.x - 13;
        ctx.globalAlpha = 0.92;
        ctx.fillStyle = colors.ground;
        ctx.fillRect(right ? tx - 4 : tx - tw - 4, n.y - 9, tw + 8, 18);
        label(text, tx, n.y, right ? "left" : "right", n.up ? colors.ink : colors.fault, 1);
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- readout ---------- */

  function emit(force = false) {
    if (!force && time < hudAt) return;
    hudAt = time + 0.25;
    if (time > logUntil + 6 && logMsg !== "") logMsg = "Take down any node. The system routes around it.";
    const up = nodes.filter((n) => n.up && (n.kind === "coord" || n.kind === "worker")).length;
    const live = liveCoords().length;
    const hud: Hud = {
      up, total: COORDS + WORKERS,
      leader: leader >= 0 ? `coord-${leader + 1}, term ${term}` : live < 2 ? "none, no quorum" : "electing",
      done, log: logMsg, paused,
    };
    const key = JSON.stringify(hud);
    if (key === hudKey) return;
    hudKey = key;
    opts.onHud(hud);
  }

  /* ---------- wiring ---------- */

  function readStyle() {
    const cs = getComputedStyle(canvas);
    const v = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
    colors = {
      ink: v("--ink", colors.ink), muted: v("--muted", colors.muted), accent: v("--accent", colors.accent),
      fault: v("--fault", colors.fault), ground: v("--ground", colors.ground),
    };
    mono = cs.fontFamily || "monospace";
  }

  function resize() {
    const box = canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    W = box.width; H = box.height;
    small = W < 600;
    dpr = Math.min(window.devicePixelRatio || 1, small ? 1.75 : 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const inset = small ? { t: 16, r: 20, b: 16, l: 20 } : { t: 34, r: 48, b: 34, l: 48 };
    rect = { x: inset.l, y: inset.t, w: W - inset.l - inset.r, h: Math.max(120, H - inset.t - inset.b) };
    layout();
    place(1);
    draw();
  }

  function at(x: number, y: number, reach: number) {
    let best = -1, bd = reach;
    for (const n of nodes) {
      if (n.kind === "in" || n.kind === "out") continue;
      const d = Math.hypot(n.x - x, n.y - y) - (n.kind === "coord" ? 8 : 0);
      if (d < bd) { bd = d; best = n.id; }
    }
    return best;
  }

  const local = (e: MouseEvent) => {
    const b = canvas.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const p = local(e);
    pointer.x = p.x; pointer.y = p.y; pointer.on = true;
    hover = at(p.x, p.y, 16);
    canvas.style.cursor = hover >= 0 ? "pointer" : "";
    if (still) draw();
  };
  const onLeave = () => {
    pointer.on = false; hover = -1; canvas.style.cursor = "";
    if (still) draw();
  };
  const onClick = (e: MouseEvent) => {
    const p = local(e);
    const touch = (e as PointerEvent).pointerType === "touch";
    const id = at(p.x, p.y, touch ? 26 : 18);
    if (id >= 0) kill(nodes[id], true);
  };

  let last = 0;
  let running = false;
  function tick(now: number) {
    const dt = Math.min(0.05, last ? now - last : 0.016);
    last = now;
    time += dt;
    step(dt);
    place(dt);
    draw();
    emit();
  }

  readStyle();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("click", onClick);
  const onTheme = () => { readStyle(); draw(); };
  window.addEventListener("themechange", onTheme);
  emit(true);

  return {
    still,
    tick,
    /** The component owns the ticker; this only tracks whether frames should advance. */
    setRunning(v: boolean) { running = v; if (!v) last = 0; },
    isRunning: () => running,
    setPaused(v: boolean) { paused = v; emit(true); },
    /** Keyboard path: take down the leader. */
    strike() {
      const target = coords.find((c) => c.idx === leader && c.up) ?? liveCoords()[0];
      if (target) kill(target, true);
      if (!still && paused) { place(0.016); draw(); emit(true); }
    },
    destroy() {
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("themechange", onTheme);
    },
  };
}
