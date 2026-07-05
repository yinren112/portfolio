import TerminalHero from "@/components/TerminalHero";
import ProjectCard from "@/components/ProjectCard";
import AiNativeTeaser from "@/components/AiNativeTeaser";
import RevealOnScroll from "@/components/RevealOnScroll";
import { projects } from "@/lib/projects";

const BENTO_SPAN: Record<number, string> = {
  0: "lg:col-span-2",
  3: "lg:col-span-2",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <RevealOnScroll>
        <TerminalHero />
      </RevealOnScroll>

      <RevealOnScroll delay={60}>
        <p className="mx-auto mt-8 text-center font-sans text-sm font-semibold tracking-wide text-accent sm:text-base">
          求职方向：AI应用工程师 / AI产品工程师（远程）
        </p>
        <p className="mx-auto mt-1.5 text-center font-mono text-xs text-ink-faint">
          重庆 · 接受全职远程 · 可立即到岗
        </p>
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          没读过科班全栈，靠一个个真实需求做到上线、并且还在维护。这个网站放的项目都在真实跑数据、或者真实跑过——没有课程作业，也没有教程demo。每个案例页记录的重点是当时为什么这么选、踩过什么坑、后来怎么改的，不只是罗列用了什么技术。
        </p>
      </RevealOnScroll>

      <div className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealOnScroll
            key={project.slug}
            delay={i * 60}
            className={BENTO_SPAN[i] ?? ""}
          >
            <ProjectCard project={project} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll delay={100}>
        <AiNativeTeaser />
      </RevealOnScroll>
    </div>
  );
}
