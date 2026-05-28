'use client';

import { useState, useEffect } from 'react';

const ITEMS = [
  { name: 'reasoning',     ms: 756,  status: 'failure' },
  { name: 'authenticate',  ms: 2,    status: 'success' },
  { name: 'reasoning',     ms: 563,  status: 'success' },
  { name: 'fetch_email',   ms: 292,  status: 'success' },
  { name: 'reasoning',     ms: 776,  status: 'success' },
  { name: 'summarize',     ms: 763,  status: 'success' },
  { name: 'generateReply', ms: 1062, status: 'success' },
  { name: 'sendReply',     ms: 524,  status: 'success' },
];

export default function MiniTrace() {
  const [n, setN] = useState(0);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur = (cur + 1) % (ITEMS.length + 4);
      setN(cur);
    }, 380);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mini-trace">
      <div className="mini-trace__head">
        <span className="wm" style={{ fontSize: 12 }}>spolm</span>
        <span style={{ color: 'var(--text-faint)' }}>›</span>
        <span style={{ fontSize: 11, fontFamily: 'var(--mono)' }}>e28b300f…</span>
        <span className="chip chip--ok" style={{ marginLeft: 'auto' }}>complete</span>
      </div>
      <div className="mini-trace__body">
        {ITEMS.map((it, i) => (
          <div
            key={i}
            className={`mini-step${i < n ? ' in' : ''} mini-step--${it.status}`}
          >
            <span className="mini-step__dot" />
            <span className="mini-step__name">{it.name}</span>
            <span className="mini-step__ms">{it.ms}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}
