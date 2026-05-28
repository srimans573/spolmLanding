/* spolm — shared layout components */
const { useState: useS_, useEffect: useE_, useRef: useR_ } = React;

function Nav({ variant = 'A' }) {
  return (
    <header className="nav">
      <a href="#" className="nav__brand wm">spolm</a>
      <nav className="nav__links">
        <span className="bracket nav__toggle" role="button">light</span>
        <a className="nav__link" href="#features">Features</a>
        <a className="nav__link" href="#docs">Docs</a>
        <a className="nav__link" href="#join">Join Us</a>
        <a className="btn btn--accent btn--sm" href="#demo">Book a Demo</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <span className="wm" style={{ fontSize: 24 }}>spolm</span>
        <span className="footer__tag">The learning layer for AI agents</span>
      </div>
      <div className="footer__row footer__row--meta">
        <div className="footer__links">
          <a href="#">Docs</a>
          <a href="#">API</a>
          <a href="#">Changelog</a>
          <a href="#">Careers</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer__copy">© 2026 Spolm</div>
      </div>
    </footer>
  );
}

/* mini stat strip, used in hero of variation B */
function StatStrip({ items }) {
  return (
    <div className="stat-strip">
      {items.map((it, i) => (
        <div key={i} className="stat-strip__item">
          <div className="stat-strip__num">{it.num}</div>
          <div className="stat-strip__lbl">{it.lbl}</div>
        </div>
      ))}
    </div>
  );
}

/* Section heading */
function SectionHead({ eyebrow, title, kicker, children, align = 'left', accent }) {
  return (
    <div className={'sec-head sec-head--' + align}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="sec-head__title">
        {title}
        {accent && <span className="sec-head__accent"> {accent}</span>}
      </h2>
      {kicker && <p className="sec-head__kicker">{kicker}</p>}
      {children}
    </div>
  );
}

/* Use-case card */
function UseCard({ tag, title, body, listing }) {
  return (
    <div className="use-card">
      <div className="bracket">{tag}</div>
      <div className="use-card__title">{title}</div>
      <p className="use-card__body">{body}</p>
      {listing && (
        <ul className="use-card__list">
          {listing.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
      )}
    </div>
  );
}

/* Compact mini-trace for hero (super-compressed version of TraceDemo) */
function MiniTrace() {
  const items = [
    { name: 'reasoning',    ms: 756, status: 'failure' },
    { name: 'authenticate', ms: 2,   status: 'success' },
    { name: 'reasoning',    ms: 563, status: 'success' },
    { name: 'fetch_email',  ms: 292, status: 'success' },
    { name: 'reasoning',    ms: 776, status: 'success' },
    { name: 'summarize',    ms: 763, status: 'success' },
    { name: 'generateReply',ms: 1062,status: 'success' },
    { name: 'sendReply',    ms: 524, status: 'success' },
  ];
  const [n, setN] = useS_(0);
  useE_(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur = (cur + 1) % (items.length + 4);
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
        {items.map((it, i) => (
          <div key={i} className={'mini-step ' + (i < n ? 'in ' : '') + 'mini-step--' + it.status}>
            <span className="mini-step__dot"></span>
            <span className="mini-step__name">{it.name}</span>
            <span className="mini-step__ms">{it.ms}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Footer, StatStrip, SectionHead, UseCard, MiniTrace });
