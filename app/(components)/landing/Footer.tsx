import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row">
        <span className="wm" style={{ fontSize: 24 }}>spolm</span>
        <span className="footer__tag">The learning layer for AI agents</span>
      </div>
      <div className="footer__row footer__row--meta">
        <div className="footer__links">
          <a href="#docs">Docs</a>
          <a href="#api">API</a>
          <a href="#changelog">Changelog</a>
          <Link href="/careers">Careers</Link>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__copy">© 2026 Spolm</div>
      </div>
    </footer>
  );
}
