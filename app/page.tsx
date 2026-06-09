import Nav from './(components)/landing/Nav';
import Footer from './(components)/landing/Footer';
import UseCard from './(components)/landing/UseCard';
import PipelineSection from './(components)/landing/PipelineSection';

const DEMO_LINK = 'https://cal.com/srirammanikandan/15min?user=srirammanikandan';
const GITHUB_REPO = 'https://github.com/tryspolm';

function TokenIllustration() {
  return (
    <svg width="100%" height="84" viewBox="0 0 200 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="11" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#A8A199" letterSpacing="1.5">COST PER RUN</text>
      <rect x="16" y="20" width="24" height="52" rx="3" fill="#FCE2D9"/>
      <rect x="56" y="32" width="24" height="40" rx="3" fill="#F5C9B8"/>
      <rect x="96" y="46" width="24" height="26" rx="3" fill="#E8654D" opacity="0.6"/>
      <rect x="136" y="58" width="24" height="14" rx="3" fill="#E8654D"/>
      <path d="M28 24 L68 36 L108 50 L148 62" stroke="#E8654D" strokeWidth="1.5" strokeDasharray="4 2.5" strokeLinecap="round"/>
      <path d="M144 57 L148 62 L152 57" stroke="#E8654D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function FailureIllustration() {
  return (
    <svg width="100%" height="84" viewBox="0 0 200 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="44" y="14" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#A8A199" letterSpacing="1.5">BEFORE</text>
      <circle cx="16" cy="42" r="7" fill="#F5D7D2"/><circle cx="16" cy="42" r="4" fill="#D24A3C"/>
      <circle cx="38" cy="42" r="7" fill="#CFEEDF"/><circle cx="38" cy="42" r="4" fill="#14946A"/>
      <circle cx="60" cy="42" r="7" fill="#F5D7D2"/><circle cx="60" cy="42" r="4" fill="#D24A3C"/>
      <circle cx="82" cy="42" r="7" fill="#F5D7D2"/><circle cx="82" cy="42" r="4" fill="#D24A3C"/>

      <path d="M98 42 L112 42" stroke="#D4CBB9" strokeWidth="1" strokeLinecap="round"/>
      <path d="M108 37 L113 42 L108 47" stroke="#D4CBB9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      <text x="158" y="14" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#14946A" letterSpacing="1.5">AFTER</text>
      <circle cx="124" cy="42" r="7" fill="#CFEEDF"/><circle cx="124" cy="42" r="4" fill="#14946A"/>
      <circle cx="146" cy="42" r="7" fill="#CFEEDF"/><circle cx="146" cy="42" r="4" fill="#14946A"/>
      <circle cx="168" cy="42" r="7" fill="#CFEEDF"/><circle cx="168" cy="42" r="4" fill="#14946A"/>
      <circle cx="190" cy="42" r="7" fill="#CFEEDF"/><circle cx="190" cy="42" r="4" fill="#14946A"/>

      <text x="100" y="74" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#14946A" letterSpacing="0.5">failures drop as memories accumulate</text>
    </svg>
  );
}

function IntegrationIllustration() {
  return (
    <svg width="100%" height="84" viewBox="0 0 200 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="28" width="44" height="28" rx="4" fill="#FAF7F2" stroke="#E6DFD2" strokeWidth="1"/>
      <text x="26" y="40" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#A8A199">your</text>
      <text x="26" y="51" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#3A3530" fontWeight="500">agent</text>

      <path d="M50 42 L64 42" stroke="#D4CBB9" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M60 37 L65 42 L60 47" stroke="#D4CBB9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      <rect x="66" y="22" width="48" height="40" rx="5" fill="#FCE2D9" stroke="#E8654D" strokeWidth="1.5"/>
      <text x="90" y="38" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#E8654D" fontWeight="700">spolm</text>
      <text x="90" y="52" textAnchor="middle" fontFamily="monospace" fontSize="7.5" fill="#C24330">sdk</text>

      <path d="M116 42 L130 42" stroke="#D4CBB9" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M126 37 L131 42 L126 47" stroke="#D4CBB9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      <rect x="132" y="12" width="64" height="17" rx="3" fill="#FAF7F2" stroke="#E6DFD2" strokeWidth="1"/>
      <text x="164" y="24" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6E6862">framework #1</text>
      <rect x="132" y="33" width="64" height="17" rx="3" fill="#FAF7F2" stroke="#E6DFD2" strokeWidth="1"/>
      <text x="164" y="45" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6E6862">framework #2</text>
      <rect x="132" y="54" width="64" height="17" rx="3" fill="#FAF7F2" stroke="#E6DFD2" strokeWidth="1"/>
      <text x="164" y="66" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#6E6862">custom agent</text>
    </svg>
  );
}

export default function Home() {
  return (
    <div className="landing">
      <Nav />

      {/* ─── HERO ─── */}
      <section className="tl-hero">
        <div className="tl-hero__inner">
          <div className="bracket">now live! · v1.0</div>
          <h1 className="tl-hero__title">
            Agents that <em>learn</em><br />
            from every run.
          </h1>
          <p className="tl-hero__lede">
            The open-source contextual learning layer for your agents.
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
        </div>
      </section>

      {/* ─── TRACE ─── */}
      <PipelineSection />

      {/* ─── USE CASES + CTA ─── */}
      <section className="tl-community">
        <div className="tl-use__head">
          <h2 className="tl-section__title">Built for what agents actually need.</h2>
        </div>
        <div className="tl-use__grid">
          <UseCard
            tag="cost"
            title="Fewer tokens, same results."
            body="Spolm surfaces what your agent already knows from past runs, so it stops re-deriving context from scratch every time. Token costs fall as the knowledge base grows."
            illustration={<TokenIllustration />}
          />
          <UseCard
            tag="reliability"
            title="Failures teach the next run."
            body="Warnings and lessons from failed runs are stored and injected as context before the next run. Your agent learns what to avoid without any code changes."
            illustration={<FailureIllustration />}
          />
          <UseCard
            tag="integration"
            title="Works with your stack."
            body="Seamless integration into LangChain, OpenAI ADK, or custom agents, with more adapters coming soon. No architecture changes, no new infrastructure to manage on your end."
            illustration={<IntegrationIllustration />}
          />
        </div>
        <div className="tl-cta__box">
          <h2 className="tl-cta__h">See it on your own agents.</h2>
          <div className="tl-cta__row">
            <a href={DEMO_LINK} className="btn btn--accent btn--lg" target="_blank" rel="noopener noreferrer">
              Book a demo →
            </a>
            <a href={GITHUB_REPO} className="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
