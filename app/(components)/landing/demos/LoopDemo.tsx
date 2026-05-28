'use client';

import { useState, useEffect } from 'react';
import { useInView } from './useInView';

const RUN_A = [
  { name: 'reasoning',     status: 'failure', ms: 756  },
  { name: 'reasoning',     status: 'success', ms: 612  },
  { name: 'fetch_email',   status: 'failure', ms: 401  },
  { name: 'authenticate',  status: 'success', ms: 4    },
  { name: 'fetch_email',   status: 'success', ms: 292  },
  { name: 'reasoning',     status: 'success', ms: 776  },
  { name: 'generateReply', status: 'success', ms: 1062 },
  { name: 'sendReply',     status: 'success', ms: 524  },
];
const RUN_B = [
  { name: 'authenticate',  status: 'success', ms: 3   },
  { name: 'fetch_email',   status: 'success', ms: 280 },
  { name: 'generateReply', status: 'success', ms: 998 },
  { name: 'sendReply',     status: 'success', ms: 510 },
];

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export default function LoopDemo({ height = 480 }: { height?: number }) {
  const [hostRef, inView] = useInView(0.2);
  const [phase, setPhase]     = useState(0);
  const [aPlayed, setAPlayed] = useState(0);
  const [bPlayed, setBPlayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    async function loop() {
      while (!cancelled) {
        setPhase(0); setAPlayed(0); setBPlayed(0);
        await wait(400);

        setPhase(1);
        for (let i = 1; i <= RUN_A.length; i++) {
          if (cancelled) return;
          setAPlayed(i);
          await wait(180);
        }
        await wait(700);

        setPhase(2);
        await wait(1400);

        setPhase(3);
        await wait(700);

        setPhase(4);
        for (let i = 1; i <= RUN_B.length; i++) {
          if (cancelled) return;
          setBPlayed(i);
          await wait(220);
        }

        await wait(2200);
      }
    }

    loop();
    return () => { cancelled = true; };
  }, [inView]);

  return (
    <div ref={hostRef} className="loop-shell" style={{ height }}>
      <div className="loop-grid">

        {/* RUN A */}
        <div className="loop-col">
          <div className="loop-col__h">
            <div className="eyebrow">Session 1 · Yesterday</div>
            <div className="loop-col__title">Run #182</div>
            <div className="loop-col__sub">
              8 steps · 4.9s · <span className="chip chip--err">2 failures</span>
            </div>
          </div>
          <div className="loop-steps">
            {RUN_A.map((s, i) => (
              <div
                key={i}
                className={`loop-step${i < aPlayed ? ' is-visible' : ''} loop-step--${s.status}`}
              >
                <span className="loop-step__dot" />
                <span className="loop-step__name">{s.name}</span>
                <span className="loop-step__ms">{s.ms}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="loop-center">
          <div className={`loop-lesson${phase >= 2 ? ' is-flying' : ''}${phase >= 3 ? ' is-stored' : ''}`}>
            <div className="eyebrow">Lesson learned</div>
            <div className="loop-lesson__title">
              Always <code>authenticate</code> before <code>fetch_email</code>
            </div>
            <div className="loop-lesson__meta">
              <span className="chip chip--ok">accuracy +24%</span>
              <span className="chip chip--ghost">tool sequence</span>
            </div>
          </div>

          <div className="loop-kb">
            <div className="eyebrow">Knowledge base</div>
            <div className="loop-kb__count">
              <span className="loop-kb__num">{phase >= 3 ? 247 : 246}</span>
              <span className="loop-kb__den"> patterns</span>
            </div>
            <div className="loop-kb__bars">
              {Array.from({ length: 18 }).map((_, i) => (
                <span key={i} style={{ height: 6 + ((i * 13) % 18) + 'px' }} />
              ))}
            </div>
          </div>

          <div className={`loop-arrow loop-arrow--right${phase >= 3 ? ' is-active' : ''}`}>
            <svg viewBox="0 0 80 24" preserveAspectRatio="none">
              <line x1="0" y1="12" x2="74" y2="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" />
              <polyline points="68,5 78,12 68,19" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className="loop-arrow__label">retrieved as context</div>
          </div>
        </div>

        {/* RUN B */}
        <div className="loop-col">
          <div className="loop-col__h">
            <div className="eyebrow">Session 2 · Today</div>
            <div className="loop-col__title">Run #183</div>
            <div className="loop-col__sub">
              4 steps · 1.8s · <span className="chip chip--ok">0 failures</span>
            </div>
          </div>
          <div className="loop-steps">
            {RUN_B.map((s, i) => (
              <div
                key={i}
                className={`loop-step${i < bPlayed ? ' is-visible' : ''} loop-step--${s.status}`}
              >
                <span className="loop-step__dot" />
                <span className="loop-step__name">{s.name}</span>
                <span className="loop-step__ms">{s.ms}ms</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
