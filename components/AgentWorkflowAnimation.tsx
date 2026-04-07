"use client";

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './AgentWorkflowAnimation.css';

// Status colors
const STATUS_STYLE = {
  pending: { border: '#2a1818', bg: '#100a0a', text: '#5a4040', glow: 'none' },
  running: { border: '#f87171', bg: '#1f0d0d', text: '#fca5a5', glow: '0 0 14px rgba(248,113,113,0.3)' },
  done: { border: '#4ade80', bg: '#0a1a0e', text: '#4ade80', glow: '0 0 10px rgba(74,222,128,0.25)' },
  failed: { border: '#f87171', bg: '#1a0808', text: '#f87171', glow: '0 0 10px rgba(248,113,113,0.3)' },
  retry: { border: '#fb923c', bg: '#1a0f08', text: '#fb923c', glow: '0 0 10px rgba(251,146,60,0.25)' },
};

// Custom node component
function AgentNode({ data }: { data: any }) {
  const s = STATUS_STYLE[data.status as keyof typeof STATUS_STYLE] || STATUS_STYLE.pending;
  const isRunning = data.status === 'running';

  return (
    <div
      className={`ag-node${isRunning ? ' ag-node--running' : ''}`}
      style={{ borderColor: s.border, background: s.bg, boxShadow: s.glow }}
    >
      <Handle type="target" position={Position.Top} className="ag-handle" />
      <span className="ag-node__label" style={{ color: s.text }}>{data.label}</span>
      {isRunning && <span className="ag-node__pulse" />}
      <Handle type="source" position={Position.Bottom} className="ag-handle" />
    </div>
  );
}

const NODE_TYPES = { agentNode: AgentNode };

// Layout constants — branches centered at x=300, spacing 130px
const NODE_DEFS = [
  { id: 'planner', label: 'Planner', x: 300, y: 0 },
  { id: 'rag_retrieval', label: 'RAG Memory', x: 300, y: 100 },
  { id: 'branch_0', label: 'Branch 1', x: 40, y: 220 },
  { id: 'branch_1', label: 'Branch 2', x: 170, y: 220 },
  { id: 'branch_2', label: 'Branch 3', x: 300, y: 220 },
  { id: 'branch_3', label: 'Branch 4', x: 430, y: 220 },
  { id: 'branch_4', label: 'Branch 5', x: 560, y: 220 },
  { id: 'aggregator', label: 'Aggregator', x: 300, y: 340 },
  { id: 'critic', label: 'Critic', x: 300, y: 440 },
  { id: 'synthesizer', label: 'Synthesizer', x: 300, y: 540 },
];

