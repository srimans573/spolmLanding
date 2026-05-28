'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  num: string;
  lbl: string;
}

// Parse a stat string into its numeric value + prefix/suffix
function parse(raw: string): { value: number; prefix: string; suffix: string; formatted: (n: number) => string } {
  // e.g. "8,924" | "+24%" | "−61%" | "247" | "4 lines"
  const withCommas = /^([+−-]?)([\d,]+)(.*)$/.exec(raw.trim());
  if (!withCommas) return { value: 0, prefix: '', suffix: raw, formatted: () => raw };

  const prefix = withCommas[1];
  const digits = withCommas[2].replace(/,/g, '');
  const suffix = withCommas[3];
  const value = parseInt(digits, 10);
  const useCommas = withCommas[2].includes(',');

  const formatted = (n: number) => {
    const str = useCommas ? Math.round(n).toLocaleString() : String(Math.round(n));
    return `${prefix}${str}${suffix}`;
  };

  return { value, prefix, suffix, formatted };
}

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedStat({ num, lbl }: StatItem) {
  const { value, formatted } = parse(num);
  const [display, setDisplay] = useState(formatted(0));
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1600;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = easeOut(progress) * value;
            setDisplay(formatted(current));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, formatted]);

  return (
    <div ref={ref} className="stat-strip__item">
      <div className="stat-strip__num">{display}</div>
      <div className="stat-strip__lbl">{lbl}</div>
    </div>
  );
}

export default function StatStrip({ items }: { items: StatItem[] }) {
  return (
    <div className="stat-strip">
      {items.map((it, i) => (
        <AnimatedStat key={i} num={it.num} lbl={it.lbl} />
      ))}
    </div>
  );
}
