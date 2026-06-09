import Link from 'next/link';
import Nav from '../(components)/landing/Nav';
import Footer from '../(components)/landing/Footer';

export default function Docs() {
  return (
    <div className="landing">
      <Nav />
      <div style={{ padding: '120px 80px', minHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span className="bracket">documentation</span>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '32px', margin: 0 }}>Coming soon.</p>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', margin: 0 }}>
          In the meantime, check the <a href="https://github.com/tryspolm" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', textDecoration: 'underline' }}>GitHub</a> or <Link href="/" style={{ color: 'var(--text)', textDecoration: 'underline' }}>go back home</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
}
