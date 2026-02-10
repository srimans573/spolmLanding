"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-16 md:py-4">
      {/* Brand */}
      <span className="font-serif text-lg tracking-tight">
        <span
          style={{
            borderBottom: "4px solid var(--coral)",
            paddingBottom: "4px",
            fontWeight: "bold",
          }}
        >
          spolm
        </span>
      </span>

      {/* Right side */}
      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={() => setLight(!light)}
          className="font-sans text-xs text-muted hover:text-foreground transition-colors bracket-link"
          aria-label="Toggle theme"
        >
          {light ? "Dark" : "Light"}
        </button>
        <a
          href="/careers"
          className="font-sans text-xs text-foreground hover:text-dim transition-colors"
        >
          Join Us
        </a>
        <a
          href="#"
          className="font-sans text-xs text-foreground hover:text-dim transition-colors"
        >
          Book a Demo
        </a>
      </div>
    </nav>
  );
}
