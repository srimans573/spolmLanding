'use client';

import { useState, useEffect } from 'react';
import { useInView } from './useInView';

const TRACE_STEPS = [
  { i: 1,  name: 'reasoning',    ms: 756,  kind: 'llm',   tag: 'gemini',      status: 'failure' },
  { i: 2,  name: 'authenticate', ms: 2,    kind: 'auth',  tag: 'gmail_oauth', status: 'success' },
  { i: 3,  name: 'reasoning',    ms: 563,  kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 4,  name: 'fetch_email',  ms: 292,  kind: 'email', tag: 'gmail',       status: 'success' },
  { i: 5,  name: 'reasoning',    ms: 776,  kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 6,  name: 'summarize',    ms: 763,  kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 7,  name: 'reasoning',    ms: 776,  kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 8,  name: 'generateReply',ms: 1062, kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 9,  name: 'reasoning',    ms: 927,  kind: 'llm',   tag: 'gemini',      status: 'success' },
  { i: 10, name: 'sendReply',    ms: 524,  kind: 'email', tag: 'gmail',       status: 'success' },
  { i: 11, name: 'reasoning',    ms: 664,  kind: 'llm',   tag: 'gemini',      status: 'success' },
];

const KIND_COLOR: Record<string, string> = { llm: 'info', auth: 'warn', email: 'ok' };

const STEP_DETAILS: Record<number, {
  title: string; chip: string; chipClass: string;
  input: object; output: object;
}> = {
  1: {
    title: 'reasoning',
    chip: 'failure',
    chipClass: 'err',
    input: {
      goal: "Read the latest email and reply with 'chicken' in it",
      iteration: 1,
      context: { lastAction: null, authenticated: false },
    },
    output: {
      action: 'authenticate',
      reasoning: 'The agent is not authenticated, so it needs to authenticate first.',
    },
  },
  8: {
    title: 'generateReply',
    chip: 'success',
    chipClass: 'ok',
    input: {
      goal: "Read the latest email and reply with 'chicken' in it",
      thread: '19a70b02ba55e5d',
      tone: 'casual',
    },
    output: {
      reply: "Hey — thanks for the note. chicken. Let me know what works for you.",
      length: 'short',
    },
  },
};

function CursorSprite({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <div className={`cursor${clicking ? ' clicking' : ''}`} style={{ left: x, top: y }}>
      <svg viewBox="0 0 18 22" fill="none">
        <path d="M2 1.5L2 18L6.5 14L9 19.5L11.5 18.3L9 13L14.5 13L2 1.5Z" fill="#161311" stroke="#fff" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function TraceDemo({ height = 460 }: { height?: number }) {
  const [hostRef, inView] = useInView(0.2);
  const [revealed, setRevealed] = useState(0);
  const [selected, setSelected] = useState(1);
  const [cursor, setCursor] = useState({ x: 320, y: 180, click: false });

  useEffect(() => {
    if (!inView) return;
    setRevealed(0);
    setSelected(1);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setRevealed(n);
      if (n >= TRACE_STEPS.length) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const total = TRACE_STEPS.length * 130 + 400;
    const targets = [
      { step: 1, x: 250, y: 92  },
      { step: 8, x: 250, y: 360 },
    ];
    let i = 0;
    const tickClick = () => {
      const t = targets[i % targets.length];
      setCursor({ x: t.x, y: t.y, click: false });
      setTimeout(() => {
        setCursor((c) => ({ ...c, click: true }));
        setSelected(t.step);
      }, 750);
      setTimeout(() => setCursor((c) => ({ ...c, click: false })), 1300);
      i++;
    };
    const init = setTimeout(tickClick, total);
    const loop = setInterval(tickClick, 3200);
    return () => { clearTimeout(init); clearInterval(loop); };
  }, [inView]);

  const detail = STEP_DETAILS[selected] || STEP_DETAILS[1];

  return (
    <div ref={hostRef} className="demo-shell" style={{ height }}>
      <div className="demo-chrome">
        <div className="demo-chrome__dots">
          <span /><span /><span />
        </div>
        <div className="demo-chrome__url">
          <span className="wm" style={{ fontSize: 13 }}>spolm</span>
          <span style={{ opacity: .5 }}>›</span>
          <span>Personal</span>
          <span style={{ opacity: .5 }}>›</span>
          <span>Logs</span>
          <span style={{ opacity: .5 }}>›</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>e28b300f-406c-45d1…</span>
        </div>
      </div>

      <div className="demo-body trace-body">
        <div className="trace-header">
          <div>
            <div className="trace-task">GmailReadAndReply</div>
            <div className="trace-task-sub">Task: Read the latest email and reply with &apos;chicken&apos; in it</div>
            <div className="trace-meta">
              <span>Run ID <code>e28b300f-406c…</code></span>
              <span>Duration <strong>7.147s</strong></span>
            </div>
          </div>
          <div className="trace-header-stats">
            <div className="trace-stat">
              <div className="eyebrow">Steps</div>
              <div className="trace-stat__big">11</div>
            </div>
            <div className="trace-stat">
              <div className="eyebrow">Status</div>
              <span className="chip chip--ok">Complete</span>
            </div>
          </div>
        </div>

        <div className="trace-tabs">
          <span className="trace-tab">Overview</span>
          <span className="trace-tab is-active">Logs</span>
          <span className="trace-tab">Issues</span>
          <span className="trace-tab">Rubric Evals</span>
        </div>

        <div className="trace-panes">
          <div className="trace-steps">
            <div className="trace-pane-h">Steps</div>
            <div className="trace-step-list">
              {TRACE_STEPS.map((s, idx) => (
                <div
                  key={s.i}
                  className={[
                    'trace-step',
                    idx < revealed ? 'is-visible' : '',
                    selected === s.i ? 'is-selected' : '',
                  ].join(' ')}
                >
                  <div className="trace-step__num">{s.i}. {s.name}</div>
                  <div className="trace-step__meta">
                    <span className={`chip chip--${KIND_COLOR[s.kind]}`}>{s.kind}</span>
                    <span className="trace-step__tag">{s.tag}</span>
                  </div>
                  <div className="trace-step__right">
                    <span className="trace-step__ms">{s.ms}ms</span>
                    <span className={`chip chip--${s.status === 'success' ? 'ok' : 'err'}`}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="trace-detail">
            <div className="trace-detail-head">
              <div>
                <div className="trace-detail-name">{detail.title}</div>
                <div className="trace-detail-sub">
                  Step <code>3c2a574b-ca03-44a4-ba72…</code>
                </div>
              </div>
              <span className={`chip chip--${detail.chipClass}`}>{detail.chip}</span>
            </div>
            <div className="trace-io">
              <div className="trace-io-col">
                <div className="trace-io-h">INPUT</div>
                <pre className="trace-json">{JSON.stringify(detail.input, null, 2)}</pre>
              </div>
              <div className="trace-io-col">
                <div className="trace-io-h">OUTPUT</div>
                <pre className="trace-json">{JSON.stringify(detail.output, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>

        <CursorSprite x={cursor.x} y={cursor.y + 100} clicking={cursor.click} />
      </div>
    </div>
  );
}
