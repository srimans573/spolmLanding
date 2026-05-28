'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('spolm-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('spolm-theme', next);
    document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
  };

  return (
    <header className="nav">
      <a href="#" className="nav__brand">spolm</a>
      <nav className="nav__links">
        <span className="bracket nav__toggle" role="button" onClick={toggleTheme}>
          {theme}
        </span>
        <a className="nav__link" href="#features">Features</a>
        <a className="nav__link" href="#docs">Docs</a>
        <Link className="nav__link" href="/careers">Join Us</Link>
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
