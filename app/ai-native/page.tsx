import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "AI 工具栈 · 瓦帕迪力",
};

const TIMELINE = [
  {
    time: "2023",
    title: "GPT-3.5",
    body: "开始把AI当日常工具用，写代码、查资料、做决策讨论。",
  },
  {
    time: "2023 下半年",
    title: "本地部署 Stable Diffusion",
    body: "搭建过本地的AI生图工作流，下载模型、跑ComfyUI/WebUI这类工具链，了解本地推理需要处理的显存、模型管理这些实际问题。后来生图/视频这类工作逐渐转向云端模型（Nano Banana、GPT Image系列这些云端能力已经足够强，本地工作流除非有特殊需求，否则性价比不高）。",
  },
  {
    time: "2024-2025",
    title: "GPT-4 / Claude 日常化",
    body: "AI从\"辅助查资料\"变成\"协作写代码\"的核心工具，开始用它处理更复杂的多步骤任务。",
  },
  {
    time: "2025-2026",
    title: "编码 Agent 全家桶深度使用",
    body: "Codex（用得最多）、Claude Code（CLI + 桌面端）、Gemini CLI、以及最新的Antigravity平台，这几款编码Agent都在实际项目里深度用过，装一个试用跟真刀真枪用是两回事。不同工具在不同任务上的强弱、容易在哪里犯错，都是自己踩坑摸出来的经验，光看文档学不到。",
  },
  {
    time: "2026",
    title: "评测腾讯 WorkBuddy",
    body: "拿到腾讯新出的编码Agent工具WorkBuddy，设计了一套评分标准，给它布置本地任务、观察执行过程、按严格标准打分——不只是\"能不能用\"，还包括模型在长任务里会不会在细节上出问题（比如状态管理、任务持久性这类容易被忽略的地方）。",
  },
];

const COURSE_TOPICS = [
  "RLVR与测试时算力",
  "参差不齐的智能(Jagged Intelligence)",
  "上下文工程",
  "Agent运行循环",
  "Multi-agent协作",
  "苦涩的教训",
  "Scaling Laws与MoE",
  "AI三大流派",
];

export default function AiNativePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <RevealOnScroll>
        <h1 className="mb-3 font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          我怎么跟AI一起做事
        </h1>
        <p className="max-w-2xl font-sans text-lg leading-relaxed text-ink-soft">
          用AI已经三年多了，不是最近赶热度才开始。这条时间线是真实的工具使用历史，没有包装成分。
        </p>
      </RevealOnScroll>

      <div className="mt-14 sm:mt-16">
        <Timeline nodes={TIMELINE} />
      </div>

      <Section title="我对AI的理解，写成了一门课">
        <p className="mb-4">
          比起说"我很懂AI"，更实在的证明方式是：把这些理解写成了一门40课、96道题的课程，上线在{" "}
          <a
            href="https://lailinkeji.com/learn/"
            target="_blank"
            rel="noreferrer"
            className="pressable text-accent underline decoration-accent/40 underline-offset-4"
          >
            lailinkeji.com/learn/
          </a>
          ，任何人都可以去看、去学、去挑错。
        </p>
        <p className="mb-4">
          课程覆盖的话题从最基础的Token、Prompt，一路讲到当前AI圈还在争论的前沿话题：
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {COURSE_TOPICS.map((t) => (
            <Tag key={t} accent>
              {t}
            </Tag>
          ))}
        </div>
        <p>
          这些选题是长期实际使用各类AI工具、观察它们在真实任务里的能力边界之后自己梳理出来的，不是照搬现成的科普文章框架。
        </p>
      </Section>

      <Section title="我怎么跟AI协作">
        <p className="mb-4">这套方法论贯穿在这个网站展示的每一个项目里：</p>
        <div className="space-y-4">
          <div>
            <h3 className="mb-1 font-sans text-sm font-semibold text-ink">
              我做决策，AI做实现
            </h3>
            <p className="text-sm leading-relaxed">
              要不要用某个技术方案、这个设计有没有问题、结果对不对——这些判断我自己拿主意。具体怎么写代码、怎么查一个陌生的API用法，交给AI去做，我负责验证结果。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-sans text-sm font-semibold text-ink">
              先小范围验证，再整体交付
            </h3>
            <p className="text-sm leading-relaxed">
              先让一个小功能真正跑通，再逐步扩展——出问题的范围永远可控。
            </p>
          </div>
          <div>
            <h3 className="mb-1 font-sans text-sm font-semibold text-ink">
              AI说的话不能直接信
            </h3>
            <p className="text-sm leading-relaxed">
              用得越久，越清楚AI在哪些场景容易"看着对但细节全错"——尤其是需要精确事实、精确数字的地方，交付前自己一定要核实一遍。
            </p>
          </div>
        </div>
      </Section>

      <Section title="技术工具一览">
        <div className="space-y-3">
          <div>
            <span className="mr-2 font-sans text-xs font-semibold text-ink-faint">
              编码 Agent
            </span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {["Codex", "Claude Code (CLI/桌面端)", "Gemini CLI", "Antigravity"].map(
                (t) => (
                  <Tag key={t}>{t}</Tag>
                ),
              )}
            </div>
          </div>
          <div>
            <span className="mr-2 font-sans text-xs font-semibold text-ink-faint">
              评测过的产品
            </span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <Tag>腾讯 WorkBuddy</Tag>
            </div>
          </div>
          <div>
            <span className="mr-2 font-sans text-xs font-semibold text-ink-faint">
              早期探索
            </span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <Tag>Stable Diffusion 本地部署（ComfyUI/WebUI）</Tag>
            </div>
          </div>
          <div>
            <span className="mr-2 font-sans text-xs font-semibold text-ink-faint">
              AI能力集成
            </span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <Tag>DeepSeek API（learn项目AI批改）</Tag>
              <Tag>多模态图像分析（闲鱼监控项目）</Tag>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
