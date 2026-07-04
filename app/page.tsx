import Link from "next/link";
import TerminalHero from "@/components/TerminalHero";
import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <RevealOnScroll>
        <TerminalHero />
      </RevealOnScroll>

      <RevealOnScroll delay={80}>
        <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          不是科班全栈，是把一个个真实需求做到上线、还在维护的人。这个网站放的每一个项目都在跑或者跑过真实数据——不是课程作业，不是教程demo。每个案例页写的不是"用了什么技术"，是"当时为什么这么选、踩过什么坑、后来怎么改的"。
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.slug} delay={i * 60}>
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={100}>
        <Link
          href="/ai-native"
          className="hover-lift pressable group mt-14 block rounded-xl border border-border-dark/50 bg-canvas p-7 sm:mt-16 sm:p-9"
        >
          <p className="mb-2 font-mono text-xs font-medium tracking-wide text-accent">
            差异化核心
          </p>
          <h2 className="mb-3 font-sans text-xl font-bold text-ink sm:text-2xl">
            从 GPT-3.5 到现在——一直在跟前沿AI工具打交道
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
      </RevealOnScroll>
    </div>
  );
}
