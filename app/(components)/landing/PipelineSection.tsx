'use client';
import { useEffect, useRef } from 'react';
import TraceDemo from './demos/TraceDemo';
import RubricDemo from './demos/RubricDemo';
import LoopDemo from './demos/LoopDemo';

export default function PipelineSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const scroller = root.querySelector<HTMLElement>('.pl-scroller');
    const panels   = Array.from(root.querySelectorAll<HTMLElement>('.pl-panel'));
    const nodes    = Array.from(root.querySelectorAll<HTMLElement>('.pl-node'));
    const fill     = root.querySelector<HTMLElement>('.pl-rail__fill');
    const cue      = root.querySelector<HTMLElement>('.pl-rail__cue');
    if (!scroller || panels.length === 0) return;

    const N = panels.length;
    let raf = 0;

    function render() {
      raf = 0;
      const max  = scroller!.scrollHeight - scroller!.clientHeight;
      const prog = max > 0 ? Math.min(1, Math.max(0, scroller!.scrollTop / max)) : 0;

      // Divide scroll into N-1 inter-stage segments. Each stage holds fully
      // for DWELL fraction of its segment, then cross-fades sharply to the next.
      const DWELL    = 0.88;
      const segments = N - 1;
      const scaled   = prog * segments;
      const segIdx   = Math.min(Math.floor(scaled), segments - 1);
      const localT   = scaled - segIdx;
      const fadeT    = localT < DWELL ? 0 : (localT - DWELL) / (1 - DWELL); // 0→1 during fade
      const current  = fadeT < 0.5 ? segIdx : segIdx + 1;

      panels.forEach((el, i) => {
        let opacity = 0;
        let ty      = 0;
        if (i === segIdx)     { opacity = 1 - fadeT; ty = -fadeT * 18; }
        else if (i === segIdx + 1) { opacity = fadeT;     ty = (1 - fadeT) * 18; }
        el.style.opacity       = String(opacity);
        el.style.transform     = `translateY(${ty}px)`;
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      });

      nodes.forEach((el, i) => {
        el.classList.toggle('is-active',  i <= current);
        el.classList.toggle('is-current', i === current);
      });

      if (fill) fill.style.height = `${prog * 100}%`;
      if (cue)  cue.style.opacity  = prog > 0.04 ? '0' : '1';
    }

    function onScroll() { if (!raf) raf = requestAnimationFrame(render); }

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    requestAnimationFrame(render);

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="spolm-pipeline" ref={rootRef} id="features" aria-label="The spolm data pipeline">

      <div className="pl-head">
        <h2 className="pl-head__title">The Spolm Data Pipeline</h2>
      </div>

      <div className="pl-scroller">
        <div className="pl-track">
          <div className="pl-stage">

            {/* ── ICON RAIL ── */}
            <div className="pl-rail">
              <div className="pl-rail__line"><div className="pl-rail__fill" /></div>

              <div className="pl-node is-active is-current">
                <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="13" cy="13" r="10" />
                  <circle cx="13" cy="13" r="3.4" fill="currentColor" stroke="none" />
                </svg>
                <span className="pl-node__num">1</span>
              </div>

              <div className="pl-node">
                <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13" cy="13" r="10" />
                  <path d="M8.5 13.4l3 3 6-6.4" />
                </svg>
                <span className="pl-node__num">2</span>
              </div>

              <div className="pl-node">
                <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 13a8 8 0 1 1-2.4-5.7" />
                  <path d="M21 4v4.4h-4.4" />
                </svg>
                <span className="pl-node__num">3</span>
              </div>

              <div className="pl-rail__cue">↓</div>
            </div>

            {/* ── PANELS ── */}
            <div className="pl-panels">

              {/* STAGE 01 · TRACE */}
              <div className="pl-panel" style={{ opacity: 1 }}>
                <div className="pl-panel__text">
                  <div className="pl-eyebrow">
                    <span className="pl-eyebrow__stage">01 · trace</span>
                    <span className="pl-eyebrow__verb">/ capture</span>
                  </div>
                  <h3 className="pl-title">Spolm records every run.</h3>
                  <p className="pl-lede">Our tracing SDK seamlessly integrates into your agent.</p>
                  <div className="pl-flow">
                    <div className="pl-flow__node pl-flow__node--core">
                      <span className="pl-flow__v">Trace</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Analysis</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Knowledge Base</span>
                    </div>
                  </div>
                </div>
                <div className="pl-panel__media">
                  <TraceDemo height={476} />
                </div>
              </div>

              {/* STAGE 02 · SCORE */}
              <div className="pl-panel">
                <div className="pl-panel__text">
                  <div className="pl-eyebrow">
                    <span className="pl-eyebrow__stage">02 · score</span>
                    <span className="pl-eyebrow__verb">/ grade</span>
                  </div>
                  <h3 className="pl-title">Every run, graded.</h3>
                  <p className="pl-lede">Rubrics score the trace end-to-end. Spolm pinpoints what broke and exactly where.</p>
                  <div className="pl-flow">
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Trace</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node pl-flow__node--core">
                      <span className="pl-flow__v">Analysis</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Knowledge Base</span>
                    </div>
                  </div>
                </div>
                <div className="pl-panel__media">
                  <RubricDemo height={476} />
                </div>
              </div>

              {/* STAGE 03 · LEARN */}
              <div className="pl-panel">
                <div className="pl-panel__text">
                  <div className="pl-eyebrow">
                    <span className="pl-eyebrow__stage">03 · learn</span>
                    <span className="pl-eyebrow__verb">/ remember</span>
                  </div>
                  <h3 className="pl-title">Every mistake, remembered.</h3>
                  <p className="pl-lede">Lessons from graded runs feed back as context before the next run starts.</p>
                  <div className="pl-flow">
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Trace</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node">
                      <span className="pl-flow__v">Analysis</span>
                    </div>
                    <span className="pl-flow__arrow">→</span>
                    <div className="pl-flow__node pl-flow__node--core">
                      <span className="pl-flow__v">Knowledge Base</span>
                    </div>
                  </div>
                </div>
                <div className="pl-panel__media">
                  <LoopDemo height={476} />
                </div>
              </div>

            </div>{/* /.pl-panels */}
          </div>{/* /.pl-stage */}
        </div>{/* /.pl-track */}
      </div>{/* /.pl-scroller */}

    </section>
  );
}
