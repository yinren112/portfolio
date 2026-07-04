"use client";

import Link from "next/link";

export default function AiNativeTeaser() {
  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      href="/ai-native"
      onMouseMove={handleMouseMove}
      className="spotlight-card hover-lift pressable group mt-14 block rounded-xl border border-border-dark/50 bg-canvas p-7 sm:mt-16 sm:p-9"
    >
      <p className="mb-2 font-mono text-xs font-medium tracking-wide text-accent">
        差异化核心
      </p>
      <h2 className="mb-3 font-sans text-xl font-bold text-ink sm:text-2xl">
        从 GPT-3.5 到现在，一直在跟前沿AI工具打交道
      </h2>
      <p className="max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-base">
        2023年就开始把AI当日常工具用，从本地部署过 Stable Diffusion 到现在深度使用
        Codex / Claude Code / Gemini CLI / Antigravity
        这一整套编码Agent，还评测过腾讯的
        WorkBuddy。这套经验本身写成了一门40课的AI基础课程，上线在学习网站里。
      </p>
      <p className="mt-4 font-sans text-sm font-medium text-accent">
        查看完整时间线 →
      </p>
    </Link>
  );
}
