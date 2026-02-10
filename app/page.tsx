"use client";

import { useState } from "react";
import Navbar from "./(components)/header";

const definitions: Record<number, { term: string; def: string }> = {
  1: { term: "AI agents", def: "Software systems that use LLMs to autonomously perform multi-step tasks." },
  2: { term: "Multi-step workflows", def: "Sequences of tool calls, API requests, and reasoning steps chained to accomplish a goal." },
  3: { term: "Unproductive loops", def: "Cyclic patterns where an agent retries the same failing strategy without adaptation." },
  4: { term: "Experiential learning layer", def: "A retrieval-augmented memory system that stores and ranks past agent decisions by outcome." },
  5: { term: "Production telemetry", def: "Structured logs capturing every tool call, LLM response, and decision point." },
  6: { term: "Historical interactions", def: "Similar past sessions matched via semantic search over the decision pattern knowledge base." },
};

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null);

  const Fn = ({ n }: { n: number }) => (
    <span
      className="fn"
      onMouseEnter={() => setHovered(n)}
      onMouseLeave={() => setHovered(null)}
    >
      [{n}]
    </span>
  );

  return (
    <div className="min-h-screen md:h-screen flex flex-col bg-background text-foreground overflow-auto md:overflow-hidden relative">
      {/* Vertical side lines */}
      <div className="hidden md:block absolute left-3 lg:left-5 top-0 bottom-0 w-px bg-foreground/[0.06]" />
      <div className="hidden md:block absolute right-3 lg:right-5 top-0 bottom-0 w-px bg-foreground/[0.06]" />

      {/* Horizontal lines */}
      <div className="hidden md:block absolute left-0 right-0 top-[60px] h-px bg-foreground/[0.06]" />
      <div className="hidden md:block absolute left-0 right-0 bottom-[36px] h-px bg-foreground/[0.06]" />

      {/* Intersection squares — centered on each intersection */}
      {/* Top-left */}
      <div className="hidden md:block absolute left-3 lg:left-5 top-[60px] w-3 h-3 -translate-x-1/2 -translate-y-1/2 border border-foreground/[0.12] bg-background" />
      {/* Top-right */}
      <div className="hidden md:block absolute right-3 lg:right-5 top-[60px] w-3 h-3 translate-x-1/2 -translate-y-1/2 border border-foreground/[0.12] bg-background" />
      {/* Bottom-left */}
      <div className="hidden md:block absolute left-3 lg:left-5 bottom-[36px] w-3 h-3 -translate-x-1/2 translate-y-1/2 border border-foreground/[0.12] bg-background" />
      {/* Bottom-right */}
      <div className="hidden md:block absolute right-3 lg:right-5 bottom-[36px] w-3 h-3 translate-x-1/2 translate-y-1/2 border border-foreground/[0.12] bg-background" />

      <Navbar />

      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left: Hero */}
        <section className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:pl-16 md:pr-12 md:py-0">
          <p className="my-3">[ in private beta ]</p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight mb-6 md:mb-8">
            Experential Learning for
            <br />
            <span className="text-coral">AI Agents</span>
          </h1>

          <p className="font-sans text-sm leading-relaxed max-w-md mb-8 md:mb-10">
            Spolm turns production telemetry into long-term memory for AI
            agents. Stop repeating mistakes. Start improving with every
            interaction.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="font-sans text-xs text-background bg-foreground px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Book a Demo →
            </a>
          </div>
        </section>

        {/* Right: Scientific notation */}
        <section className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:px-12 md:py-0 xl:px-16">
          <div className="max-w-lg">
            <div className="font-sans text-[12px] md:text-[18px] leading-[1.8] md:leading-[1.9] text-dim space-y-4 md:space-y-5">
              <p>
                Modern AI agents
                <Fn n={1} />{" "}
                deployed in production exhibit a critical failure mode: they
                repeat identical mistakes across sessions. In multi-step
                workflows
                <Fn n={2} />
                , agents frequently select incorrect tools, misinterpret
                context, and enter unproductive loops
                <Fn n={3} />
                .
              </p>

              <p>
                We propose an experiential learning layer
                <Fn n={4} />{" "}
                that analyzes production telemetry
                <Fn n={5} />{" "}
                to extract decision patterns—both successful and failed—stored
                in a knowledge base ranked by accuracy. Before execution,
                agents retrieve historical interactions
                <Fn n={6} />{" "}
                as context, adapting strategy pre-emptively.
              </p>
            </div>

            {/* Definition area */}
            <div className="mt-4 md:mt-6 min-h-[48px]">
              {hovered && definitions[hovered] && (
                <p className="font-sans text-[10px] md:text-[11px] leading-relaxed">
                  <span className="text-dim">[{hovered}]</span>{" "}
                  <span className="font-semibold">{definitions[hovered].term}</span>{" "}
                  — {definitions[hovered].def}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-4 flex items-center justify-center">
        <p className="font-sans text-[10px] text-muted">
          © 2026 Spolm
        </p>
      </footer>
    </div>
  );
}
