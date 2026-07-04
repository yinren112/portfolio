"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

type Line =
  | { kind: "command"; text: string }
  | { kind: "output"; text: string }
  | { kind: "projects" };

const LINES: Line[] = [
  { kind: "command", text: "whoami" },
  { kind: "output", text: "瓦帕迪力：把想法做成能用的东西" },
  { kind: "command", text: "cat status" },
  {
    kind: "output",
    text: "风景园林本科毕业，自学转 AI 应用开发。\n没上过培训班，作品都在下面，代码可以点开看。",
  },
  { kind: "command", text: "ls ./projects" },
  { kind: "projects" },
  { kind: "command", text: "echo $CONTACT" },
  { kind: "output", text: "wapadlg@gmail.com" },
];

const TYPE_SPEED_MS = 28;

export default function TerminalHero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [done, setDone] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion.current) {
      setLineIndex(LINES.length);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    if (reducedMotion.current || done) return;
    if (lineIndex >= LINES.length) {
      setDone(true);
      return;
    }

    const current = LINES[lineIndex];

    if (current.kind !== "command") {
      const t = setTimeout(() => setLineIndex((i) => i + 1), 260);
      return () => clearTimeout(t);
    }

    if (typedChars < current.text.length) {
      const t = setTimeout(
        () => setTypedChars((c) => c + 1),
        TYPE_SPEED_MS,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setTypedChars(0);
    }, 320);
    return () => clearTimeout(t);
  }, [lineIndex, typedChars, done]);

  const visibleLines = done ? LINES : LINES.slice(0, lineIndex);
  const typingLine =
    !done && lineIndex < LINES.length && LINES[lineIndex].kind === "command"
      ? (LINES[lineIndex] as { kind: "command"; text: string })
      : null;

  return (
    <div className="hero-glow overflow-hidden rounded-xl border border-border-dark/60 bg-terminal shadow-[0_20px_50px_-12px_rgba(20,20,19,0.35)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>
      <div className="min-h-[280px] px-5 py-5 font-mono text-[13px] leading-relaxed text-terminal-text sm:text-sm">
        {visibleLines.map((line, i) => (
          <TerminalLineView key={i} line={line} />
        ))}
        {typingLine && (
          <div>
            <span className="text-terminal-accent">$ </span>
            {typingLine.text.slice(0, typedChars)}
            <span className="cursor-blink text-terminal-accent">▊</span>
          </div>
        )}
        {done && (
          <div>
            <span className="text-terminal-accent">$ </span>
            <span className="cursor-blink text-terminal-accent">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalLineView({ line }: { line: Line }) {
  if (line.kind === "command") {
    return (
      <div>
        <span className="text-terminal-accent">$ </span>
        {line.text}
      </div>
    );
  }
  if (line.kind === "output") {
    return (
      <div className="mb-3 whitespace-pre-line text-terminal-text/80">
        {line.text}
      </div>
    );
  }
  return (
    <div className="mb-3 flex flex-wrap gap-x-6 gap-y-1">
      {projects.map((p) => (
        <Link
          key={p.slug}
          href={p.href}
          className="pressable text-terminal-accent underline decoration-terminal-accent/30 underline-offset-4 transition-colors hover:text-white"
        >
          {p.slug}/
        </Link>
      ))}
    </div>
  );
}
