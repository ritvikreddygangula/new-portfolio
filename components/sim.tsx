"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { createCluster, type Hud } from "@/lib/cluster";

const initial: Hud = {
  up: 28,
  total: 28,
  leader: "coord-2, term 1",
  done: 0,
  log: "Take down any node. The system routes around it.",
  paused: false,
};

/** A playable model of Forge, inside the project's detail view. It runs only while it is on screen. */
export function Sim() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const sim = useRef<ReturnType<typeof createCluster> | null>(null);
  const [hud, setHud] = useState(initial);
  const [still, setStill] = useState(false);
  const state = useRef({ visible: false, paused: false });

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduced);
    const s = createCluster(el, { onHud: setHud, reduced });
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
    el.addEventListener("cluster:sync", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.removeEventListener("cluster:sync", sync);
      gsap.ticker.remove(tick);
      s.destroy();
    };
  }, []);

  const togglePause = () => {
    state.current.paused = !state.current.paused;
    sim.current?.setPaused(state.current.paused);
    canvas.current?.dispatchEvent(new Event("cluster:sync"));
  };

  return (
    <div className="sim">
      <p className="sim__head">
        <b>Try to break it</b>
        <span>A model of this cluster running in your browser. A simulation, not the measured runs.</span>
      </p>
      <div className="sim__stage">
        <canvas ref={canvas} className="sim__canvas" aria-hidden="true" />
        <p className="sr-only">
          A diagram of a cluster with three coordinators and 25 workers passing jobs between them. Taking a node
          down re-queues its jobs, and taking the leader down elects a new one.
        </p>
      </div>
      <div className="hud" role="group" aria-label="Simulation readout">
        <p className="hud__log" data-log={hud.log} />
        <div className="hud__bar">
          <dl className="hud__stats">
            <div>
              <dt>Leader</dt>
              <dd>{hud.leader}</dd>
            </div>
            <div>
              <dt>Nodes up</dt>
              <dd>
                {hud.up} of {hud.total}
              </dd>
            </div>
            <div>
              <dt>Jobs done</dt>
              <dd>{hud.done}</dd>
            </div>
          </dl>
          <div className="hud__actions">
            <button type="button" className="chip chip--strike" onClick={() => sim.current?.strike()}>
              <span className="chip__dot" aria-hidden="true" />
              Take down the leader
            </button>
            {!still && (
              <button type="button" className="chip chip--quiet" onClick={togglePause} aria-pressed={hud.paused}>
                {hud.paused ? "Resume" : "Pause"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
