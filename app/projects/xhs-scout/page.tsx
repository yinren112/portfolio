import type { Metadata } from "next";
import CaseHeader from "@/components/CaseHeader";
import Section from "@/components/Section";
import LayerStack from "@/components/LayerStack";
import Callout from "@/components/Callout";
import DecisionList from "@/components/DecisionList";
import DataTable from "@/components/DataTable";
import { Tag } from "@/components/Tag";
import PromoVideo from "@/components/PromoVideo";

export const metadata: Metadata = {
  title: "xhs-rental-scout · 瓦帕迪力",
};

export default function XhsScoutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <CaseHeader
        name="xhs-rental-scout"
        tagline="Agent 原生设计的房源筛选系统，靠持续观察和证据累积识别中介和虚假房源，最后租到了房子。"
        stats={[
          "Agent 原生设计",
          "29 轮检索",
          "211 个账号画像库",
          "115 个职业号拉黑",
          "零运行时依赖",
        ]}
        link={{
          label: "查看源码：github.com/yinren112/xhs-rental-scout",
          href: "https://github.com/yinren112/xhs-rental-scout",
        }}
      />

      <Section>
        <PromoVideo src="/videos/xhs-scout-promo.mp4" poster="/videos/posters/xhs-scout-poster.jpg" />
      </Section>

      <Section title="为什么做这个">
        <p>
          在小红书上搜房源，翻十条有八条是中介发的、伪装成个人房东的帖子。人工判断"这是不是中介"要看很多细节：账号昵称有没有"经纪""置业"这类词、发帖是不是跨小区（正常个人房东只会发自己那一套房子）、评论区有没有明显的导流话术。这些判断逻辑是可以写成规则的，没必要每次都靠肉眼一条条看。
        </p>
      </Section>

      <Section title="系统怎么跑">
        <LayerStack
          layers={[
            { title: "xhs 命令行工具", detail: "外部子进程，负责搜索/读取小红书数据" },
            {
              title: "pipeline.py",
              detail: "编排：init/search/read/profile/comments/report",
            },
            {
              title: "rules.py（纯函数规则引擎）",
              detail: "账号风险打分 · 价格提取(含中文数字/暗语) · 黑白名单判定",
              variant: "accent",
            },
            { title: "本地文件", detail: "黑白名单库/去重记录/最终报告" },
          ]}
        />
        <p className="mt-6">
          本项目不直接对接小红书的登录/验证码/风控——那部分交给独立的外部命令行工具做子进程调用，自己只负责编排、清洗和判断，职责边界很清楚。
        </p>
      </Section>

      <Section>
        <Callout title="这也是一个 Agent 原生设计的系统">
          <p className="mb-3">
            跟open-boss的相似之处：两边的"推理"都不是写死的API调用，而是编码Agent照一份可版本管理的判断手册去做判断——这里对应
            <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-sm">docs/screening-guide.md</code>
            。不同的是分工边界：能写成确定性规则的部分（去重、硬性剔除词匹配、价格提取含中文数字和暗语、翻页是否继续）留给
            <code className="rounded bg-canvas px-1.5 py-0.5 font-mono text-sm">rules.py</code>
            ，跑得快也好测试；剩下"这个账号到底是不是中介"这类要看主页结构、跨帖对比、评论综合判断的部分，才交给Agent逐条判断。架构上走的是同一套
            <strong className="text-ink">
              感知（读取搜索结果）→推理（规则打分+跨轮次证据累积）→行动（拉黑/纳入候选）→观察（下一轮出现新证据时重新评估）
            </strong>
            的Agent循环。
          </p>
          <p>
            最能体现这一点的是账号库的设计：一个账号第一轮判断不出来是不是中介，第二轮如果在别的小区又发了一套"自己的房子"，新证据出现，判断会自动升级。判断手册里还有一条具体规则：证据等级（A/B/C）和动作建议（优先核价/可约看/淘汰……）必须分开打分，不能用一个字段代替另一个——房源本身靠谱，不等于现在就值得联系。这套
            <strong className="text-ink">感知-推理-行动-观察</strong>
            的闭环设计才是Agent的核心特征，能不能写成确定性规则只是分工问题。
          </p>
        </Callout>
      </Section>

      <Section title="关键技术决策">
        <DecisionList
          items={[
            {
              question: "为什么把\"抓数据\"和\"判断数据\"分成两个独立的部分",
              answer:
                "抓数据这部分需要处理登录态、请求节奏这类跟平台强绑定的东西，容易变、也容易踩到平台的使用边界。把这部分完全隔离成一个外部工具去调用，自己的代码只处理\"拿到数据之后怎么判断\"，好处是抓取方式变了，判断逻辑完全不用动，两边可以独立迭代。",
            },
            {
              question: "价格提取为什么要处理中文数字和暗语",
              answer:
                "房源帖子里价格的写法五花八门：\"2600\"、\"两千六\"、\"26张\"都是同一个意思，还有押金、中介费这类容易和月租混淆的数字。写了正则加上下文窗口判断，能覆盖真实场景里的大部分写法，不是只认标准数字格式。",
            },
            {
              question: "为什么账号黑白名单要持续追踪而不是一次性判断",
              answer:
                "同一个中介账号会反复出现在不同轮次的搜索结果里。第一次看到判断不出来的账号，可能在后续几轮里露出更多线索。把账号库持久化、跨轮次累积证据，比每次搜索都从零判断准确得多。",
            },
          ]}
        />
      </Section>

      <Section title="数据说话">
        <DataTable
          rows={[
            ["检索轮次", "29轮（R1-R29，每轮一份结构化报告）"],
            ["账号画像库", "211个账号，115个识别为职业号拉黑，73个白名单"],
            ["人工核查图片", "1020张房源实拍图"],
            ["最终结果", "靠它筛出真实房东候选，租到了房子"],
          ]}
        />
      </Section>

      <Section title="工程质量">
        <p>
          有4个测试文件覆盖价格解析、payload分类、黑名单拦截、配置边界校验这些核心逻辑，配了ruff和mypy静态检查。README里明确列出了哪些数据可以提交、哪些涉及隐私必须留在本地——写这份工具的时候就把"不能把别人的隐私数据传上GitHub"这条边界定清楚了。
        </p>
      </Section>

      <Section title="技术栈一览">
        <div className="flex flex-wrap gap-2">
          {["Python", "正则表达式", "子进程调用", "ruff", "mypy", "pytest"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </div>
  );
}
