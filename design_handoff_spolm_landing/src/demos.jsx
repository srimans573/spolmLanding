/* spolm — animated product demos
   Three modules that recreate slices of the product with looping animations:
   - TraceDemo: log view, steps appear, cursor clicks a step, detail panel updates
   - RubricDemo: score fills, what-went-right/wrong slides in, root cause types
   - LoopDemo: before/after agent runs with a lesson card moving between them
*/

const { useState, useEffect, useRef } = React;

/* ─────────── Hooks ─────────── */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTick(active, intervalMs, steps) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    setI(0);
    let n = 0;
    const id = setInterval(() => {
      n = (n + 1) % steps;
      setI(n);
    }, intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs, steps]);
  return i;
}

/* ─────────── Cursor sprite ─────────── */
function CursorSprite({ x, y, clicking }) {
  return (
    <div className={'cursor' + (clicking ? ' clicking' : '')} style={{ left: x, top: y }}>
      <svg viewBox="0 0 18 22" fill="none">
        <path d="M2 1.5L2 18L6.5 14L9 19.5L11.5 18.3L9 13L14.5 13L2 1.5Z" fill="#161311" stroke="#fff" strokeWidth="1"/>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRACE DEMO
   Compact logs view: header → step list → step detail
   ═══════════════════════════════════════════════════════ */
const TRACE_STEPS = [
  { i: 1,  name: 'reasoning',    ms: 756,  kind: 'llm',  tag: 'gemini',      status: 'failure' },
  { i: 2,  name: 'authenticate', ms: 2,    kind: 'auth', tag: 'gmail_oauth', status: 'success' },
  { i: 3,  name: 'reasoning',    ms: 563,  kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 4,  name: 'fetch_email',  ms: 292,  kind: 'email',tag: 'gmail',       status: 'success' },
  { i: 5,  name: 'reasoning',    ms: 776,  kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 6,  name: 'summarize',    ms: 763,  kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 7,  name: 'reasoning',    ms: 776,  kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 8,  name: 'generateReply',ms: 1062, kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 9,  name: 'reasoning',    ms: 927,  kind: 'llm',  tag: 'gemini',      status: 'success' },
  { i: 10, name: 'sendReply',    ms: 524,  kind: 'email',tag: 'gmail',       status: 'success' },
  { i: 11, name: 'reasoning',    ms: 664,  kind: 'llm',  tag: 'gemini',      status: 'success' },
];
const KIND_COLOR = { llm: 'info', auth: 'warn', email: 'ok' };

const STEP_DETAILS = {
  1: {
    title: 'reasoning',
    chip: 'failure',
    chipClass: 'err',
    input: {
      goal: "Read the latest email and reply with 'chicken' in it",
      iteration: 1,
      context: { lastAction: null, authenticated: false }
    },
    output: {
      action: 'authenticate',
      reasoning: "The agent is not authenticated, so it needs to authenticate first."
    }
  },
  8: {
    title: 'generateReply',
    chip: 'success',
    chipClass: 'ok',
    input: {
      goal: "Read the latest email and reply with 'chicken' in it",
      thread: '19a70b02ba55e5d',
      tone: 'casual'
    },
    output: {
      reply: "Hey — thanks for the note. chicken. Let me know what works for you.",
      length: 'short'
    }
  },
};

function TraceDemo({ height = 460 }) {
  const [hostRef, inView] = useInView(0.2);
  const [revealed, setRevealed] = useState(0);   // how many steps have appeared
  const [selected, setSelected] = useState(1);   // which step is highlighted
  const [cursor, setCursor] = useState({ x: 320, y: 180, click: false });

  // Phase 1: reveal steps one by one
  useEffect(() => {
    if (!inView) return;
    setRevealed(0); setSelected(1);
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setRevealed(n);
      if (n >= TRACE_STEPS.length) clearInterval(id);
    }, 130);
    return () => clearInterval(id);
  }, [inView]);

  // Phase 2: after reveal, cursor clicks between step 1 and step 8 on a loop
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
      {/* faux window chrome */}
      <div className="demo-chrome">
        <div className="demo-chrome__dots">
          <span></span><span></span><span></span>
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
        {/* run header */}
        <div className="trace-header">
          <div>
            <div className="trace-task">GmailReadAndReply</div>
            <div className="trace-task-sub">Task: Read the latest email and reply with 'chicken' in it</div>
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

        {/* tabs */}
        <div className="trace-tabs">
          <span className="trace-tab">Overview</span>
          <span className="trace-tab is-active">Logs</span>
          <span className="trace-tab">Issues</span>
          <span className="trace-tab">Rubric Evals</span>
        </div>

        {/* two-pane: steps + detail */}
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
                    <span className={'chip chip--' + KIND_COLOR[s.kind]}>{s.kind}</span>
                    <span className="trace-step__tag">{s.tag}</span>
                  </div>
                  <div className="trace-step__right">
                    <span className="trace-step__ms">{s.ms}ms</span>
                    <span className={'chip chip--' + (s.status === 'success' ? 'ok' : 'err')}>{s.status}</span>
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
              <span className={'chip chip--' + detail.chipClass}>{detail.chip}</span>
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

/* ═══════════════════════════════════════════════════════
   RUBRIC DEMO
   Score gauge + what-went-right/wrong + root cause typing
   ═══════════════════════════════════════════════════════ */
const RIGHT_ITEMS = [
  'Successfully parsed user intent and formulated relevant initial search queries.',
  'Retrieved and synthesized core information from reliable sources.',
  'Generated a well-structured and cited answer with high confidence.',
];
const WRONG_ITEMS = [
  "Prematurely filtered out potentially relevant search results, specifically those related to 'recent developments'.",
  "The final answer, while accurate on core principles, did not fully address the 'recent timeframe' aspect.",
];
const ROOT_CAUSE =
  "The primary root cause was context blindness during the 'filter_results' step, where the agent excluded search results related to 'recent developments and applications', limiting the scope of information available for synthesis.";

function RubricDemo({ height = 460 }) {
  const [hostRef, inView] = useInView(0.25);
  const [score, setScore] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [rootText, setRootText] = useState('');

  useEffect(() => {
    if (!inView) return;
    setScore(0); setRightCount(0); setWrongCount(0); setRootText('');

    const sId = setInterval(() => {
      setScore((s) => (s < 10 ? +(s + 0.5).toFixed(1) : 10));
    }, 90);
    const stopScore = setTimeout(() => clearInterval(sId), 90 * 22);

    const rId = setInterval(() => setRightCount((n) => (n < 3 ? n + 1 : 3)), 480);
    const wId = setInterval(() => setWrongCount((n) => (n < 2 ? n + 1 : 2)), 520);

    let chars = 0;
    const tId = setInterval(() => {
      chars += 2;
      if (chars > ROOT_CAUSE.length) chars = ROOT_CAUSE.length;
      setRootText(ROOT_CAUSE.slice(0, chars));
      if (chars >= ROOT_CAUSE.length) clearInterval(tId);
    }, 22);

    const loop = setTimeout(() => {
      setScore(0); setRightCount(0); setWrongCount(0); setRootText('');
    }, 11000);

    return () => { clearInterval(sId); clearTimeout(stopScore); clearInterval(rId); clearInterval(wId); clearInterval(tId); clearTimeout(loop); };
  }, [inView]);

  // gauge maths
  const pct = Math.min(score / 10, 1);
  const arcLen = 2 * Math.PI * 56;
  const dash = `${arcLen * pct * 0.5} ${arcLen}`;  // semi-circle

  return (
    <div ref={hostRef} className="demo-shell" style={{ height }}>
      <div className="demo-chrome">
        <div className="demo-chrome__dots"><span></span><span></span><span></span></div>
        <div className="demo-chrome__url">
          <span className="wm" style={{ fontSize: 13 }}>spolm</span>
          <span style={{ opacity: .5 }}>›</span><span>Logs</span>
          <span style={{ opacity: .5 }}>›</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>Run Overview</span>
        </div>
      </div>

      <div className="demo-body rubric-body">
        <div className="rubric-head">
          <div>
            <div className="rubric-task">Task: What is quantum computing?</div>
            <div className="rubric-meta">
              Run ID <code>d96995ef-8ce7-4472-ab42…</code>
              <span style={{ margin: '0 10px', color: 'var(--text-faint)' }}>·</span>
              Duration <strong>59.88s</strong>
              <span style={{ margin: '0 10px', color: 'var(--text-faint)' }}>·</span>
              Tokens <strong>0</strong>
            </div>
          </div>
          <span className="chip chip--ok" style={{ alignSelf: 'flex-start' }}>complete</span>
        </div>

        <div className="rubric-grid">
          {/* gauge */}
          <div className="rubric-card rubric-gauge-card">
            <div className="eyebrow">Score</div>
            <div className="rubric-gauge">
              <svg viewBox="0 0 140 90" width="160" height="100">
                <path d="M14 80 A56 56 0 0 1 126 80" fill="none" stroke="var(--border)" strokeWidth="10" strokeLinecap="round"/>
                <path d="M14 80 A56 56 0 0 1 126 80" fill="none" stroke="var(--ok)" strokeWidth="10" strokeLinecap="round" strokeDasharray={dash} pathLength={arcLen}/>
              </svg>
              <div className="rubric-gauge__big">
                <span>{score.toFixed(0)}</span><span className="rubric-gauge__den">/10</span>
              </div>
              <div className="rubric-gauge__sub"><strong>{Math.round(score * 0.8)}</strong> passed · <strong>0</strong> failed</div>
            </div>
          </div>

          {/* what went right */}
          <div className="rubric-card">
            <div className="eyebrow" style={{ color: 'var(--ok)' }}>✓  What went right</div>
            <div className="rubric-list">
              {RIGHT_ITEMS.slice(0, rightCount).map((t, i) => (
                <div key={i} className="rubric-row rubric-row--ok">{t}</div>
              ))}
            </div>
          </div>

          {/* what went wrong */}
          <div className="rubric-card">
            <div className="eyebrow" style={{ color: 'var(--err)' }}>✕  What went wrong</div>
            <div className="rubric-list">
              {WRONG_ITEMS.slice(0, wrongCount).map((t, i) => (
                <div key={i} className="rubric-row rubric-row--err">{t}</div>
              ))}
            </div>
          </div>

          {/* root cause */}
          <div className="rubric-card rubric-root">
            <div className="eyebrow">◐  Root cause summary</div>
            <p className="rubric-root__text">
              {rootText}
              {rootText.length < ROOT_CAUSE.length && <span className="caret"></span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LOOP DEMO
   Run A (fails) → lesson saved → Run B (faster, succeeds)
   ═══════════════════════════════════════════════════════ */
const RUN_A = [
  { name: 'reasoning',    status: 'failure', ms: 756 },
  { name: 'reasoning',    status: 'success', ms: 612 },
  { name: 'fetch_email',  status: 'failure', ms: 401 },
  { name: 'authenticate', status: 'success', ms: 4   },
  { name: 'fetch_email',  status: 'success', ms: 292 },
  { name: 'reasoning',    status: 'success', ms: 776 },
  { name: 'generateReply',status: 'success', ms: 1062},
  { name: 'sendReply',    status: 'success', ms: 524 },
];
const RUN_B = [
  { name: 'authenticate', status: 'success', ms: 3   },
  { name: 'fetch_email',  status: 'success', ms: 280 },
  { name: 'generateReply',status: 'success', ms: 998 },
  { name: 'sendReply',    status: 'success', ms: 510 },
];

function LoopDemo({ height = 480 }) {
  const [hostRef, inView] = useInView(0.2);
  const [phase, setPhase] = useState(0); // 0 idle, 1 run A done, 2 lesson moving, 3 lesson stored, 4 run B playing
  const [aPlayed, setAPlayed] = useState(0);
  const [bPlayed, setBPlayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;
    async function loop() {
      while (!cancelled) {
        // reset
        setPhase(0); setAPlayed(0); setBPlayed(0);
        await wait(400);

        // Run A plays
        setPhase(1);
        for (let i = 1; i <= RUN_A.length; i++) {
          if (cancelled) return;
          setAPlayed(i);
          await wait(180);
        }
        await wait(700);

        // Lesson card moves
        setPhase(2);
        await wait(1400);

        setPhase(3);
        await wait(700);

        // Run B plays — fast and clean
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
            <div className="loop-col__sub">8 steps · 4.9s · <span className="chip chip--err">2 failures</span></div>
          </div>
          <div className="loop-steps">
            {RUN_A.map((s, i) => (
              <div key={i} className={'loop-step ' + (i < aPlayed ? 'is-visible ' : '') + 'loop-step--' + s.status}>
                <span className="loop-step__dot"></span>
                <span className="loop-step__name">{s.name}</span>
                <span className="loop-step__ms">{s.ms}ms</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: knowledge base + flying lesson */}
        <div className="loop-center">
          <div className={'loop-lesson ' + (phase >= 2 ? 'is-flying ' : '') + (phase >= 3 ? 'is-stored' : '')}>
            <div className="eyebrow">Lesson learned</div>
            <div className="loop-lesson__title">Always <code>authenticate</code> before <code>fetch_email</code></div>
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
                <span key={i} style={{ height: 6 + ((i * 13) % 18) + 'px' }}></span>
              ))}
            </div>
          </div>

          <div className={'loop-arrow loop-arrow--right ' + (phase >= 3 ? 'is-active' : '')}>
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
            <div className="loop-col__sub">4 steps · 1.8s · <span className="chip chip--ok">0 failures</span></div>
          </div>
          <div className="loop-steps">
            {RUN_B.map((s, i) => (
              <div key={i} className={'loop-step ' + (i < bPlayed ? 'is-visible ' : '') + 'loop-step--' + s.status}>
                <span className="loop-step__dot"></span>
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

function wait(ms) { return new Promise((r) => setTimeout(r, ms / (window.__animSpeed || 1))); }

Object.assign(window, { TraceDemo, RubricDemo, LoopDemo });
