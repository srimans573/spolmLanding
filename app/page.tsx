import Nav from './(components)/landing/Nav';
import Footer from './(components)/landing/Footer';
import StatStrip from './(components)/landing/StatStrip';
import MiniTrace from './(components)/landing/MiniTrace';
import UseCard from './(components)/landing/UseCard';
import TraceDemo from './(components)/landing/demos/TraceDemo';
import RubricDemo from './(components)/landing/demos/RubricDemo';
import LoopDemo from './(components)/landing/demos/LoopDemo';

const DEMO_LINK = 'https://cal.com/srirammanikandan/15min?user=srirammanikandan';
const GITHUB_REPO = 'https://github.com/Tanrocode/spolm';

export default function Home() {
  return (
    <div className="landing">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="tl-hero">
        <div className="tl-hero__top">
          <div className="tl-hero__left">
            <div className="bracket">private beta · v0.4</div>
            <h1 className="tl-hero__title">
              Agents that <em>learn</em><br />
              from every run.
            </h1>
            <p className="tl-hero__lede">
              The contextual-learning layer for AI agents.
              We ingest your production telemetry, score every run, and write what
              works into a memory your agents read before the next one.
            </p>
            <div className="tl-hero__cta">
              <a href={DEMO_LINK} className="btn btn--accent" target="_blank" rel="noopener noreferrer">
                Book a Demo →
              </a>
              <a href={GITHUB_REPO} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
            <StatStrip
              items={[
                { num: '8,924',   lbl: 'runs analyzed last 30d' },
                { num: '247',     lbl: 'lessons learned' },
                { num: '+24%',    lbl: 'mean accuracy lift' },
                { num: '−61%',    lbl: 'repeated-mistake rate' },
                { num: '4 lines', lbl: 'to instrument' },
              ]}
            />
          </div>
          <div className="tl-hero__right">
            <MiniTrace />
          </div>
        </div>
      </section>

      {/* ─── TRACE ─── */}
      <section id="features" className="tl-section">
        <div className="tl-section__head">
          <div className="tl-section__num">01</div>
          <div className="tl-section__h">
            <div className="bracket">trace</div>
            <h2 className="tl-section__title">See every step the agent took.</h2>
            <p className="tl-section__lede">
              A timeline of every reasoning call, tool invocation, and result —
              with full inputs, outputs, and timing. Replayable, queryable,
              framework-agnostic.
            </p>
          </div>
        </div>
        <div className="tl-section__demo">
          <TraceDemo height={520} />
        </div>
      </section>

      {/* ─── SCORE ─── */}
      <section className="tl-section tl-section--bg">
        <div className="tl-section__head">
          <div className="tl-section__num">02</div>
          <div className="tl-section__h">
            <div className="bracket">score</div>
            <h2 className="tl-section__title">Every run gets a grade and a diagnosis.</h2>
            <p className="tl-section__lede">
              Configurable rubrics evaluate the run end-to-end. Spolm pinpoints
              what went right, what went wrong, and writes a root-cause summary
              traced to the exact step that broke.
            </p>
          </div>
        </div>
        <div className="tl-section__demo">
          <RubricDemo height={520} />
        </div>
      </section>

      {/* ─── LEARN ─── */}
      <section className="tl-section">
        <div className="tl-section__head">
          <div className="tl-section__num">03</div>
          <div className="tl-section__h">
            <div className="bracket">learn</div>
            <h2 className="tl-section__title">Yesterday&apos;s failure is today&apos;s context.</h2>
            <p className="tl-section__lede">
              Successful and failed decision patterns get written to a knowledge base
              ranked by accuracy. Before each run, the agent retrieves the most
              relevant lessons — and adapts strategy pre-emptively.
            </p>
          </div>
        </div>
        <div className="tl-section__demo">
          <LoopDemo height={480} />
        </div>
      </section>

      {/* ─── QUICKSTART ─── */}
      <section className="tl-section tl-section--bg">
        <div className="tl-quick">
          <div className="tl-quick__left">
            <div className="bracket">04 · quickstart</div>
            <h2 className="tl-section__title"><em>Four lines</em> to instrument.</h2>
            <p className="tl-section__lede">
              Drop the SDK into your agent loop. Spolm tails your runs, scores them,
              and exposes a single <code>retrieve()</code> call that returns
              relevant context for the next prompt.
            </p>
            <ul className="tl-quick__list">
              <li>Works with LangChain, LlamaIndex, AutoGen, or a custom loop.</li>
              <li>OpenTelemetry-compatible. Hosted or self-hosted.</li>
              <li>SOC&nbsp;2 in progress. PII redaction on by default.</li>
            </ul>
          </div>

          <div className="tl-quick__code">
            <div className="tl-code-head">
              <span className="bracket">python · agent.py</span>
              <span className="bracket">copy</span>
            </div>
            <pre className="tl-code">
              <span className="tl-c">{`# 1. wrap your run`}</span>{`\n`}
              <span className="tl-k">from</span>{` spolm `}<span className="tl-k">import</span>{` Spolm\n`}
              {`sp = Spolm(api_key=`}<span className="tl-s">{`"sk-…"`}</span>{`)\n\n`}
              <span className="tl-c">{`# 2. retrieve learned context before each run`}</span>{`\n`}
              {`ctx = sp.`}<span className="tl-fn">retrieve</span>{`(task=`}<span className="tl-s">{`"reply to email"`}</span>{`)\n\n`}
              <span className="tl-c">{`# 3. instrument the run`}</span>{`\n`}
              <span className="tl-k">with</span>{` sp.`}<span className="tl-fn">run</span>{`(task) `}<span className="tl-k">as</span>{` r:\n`}
              {`    result = agent.`}<span className="tl-fn">invoke</span>{`(task, context=ctx)\n`}
              {`    r.`}<span className="tl-fn">log_result</span>{`(result)\n\n`}
              <span className="tl-c">{`# 4. spolm scores it, stores the lessons, ranks them`}</span>{`\n`}
              <span className="tl-c">{`#    next retrieve() gets smarter automatically.`}</span>
            </pre>
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="tl-use">
        <div className="tl-use__head">
          <div className="bracket">built for</div>
          <h2 className="tl-section__title">Teams shipping AI agents in production.</h2>
        </div>
        <div className="tl-use__grid">
          <UseCard
            tag="customer support"
            title="Triage that improves with every ticket."
            body="Catch reasoning loops, hand-off mistakes, and tone drift before they reach customers. Tighter every week, no retraining."
          />
          <UseCard
            tag="research & retrieval"
            title="Stop relitigating the same query."
            body="When one agent navigates a knowledge base for a query, the next inherits the path. Lower tokens, faster answers."
          />
          <UseCard
            tag="dev tools"
            title="Coding agents that remember your repo."
            body="Naming, internal APIs, test idioms — learned once, applied across every PR. The agent stops re-introducing the same bugs."
          />
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="tl-cta">
        <div className="bracket">we&apos;re in private beta</div>
        <h2 className="tl-cta__h">
          See it on your <em>own</em> agents.
        </h2>
        <div className="tl-cta__row">
          <a href={DEMO_LINK} className="btn btn--accent btn--lg" target="_blank" rel="noopener noreferrer">
            Book a 15-min demo →
          </a>
          <a href="#join" className="btn btn--ghost btn--lg">
            Join the waitlist
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
