import type { Metadata } from "next";
import RevealOnScroll from "@/components/RevealOnScroll";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "关于 · 瓦帕迪力",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <RevealOnScroll>
        <h1 className="mb-2 font-sans text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          瓦帕迪力
        </h1>
        <p className="mb-8 font-sans text-lg text-ink-soft">
          风景园林本科，AI协同下的全栈实践者
        </p>
      </RevealOnScroll>

      <Section>
        <p className="mb-4">
          西南大学风景园林专业毕业（2022.09 - 2026.06），没上过培训班，靠一个个真实项目自学转进AI应用开发。
        </p>
        <p className="mb-4">
          这个网站里的每一个项目都在真实运行、或者真实运行过，都是长期维护出来的，没有一个是课程作业或者临时攒的简历demo。习惯是拿AI工具当协作伙伴：自己做技术判断和取舍决策，让AI处理具体实现，验证结果、决定下一步。
        </p>
        <p>
          平时也写内容——知乎账号积累了2000+关注，单篇文章拿到过5万赞，用来验证一些方向是否有真实需求，选题也影响了后面几个项目往哪个方向走。
        </p>
      </Section>

      <Section title="教育经历">
        <div className="rounded-lg border border-border p-4">
          <div className="font-sans text-sm font-semibold text-ink">
            西南大学
          </div>
          <div className="text-sm text-ink-soft">风景园林 · 本科</div>
          <div className="mt-1 font-mono text-xs text-ink-faint">
            2022.09 – 2026.06
          </div>
        </div>
      </Section>

      <Section title="联系方式">
        <a
          href="mailto:wapadlg@gmail.com"
          className="pressable mb-2 block font-mono text-accent underline decoration-accent/30 underline-offset-4"
        >
          wapadlg@gmail.com
        </a>
        <a
          href="https://github.com/yinren112"
          target="_blank"
          rel="noreferrer"
          className="pressable block font-mono text-ink-soft underline decoration-border-dark underline-offset-4"
        >
          github.com/yinren112
        </a>
      </Section>
    </div>
  );
}
