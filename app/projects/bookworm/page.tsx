import type { Metadata } from "next";
import Image from "next/image";
import CaseHeader from "@/components/CaseHeader";
import Section from "@/components/Section";
import LayerStack from "@/components/LayerStack";
import DecisionList from "@/components/DecisionList";
import DataTable from "@/components/DataTable";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "bookworm · 瓦帕迪力",
};

const SCREENSHOTS = [
  { src: "/images/bookworm/01-review-home.png", alt: "复习首页" },
  { src: "/images/bookworm/06-flashcard.png", alt: "闪卡交互" },
  { src: "/images/bookworm/07-quiz.png", alt: "测验答题" },
  { src: "/images/bookworm/10-leaderboard.png", alt: "排行榜" },
];

export default function BookwormPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <CaseHeader
        name="bookworm"
        tagline="微信小程序，一个人从0做到上线，10个月持续维护，带真实微信支付。"
        stats={["10 个月", "426 次提交", "34 个数据模型", "3 条 CI 流水线"]}
      />
      <p className="mb-8 -mt-2 font-sans text-xs text-ink-faint">
        仓库涉及真实用户数据和交易记录，为私有仓库。以下用截图和架构说明呈现。
      </p>

      <Section title="为什么做这个">
        <p className="mb-4">
          最早的想法很朴素：期末复习没有一个称手的工具，市面上的APP要么太重要么不聚焦。就先做了一个"教材交易"的小功能练手，后来发现真正有需求的是"怎么高效复习"这件事本身，于是把产品方向转向了闪卡、测验、知识速查这类学习工具。
        </p>
        <p>
          没有把之前做的推倒重来——教材交易模块还在代码里，只是不再是产品重心。这个决定是刻意的：已经写好、能跑的东西，没有必要因为方向调整就删掉。
        </p>
      </Section>

      <Section title="系统怎么跑">
        <LayerStack
          layers={[
            { title: "微信小程序（原生框架）", detail: "闪卡 · 测验 · 速查 · 排行榜 · 学习统计" },
            { title: "Nginx 反向代理" },
            {
              title: "Fastify + TypeScript 后端",
              detail: "路由 / 限流插件 / 跨域处理 / 结构化日志(Pino)",
            },
            {
              title: "PostgreSQL + Prisma ORM",
              detail: "34个数据模型 · 全文搜索(pg_trgm) · 并发锁(advisory lock)防超卖",
            },
            {
              title: "微信支付 v3 (Native模式)",
              detail: "主动查单 + Webhook防重放",
              variant: "accent",
            },
          ]}
        />
        <p className="mt-6">
          生产环境用 Docker 多阶段构建 + Docker Compose 部署，生产（
          <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-sm">
            api.lailinkeji.com
          </code>
          ）和体验版（
          <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-sm">
            api-staging.lailinkeji.com
          </code>
          ）域名分离，互不影响。
        </p>
      </Section>

      <Section title="关键技术决策">
        <DecisionList
          items={[
            {
              question: "为什么是 Fastify 不是 Express",
              answer:
                "Fastify 内置更好的插件化和请求数据校验（schema-based validation），性能也更好。对一个要长期维护、后续会不断加接口的项目，一开始把输入校验和插件边界立好，比后期到处补校验代码省事。",
            },
            {
              question: "为什么支付流程要做 Webhook 防重放",
              answer:
                "微信支付的通知可能会重复发送（网络重试、超时重试）。如果不做幂等处理，同一笔支付可能被当成两笔处理。做法是记录每个Webhook事件的唯一标识，处理过的直接跳过，配合主动查单兜底，保证\"一笔钱只对应一次业务处理\"。",
            },
            {
              question: "库存并发控制用数据库级锁，不是应用层加锁",
              answer:
                "教材交易模块最初的库存扣减逻辑，如果多个请求同时抢同一件商品，应用层的锁在多实例部署时会失效。改用数据库的advisory lock，在数据库层面保证同一时刻只有一个请求能修改同一条库存记录，天然支持多实例部署。",
            },
            {
              question: "先做性能画像，再决定优化哪里",
              answer:
                "扫描包体积后拿到的真实数字：复习分包里公式/富文本渲染用的KaTeX+mp-html约952KB，是这个分包里最大的一块，不是普通业务代码。已经上线的优化包括：lazyCodeLoading只加载必需组件、复习页单独分包、Wi-Fi环境下提前预下载、SWR缓存+请求去重重试、进入刷题/背卡前提前预取下一步数据。后面又加了真机性能埋点（页面耗时、渲染耗时），改完能不能验证有没有效，不用靠感觉猜。",
            },
          ]}
        />
      </Section>

      <Section title="演进痕迹（10个月，426次提交）">
        <p>
          这个项目没有中断过维护。提交历史里能看到清晰的演进路径：从最早的教材交易MVP，到闪卡/测验/速查模块逐步上线，中间穿插大量fix/perf/refactor类提交——这些都是根据真实使用反馈做的持续打磨，没有一次是推倒重来。最近一次提交是隐私政策合规增补，说明产品还在被真实维护和迭代。
        </p>
      </Section>

      <Section title="界面截图">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SCREENSHOTS.map((shot, i) => (
            <RevealOnScroll key={shot.src} delay={i * 60}>
              <div className="overflow-hidden rounded-lg border border-border">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={488}
                  height={1055}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-1.5 text-center font-mono text-[11px] text-ink-faint">
                {shot.alt}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Section title="数据说话">
        <DataTable
          rows={[
            ["持续维护时长", "10 个月（2025.09 - 2026.06）"],
            ["提交次数", "426 次"],
            ["数据模型数", "34 个（Prisma schema）"],
            ["CI 流水线", "3 条（lint扫描 / 契约测试 / 安全审计）"],
            ["集成测试", "Vitest + Testcontainers（真实数据库环境测试）"],
            ["代码规模", "前端约 2.7万行，后端约 4万行"],
          ]}
        />
      </Section>

      <Section title="技术栈一览">
        <div className="flex flex-wrap gap-2">
          {[
            "微信小程序原生",
            "Fastify",
            "TypeScript",
            "PostgreSQL",
            "Prisma",
            "微信支付v3",
            "Docker",
            "Nginx",
            "Prometheus",
            "Vitest",
            "Testcontainers",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </div>
  );
}
