"use client";

import { useState } from "react";
import Navbar from "../(components)/header";

export default function Careers() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center px-6 md:px-16 py-16">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-4">
          Join Us
        </h1>
        <p className="font-sans text-sm text-dim max-w-md mb-12">
          Help us build the learning layer for AI agents.
        </p>

        {/* Position */}
        <div className="max-w-2xl">
          <button
            onClick={() => setOpen(!open)}
            className="w-full text-left"
          >
            <div className="flex items-center justify-between py-6 border-t border-border hover:border-foreground transition-colors">
              <div>
                <h2 className="font-sans text-lg font-medium text-foreground mb-1">
                  Full Stack Engineer
                </h2>
                <p className="font-sans text-xs text-muted">
                  Remote · Full-time
                </p>
              </div>
              <span className="font-sans text-xs text-muted">
                {open ? "−" : "+"}
              </span>
            </div>
          </button>

          {open && (
            <div className="pb-8 space-y-6">
              <div>
                <h3 className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  About the Role
                </h3>
                <p className="font-sans text-sm text-dim leading-relaxed">
                  We&apos;re looking for a Full Stack Engineer to help build the core
                  infrastructure behind Spolm&apos;s experiential learning platform.
                  You&apos;ll work across the entire stack—designing APIs, building
                  real-time data pipelines, and crafting intuitive interfaces for
                  AI engineering teams.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  Requirements
                </h3>
                <ul className="font-sans text-sm text-dim leading-relaxed space-y-2">
                  <li>• 3+ years of professional software engineering experience</li>
                  <li>• Strong proficiency in TypeScript, React, and Node.js</li>
                  <li>• Experience with databases (PostgreSQL, Redis) and cloud infrastructure (AWS/GCP)</li>
                  <li>• Familiarity with LLMs, vector databases, or AI/ML systems is a plus</li>
                  <li>• Ability to work autonomously in a fast-paced, early-stage environment</li>
                </ul>
              </div>

              <div>
                <h3 className="font-sans text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                  Nice to Have
                </h3>
                <ul className="font-sans text-sm text-dim leading-relaxed space-y-2">
                  <li>• Experience building developer tools or B2B SaaS products</li>
                  <li>• Background in observability, logging, or telemetry systems</li>
                  <li>• Contributions to open-source projects</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="font-sans text-sm text-dim">
                  Interested? Send your resume to{" "}
                  <a
                    href="mailto:srimans572@gmail.com"
                    className="text-foreground underline hover:text-coral transition-colors"
                  >
                    srimans572@gmail.com
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-border" />
        </div>
      </main>

      <footer className="px-6 md:px-10 py-4 flex items-center justify-between">
        <p className="font-sans text-[10px] text-muted">© 2026 Spolm</p>
        <p className="font-sans text-[10px] text-muted italic">
          agents that learn.
        </p>
      </footer>
    </div>
  );
}