const EDGES = [
  { id: 'e-pl-rag', source: 'planner', target: 'rag_retrieval' },
  { id: 'e-rag-b0', source: 'rag_retrieval', target: 'branch_0' },
  { id: 'e-rag-b1', source: 'rag_retrieval', target: 'branch_1' },
  { id: 'e-rag-b2', source: 'rag_retrieval', target: 'branch_2' },
  { id: 'e-rag-b3', source: 'rag_retrieval', target: 'branch_3' },
  { id: 'e-rag-b4', source: 'rag_retrieval', target: 'branch_4' },
  { id: 'e-b0-agg', source: 'branch_0', target: 'aggregator' },
  { id: 'e-b1-agg', source: 'branch_1', target: 'aggregator' },
  { id: 'e-b2-agg', source: 'branch_2', target: 'aggregator' },
  { id: 'e-b3-agg', source: 'branch_3', target: 'aggregator' },
  { id: 'e-b4-agg', source: 'branch_4', target: 'aggregator' },
  { id: 'e-agg-cri', source: 'aggregator', target: 'critic' },
  { id: 'e-cri-syn', source: 'critic', target: 'synthesizer' },
  {
    id: 'e-cri-agg-retry',
    source: 'critic',
    target: 'aggregator',
    style: { stroke: '#fb923c', strokeDasharray: '5 4' },
    label: 'retry',
    labelStyle: { fill: '#fb923c', fontSize: 10 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#fb923c' },
  },
];

function makeNodes(nodeStatuses: Record<string, string>) {
  return NODE_DEFS.map(def => ({
    id: def.id,
    type: 'agentNode',
    position: { x: def.x, y: def.y },
    data: {
      label: def.label,
      status: nodeStatuses[def.id] || 'pending',
    },
  }));
}

function makeEdges(nodeStatuses: Record<string, string>) {
  return EDGES.map(e => {
    const srcDone = nodeStatuses[e.source] === 'done';
    const defaultColor = srcDone ? '#4a2a2a' : '#2a1818';
    return {
      ...e,
      style: e.style || { stroke: defaultColor, strokeWidth: 1.5 },
      markerEnd: e.markerEnd || { type: MarkerType.ArrowClosed, color: defaultColor },
      animated: nodeStatuses[e.source] === 'running',
    };
  });
}

interface AgentWorkflowAnimationProps {
  autoPlay?: boolean;
}

const AgentWorkflowAnimation: React.FC<AgentWorkflowAnimationProps> = ({ autoPlay = true }) => {
  const [nodeStatuses, setNodeStatuses] = React.useState<Record<string, string>>({});
  const [nodes, setNodes, onNodesChange] = useNodesState(makeNodes(nodeStatuses));
  const [edges, setEdges, onEdgesChange] = useEdgesState(makeEdges(nodeStatuses));
  const [isInView, setIsInView] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Sync node/edge state whenever nodeStatuses changes
  useEffect(() => {
    setNodes(makeNodes(nodeStatuses));
    setEdges(makeEdges(nodeStatuses));
  }, [nodeStatuses, setNodes, setEdges]);

  // Detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the component is visible
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  // Auto-play animation sequence
  useEffect(() => {
    if (!autoPlay || !isInView) return;

    const sequence = [
      { step: 0, delay: 0, statuses: {} },
      { step: 1, delay: 1000, statuses: { planner: 'running' } },
      { step: 2, delay: 2000, statuses: { planner: 'done', rag_retrieval: 'running' } },
      {
        step: 3,
        delay: 3000,
        statuses: {
          planner: 'done',
          rag_retrieval: 'done',
          branch_0: 'running',
          branch_1: 'running',
          branch_2: 'running',
          branch_3: 'running',
          branch_4: 'running',
        },
      },
      {
        step: 4,
        delay: 4500,
        statuses: {
          planner: 'done',
          rag_retrieval: 'done',
          branch_0: 'done',
          branch_1: 'done',
          branch_2: 'done',
          branch_3: 'done',
          branch_4: 'done',
          aggregator: 'running',
        },
      },
      {
        step: 5,
        delay: 5500,
        statuses: {
          planner: 'done',
          rag_retrieval: 'done',
          branch_0: 'done',
          branch_1: 'done',
          branch_2: 'done',
          branch_3: 'done',
          branch_4: 'done',
          aggregator: 'done',
          critic: 'running',
        },
      },
      {
        step: 6,
        delay: 6500,
        statuses: {
          planner: 'done',
          rag_retrieval: 'done',
          branch_0: 'done',
          branch_1: 'done',
          branch_2: 'done',
          branch_3: 'done',
          branch_4: 'done',
          aggregator: 'done',
          critic: 'done',
          synthesizer: 'running',
        },
      },
      {
        step: 7,
        delay: 7500,
        statuses: {
          planner: 'done',
          rag_retrieval: 'done',
          branch_0: 'done',
          branch_1: 'done',
          branch_2: 'done',
          branch_3: 'done',
          branch_4: 'done',
          aggregator: 'done',
          critic: 'done',
          synthesizer: 'done',
        },
      },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    sequence.forEach(({ delay, statuses }) => {
      const timeout = setTimeout(() => {
        setNodeStatuses(statuses as Record<string, string>);
      }, delay);
      timeouts.push(timeout);
    });

    // Loop the animation
    const loopTimeout = setTimeout(() => {
      setNodeStatuses({});
    }, 9000);
    timeouts.push(loopTimeout);

    const intervalId = setInterval(() => {
      sequence.forEach(({ delay, statuses }) => {
        setTimeout(() => {
          setNodeStatuses(statuses as Record<string, string>);
        }, delay);
      });
    }, 9000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(intervalId);
    };
  }, [autoPlay, isInView]);

  const onInit = useCallback((instance: any) => instance.fitView({ padding: 0.15 }), []);

  return (
    <div className="ag-wrap" ref={wrapperRef}>
      <div className="ag-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={NODE_TYPES}
          onInit={onInit}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnDrag={false}
          zoomOnPinch={false}
          preventScrolling={false}
        >
          <Background color="#1e1e2e" gap={20} size={1} />
        </ReactFlow>
      </div>

      <div className="ag-legend">
        {[
          ['pending', '#555', 'Waiting'],
          ['running', '#fbbf24', 'Running'],
          ['done', '#4ade80', 'Done'],
          ['failed', '#f87171', 'Failed'],
        ].map(([s, c, l]) => (
          <span key={s} className="ag-legend__item">
            <span className="ag-legend__dot" style={{ background: c }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AgentWorkflowAnimation;
