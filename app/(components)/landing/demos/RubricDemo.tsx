'use client';

import { useState, useEffect } from 'react';
import { useInView } from './useInView';

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

export default function RubricDemo({ height = 460 }: { height?: number }) {
  const [hostRef, inView] = useInView(0.25);
  const [score, setScore] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [rootText, setRootText] = useState('');

  useEffect(() => {
    if (!inView) return;
    setScore(0); setRightCount(0); setWrongCount(0); setRootText('');

    const sId = setInterval(() => setScore((s) => s < 10 ? +(s + 0.5).toFixed(1) : 10), 90);
    const stopScore = setTimeout(() => clearInterval(sId), 90 * 22);

    const rId = setInterval(() => setRightCount((n) => n < 3 ? n + 1 : 3), 480);
    const wId = setInterval(() => setWrongCount((n) => n < 2 ? n + 1 : 2), 520);

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

    return () => {
      clearInterval(sId); clearTimeout(stopScore);
      clearInterval(rId); clearInterval(wId);
      clearInterval(tId); clearTimeout(loop);
    };
  }, [inView]);

  const pct = Math.min(score / 10, 1);
  const arcLen = 2 * Math.PI * 56;
  const dash = `${arcLen * pct * 0.5} ${arcLen}`;

  return (
    <div ref={hostRef} className="demo-shell" style={{ height }}>
      <div className="demo-chrome">
        <div className="demo-chrome__dots"><span /><span /><span /></div>
        <div className="demo-chrome__url">
          <span className="wm" style={{ fontSize: 13 }}>spolm</span>
          <span style={{ opacity: .5 }}>›</span>
          <span>Logs</span>
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
          <div className="rubric-card rubric-gauge-card">
            <div className="eyebrow">Score</div>
            <div className="rubric-gauge">
              <svg viewBox="0 0 140 90" width="160" height="100">
                <path d="M14 80 A56 56 0 0 1 126 80" fill="none" stroke="var(--border)" strokeWidth="10" strokeLinecap="round" />
                <path d="M14 80 A56 56 0 0 1 126 80" fill="none" stroke="var(--ok)" strokeWidth="10" strokeLinecap="round" strokeDasharray={dash} pathLength={arcLen} />
              </svg>
              <div className="rubric-gauge__big">
                <span>{Math.round(score)}</span>
                <span className="rubric-gauge__den">/10</span>
              </div>
              <div className="rubric-gauge__sub">
                <strong>{Math.round(score * 0.8)}</strong> passed · <strong>0</strong> failed
              </div>
            </div>
          </div>

          <div className="rubric-card">
            <div className="eyebrow" style={{ color: 'var(--ok)' }}>✓  What went right</div>
            <div className="rubric-list">
              {RIGHT_ITEMS.slice(0, rightCount).map((t, i) => (
                <div key={i} className="rubric-row rubric-row--ok">{t}</div>
              ))}
            </div>
          </div>

          <div className="rubric-card">
            <div className="eyebrow" style={{ color: 'var(--err)' }}>✕  What went wrong</div>
            <div className="rubric-list">
              {WRONG_ITEMS.slice(0, wrongCount).map((t, i) => (
                <div key={i} className="rubric-row rubric-row--err">{t}</div>
              ))}
            </div>
          </div>

          <div className="rubric-card rubric-root">
            <div className="eyebrow">◐  Root cause summary</div>
            <p className="rubric-root__text">
              {rootText}
              {rootText.length < ROOT_CAUSE.length && <span className="caret" />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
