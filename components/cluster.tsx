"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createCluster, type Hud } from "@/lib/cluster";
import { driver } from "@/lib/driver";

const initial: Hud = {
  mode: "cluster",
  up: 28,
  total: 28,
  leader: "coord-2, term 1",
  done: 0,
  requeued: 0,
  log: "Take down any node. The system routes around it.",
  paused: false,
};

/** The hero's signature: a live model of Forge that becomes DeltaLedger's agent pipeline on scroll. */
export function Cluster() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const sim = useRef<ReturnType<typeof createCluster> | null>(null);
  const [hud, setHud] = useState(initial);
  const [still, setStill] = useState(false);
  const state = useRef({ visible: true, paused: false });

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduced);
    const s = createCluster(el, { onHud: setHud, getP: () => driver.p, reduced });
    sim.current = s;
    if (reduced) return () => s.destroy();

    // One clock: the simulation advances on GSAP's ticker, and only while on screen.
    const tick = (time: number) => s.tick(time);
    const sync = () => {
      const run = state.current.visible && !state.current.paused && !document.hidden;
      if (run === s.isRunning()) return;
      s.setRunning(run);
      if (run) gsap.ticker.add(tick);
      else gsap.ticker.remove(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      state.current.visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    const onPause = () => sync();
    el.addEventListener("cluster:sync", onPause);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.removeEventListener("cluster:sync", onPause);
      gsap.ticker.remove(tick);
      s.destroy();
    };
  }, []);

  const togglePause = () => {
    state.current.paused = !state.current.paused;
    sim.current?.setPaused(state.current.paused);
    canvas.current?.dispatchEvent(new Event("cluster:sync"));
  };

  const agents = hud.mode === "agents";

  return (
    <>
      <div className="hero__graph intro-fade" style={{ "--i": 2 } as React.CSSProperties}>
        <canvas ref={canvas} className="hero__canvas" aria-hidden="true" />
        <p className="sr-only">
          A diagram of a cluster with three coordinators and 25 workers passing jobs between them. Taking a node
          down re-queues its jobs, and taking the leader down elects a new one. Further down the page the same
          nodes rearrange into a pipeline of three AI agents.
        </p>
      </div>

      <aside className="hud intro-fade" style={{ "--i": 5 } as React.CSSProperties} aria-label="Simulation readout">
        {/* Painted through CSS so a changing status line never counts as the page's largest paint. */}
        <p className="hud__log" data-log={hud.log} />
        <div className="hud__bar">
          <dl className="hud__stats">
            <div>
              <dt>Modeled on</dt>
              <dd>{agents ? "DeltaLedger MCP" : "Forge"}</dd>
            </div>
            <div>
              <dt>{agents ? "Pipeline" : "Leader"}</dt>
              <dd>{hud.leader}</dd>
            </div>
            <div>
              <dt>Nodes up</dt>
              <dd>
                {hud.up} of {hud.total}
              </dd>
            </div>
            <div className="hud__wide">
              <dt>{agents ? "Requests done" : "Jobs done"}</dt>
              <dd>{hud.done}</dd>
            </div>
          </dl>
          <div className="hud__actions">
            <button type="button" className="chip chip--strike" onClick={() => sim.current?.strike()}>
              <span className="chip__dot" aria-hidden="true" />
              {agents ? "Take down an agent" : "Take down the leader"}
            </button>
            {!still && (
              <button type="button" className="chip chip--quiet" onClick={togglePause} aria-pressed={hud.paused}>
                {hud.paused ? "Resume" : "Pause"}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
