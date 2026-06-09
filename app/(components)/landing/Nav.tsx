'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const onHome = pathname === '/';

  useEffect(() => {
    const saved = localStorage.getItem('spolm-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  return (
    <header className="nav">
      <Link href="/" className="nav__brand">spolm</Link>
      <nav className="nav__links">
        <a className="nav__link" href={onHome ? '#features' : '/#features'}>Features</a>
        <Link className="nav__link" href="/docs">Docs</Link>
        <a
          className="btn btn--accent btn--sm"
          href="https://cal.com/srirammanikandan/15min?user=srirammanikandan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a Demo
        </a>
      </nav>
    </header>
  );
}
