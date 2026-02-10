"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  speed: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
}

function isInsideBrain(x: number, y: number, cx: number, cy: number): boolean {
  // Brain shape: two hemispheres with a slight indent at the top center
  const nx = (x - cx) / 160;
  const ny = (y - cy) / 130;

  // Left hemisphere (ellipse shifted left)
  const lx = nx + 0.25;
  const ly = ny;
  const leftHemi = (lx * lx) / (0.85 * 0.85) + (ly * ly) / (1.0 * 1.0);

  // Right hemisphere (ellipse shifted right)
  const rx = nx - 0.25;
  const ry = ny;
  const rightHemi = (rx * rx) / (0.85 * 0.85) + (ry * ry) / (1.0 * 1.0);

  // Central dip at top
  const topDip = ny < -0.6 && Math.abs(nx) < 0.15;

  // Bottom stem (brain stem area)
  const stem = ny > 0.7 && Math.abs(nx) < 0.2 && ny < 1.1;

  return (leftHemi < 1 || rightHemi < 1 || stem) && !topDip;
}

function generateNodes(
  count: number,
  cx: number,
  cy: number
): Node[] {
  const nodes: Node[] = [];
  let attempts = 0;

  while (nodes.length < count && attempts < count * 50) {
    const x = cx + (Math.random() - 0.5) * 340;
    const y = cy + (Math.random() - 0.5) * 280;
    attempts++;

    if (isInsideBrain(x, y, cx, cy)) {
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.008,
      });
    }
  }

  return nodes;
}

function generateEdges(nodes: Node[], maxDist: number): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].baseX - nodes[j].baseX;
      const dy = nodes[i].baseY - nodes[j].baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        edges.push({
          from: i,
          to: j,
          opacity: 1 - dist / maxDist,
        });
      }
    }
  }

  return edges;
}

export default function BrainGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  // Drag state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
  });
  const offsetRef = useRef({ x: 0, y: 0 });

  // Pulse state for random "synapse firing"
  const pulseRef = useRef<{ nodeIdx: number; progress: number; targetIdx: number }[]>([]);

  const initGraph = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    const nodeCount = 110;

    nodesRef.current = generateNodes(nodeCount, cx, cy);
    edgesRef.current = generateEdges(nodesRef.current, 65);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGraph(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Randomly fire synapse pulses
    const pulseInterval = setInterval(() => {
      if (nodesRef.current.length === 0) return;
      const idx = Math.floor(Math.random() * nodesRef.current.length);
      // Find a connected edge
      const connected = edgesRef.current.filter(
        (e) => e.from === idx || e.to === idx
      );
      if (connected.length > 0) {
        const edge = connected[Math.floor(Math.random() * connected.length)];
        const target = edge.from === idx ? edge.to : edge.from;
        pulseRef.current.push({ nodeIdx: idx, progress: 0, targetIdx: target });
      }
    }, 300);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(offsetRef.current.x, offsetRef.current.y);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Animate node positions (gentle float)
      for (const node of nodes) {
        node.x =
          node.baseX + Math.sin(t * node.speed + node.phase) * 3;
        node.y =
          node.baseY + Math.cos(t * node.speed * 0.7 + node.phase) * 3;
      }

      // Draw edges
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const baseOpacity = edge.opacity * 0.08;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255, 107, 107, ${baseOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw synapse pulses
      for (let i = pulseRef.current.length - 1; i >= 0; i--) {
        const pulse = pulseRef.current[i];
        pulse.progress += 0.025;

        if (pulse.progress > 1) {
          pulseRef.current.splice(i, 1);
          continue;
        }

        const a = nodes[pulse.nodeIdx];
        const b = nodes[pulse.targetIdx];
        if (!a || !b) continue;

        const px = a.x + (b.x - a.x) * pulse.progress;
        const py = a.y + (b.y - a.y) * pulse.progress;
        const pulseOpacity = Math.sin(pulse.progress * Math.PI) * 0.35;

        // Glowing pulse dot
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, `rgba(255, 107, 107, ${pulseOpacity})`);
        gradient.addColorStop(1, `rgba(255, 107, 107, 0)`);
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright edge segment
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255, 107, 107, ${pulseOpacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw nodes
      for (const node of nodes) {
        const pulse =
          0.5 + 0.5 * Math.sin(t * node.speed * 2 + node.phase);
        const opacity = 0.08 + pulse * 0.07;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 107, ${opacity})`;
        ctx.fill();

        // Subtle glow
        const glow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3
        );
        glow.addColorStop(0, `rgba(255, 107, 107, ${opacity * 0.4})`);
        glow.addColorStop(1, `rgba(255, 107, 107, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(pulseInterval);
      window.removeEventListener("resize", resize);
    };
  }, [initGraph]);

  // Sync offset ref
  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = {
      isDragging: true,
      startX: e.clientX - offset.x,
      startY: e.clientY - offset.y,
      offsetX: offset.x,
      offsetY: offset.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.isDragging) return;
    const newX = e.clientX - dragRef.current.startX;
    const newY = e.clientY - dragRef.current.startY;
    setOffset({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    dragRef.current.isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ zIndex: 0 }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
