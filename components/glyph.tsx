import type { GlyphName } from "@/data/site";

type Spec = {
  nodes: [number, number, ("big" | "hot")?][];
  edges: [number, number, "dash"?][];
  // The route a packet takes when the row is hovered.
  route: string;
};

// Each drawing follows the architecture described in the project's own bullets.
const specs: Record<GlyphName, Spec> = {
  // Aligner, classifier, verifier; the verifier loops back to retrieval once.
  pipeline: {
    nodes: [[8, 44], [36, 44, "big"], [64, 44, "big"], [92, 44, "hot"], [92, 14], [114, 44]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4, "dash"], [3, 5]],
    route: "M8 44H92V14V44H114",
  },
  // Three Raft coordinators over a row of workers.
  raft: {
    nodes: [[60, 10, "hot"], [42, 34, "big"], [78, 34, "big"], [12, 62], [28, 62], [44, 62], [60, 62], [76, 62], [92, 62], [108, 62]],
    edges: [[0, 1], [0, 2], [1, 2], [1, 3], [1, 4], [1, 5], [0, 6], [2, 7], [2, 8], [2, 9]],
    route: "M60 10L42 34L28 62L42 34L60 10",
  },
  // Planner, parallel researchers, aggregator, critic, synthesizer.
  fanout: {
    nodes: [[8, 36, "big"], [36, 12], [36, 36], [36, 60], [64, 36, "big"], [88, 36], [112, 36, "hot"]],
    edges: [[0, 1], [0, 2], [0, 3], [1, 4], [2, 4], [3, 4], [4, 5], [5, 6]],
    route: "M8 36L36 12L64 36H112",
  },
  // One socket server, many clients.
  hub: {
    nodes: [[60, 36, "hot"], [60, 8], [86, 22], [86, 50], [60, 64], [34, 50], [34, 22]],
    edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
    route: "M34 22L60 36L86 50",
  },
  // Chunks summarized upward into one overall summary.
  tree: {
    nodes: [[60, 10, "hot"], [36, 36, "big"], [84, 36, "big"], [20, 62], [50, 62], [70, 62], [100, 62]],
    edges: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]],
    route: "M20 62L36 36L60 10",
  },
  // A question through a model, out to three recommendations.
  branch: {
    nodes: [[10, 36], [56, 36, "hot"], [108, 12], [108, 36], [108, 60]],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4]],
    route: "M10 36H56L108 12",
  },
  // Observed prices, then the forecast.
  series: {
    nodes: [[8, 54], [28, 40], [48, 48], [68, 26], [88, 32, "big"], [112, 12, "hot"]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5, "dash"]],
    route: "M8 54L28 40L48 48L68 26L88 32L112 12",
  },
};

export function Glyph({ name, label }: { name: GlyphName; label: string }) {
  const spec = specs[name];
  return (
    <svg className="glyph" viewBox="0 0 120 72" role="img" aria-label={label}>
      {spec.edges.map(([a, b, dash], i) => (
        <line
          key={i}
          x1={spec.nodes[a][0]}
          y1={spec.nodes[a][1]}
          x2={spec.nodes[b][0]}
          y2={spec.nodes[b][1]}
          className="glyph__edge"
          strokeDasharray={dash ? "2 3" : undefined}
        />
      ))}
      {spec.nodes.map(([x, y, kind], i) => (
        <circle key={i} cx={x} cy={y} r={kind ? 4.5 : 2.4} className={`glyph__node${kind ? ` glyph__node--${kind}` : ""}`} />
      ))}
      <circle r="2.6" className="glyph__packet" style={{ offsetPath: `path('${spec.route}')` }} />
    </svg>
  );
}
