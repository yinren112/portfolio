import type { Metadata } from "next";
import CaseHeader from "@/components/CaseHeader";
import Section from "@/components/Section";
import Pipeline from "@/components/Pipeline";
import Callout from "@/components/Callout";
import DecisionList from "@/components/DecisionList";
import DataTable from "@/components/DataTable";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "open-boss · 瓦帕迪力",
};

export default function OpenBossPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <CaseHeader
        name="open-boss"
        tagline="Agent 原生设计的招聘信息处理系统——感知、推理、行动、观察闭环，人工确认再投递。"
        stats={[
          "Agent 原生设计",
          "983 岗位处理量",
          "单日 1187→739 去重",
          "回复率 75%",
          "60-90 分钟/天",
        ]}
        link={{ label: "查看源码：github.com/yinren112/open-boss", href: "https://github.com/yinren112/open-boss" }}
      />

      <Section title="为什么做这个">
        <p className="mb-4">
          每天花两个多小时在 BOSS
          直聘上滚岗位列表、点开看JD、判断靠不靠谱、复制粘贴到AI帮忙看——这事我干了快两周之后觉得不对劲：流程是机械的，判断标准是固定的，这应该让程序来做。
        </p>
        <p className="mb-4">
          但市面上的自动投递工具有一个问题——它们替你按"立即沟通"按钮，一旦误触了不该投的公司（培训贷、挂羊头卖狗肉的销售岗），你连撤回的机会都没有。
        </p>
        <p>
          所以我没做"自动投递"，做的是把"抓取→筛选→人工确认"这条流水线搭起来——
          <strong className="text-ink">最终决定投不投的权限，始终留在人手里</strong>。
        </p>
      </Section>

      <Section title="系统怎么跑">
        <Pipeline
          stages={[
            { title: "岗位抓取", mode: "自动", detail: "三账号并行，CDP连接已登录的真实Chrome窗口" },
            { title: "规则初筛", mode: "自动", detail: "通勤距离/班制/薪资下限过滤" },
            { title: "AI 精筛 + 日报", mode: "半自动", detail: "LLM 判断岗位与自身经历的匹配度，生成结构化日报" },
            { title: "人工审核 → 投递", mode: "人工", detail: "逐条确认后才点\"沟通\"" },
          ]}
        />
        <p className="mt-6">
          <strong className="text-ink">配套的 JD 收集器插件</strong>
          <br />
          单独写了一个 Chrome
          扩展（boss-jd-grabber），在BOSS直聘列表页自动遍历岗位卡片、读取JD、清洗成结构化数据导出。遍历时模拟真人节奏做请求节流，数据全存在本地IndexedDB，不上传到任何第三方服务。
        </p>
      </Section>

      <Section>
        <Callout title="这是一个 Agent 原生设计的系统">
          <p className="mb-3">
            "写了个脚本、顺便调了下AI接口"不足以描述这套系统——它从一开始就是按Agent的方式设计的：
            <strong className="text-ink">感知</strong>
            （抓取岗位数据）→<strong className="text-ink">推理</strong>
            （规则先筛一轮，LLM再判断岗位和自身经历的匹配度）→
            <strong className="text-ink">行动</strong>
            （生成结构化日报、给出投递建议）→<strong className="text-ink">观察</strong>
            （结果反馈进下一轮的去重库和公司黑名单，让判断越来越准）。
          </p>
          <p>
            唯一刻意收窄的是"行动"这一步的自主权限——最终点"沟通"按钮的权限始终留在人手里，不让Agent自主完成投递。这是一个
            <strong className="text-ink">主动的Agent设计选择</strong>
            ：任务的风险和后果（投错公司、骚扰HR）不对称地高，所以人机协同的边界划在"决策"和"执行"之间，而不是划在"要不要用AI"这个层面。
          </p>
        </Callout>
      </Section>

      <Section title="关键技术决策">
        <DecisionList
          items={[
            {
              question: "为什么手写 CDP 客户端，不用 Playwright/Selenium",
              answer:
                "Playwright 和 Selenium 会启动自己管控的浏览器实例。我的需求是连接到已经登录好的、带完整Cookie和登录态的真实Chrome窗口——三个账号分别跑在三个Chrome profile里，每个窗口开不同的调试端口，程序通过WebSocket连上去操作。这个场景用现成框架反而不方便，手写CDP客户端代码量多了一些，但每个操作都能精确控制，不依赖第三方封装。",
            },
            {
              question: "文件即数据库",
              answer:
                "没用MySQL/MongoDB/SQLite，所有数据（岗位、去重记录、日报）都是JSONL和JSON文件。数据量小（每天几百条级别，不是百万级），文件直接用文本编辑器就能看，出问题直接grep定位，不需要连数据库才能排查。对这个体量的工具来说，文件系统就是最好的数据库。",
            },
            {
              question: "三层去重",
              answer:
                "同一个岗位可能出现在三个账号的推荐流里，也可能今天推过明天换个标题再推。去重逻辑走三层：加密岗位ID→公司名+岗位名组合→JD文本相似度。实测三账号并行155条推荐，去重后141条唯一，重复率只有9%。",
            },
            {
              question: "为什么\"AI精筛\"是一份Prompt模板，不是写死的API调用",
              answer:
                "岗位终筛没有接LLM API，而是把判断规则写成prompts/02_final_filter_and_draft.md，每天用当时在开的编码Agent照着跑：6类硬性剔除词（培训贷/刷单、产线伪装、外貌门槛、保险增员、隐藏销售、跑不赢保底线），过审的岗位逐条写45-120字定制开场白。Agent的输出不是照单全收——validate_approved.js会机械校验：judge.evidence必须是JD原文里能查到的原句，不是编出来的；开场白长度卡在35-140字；同一岗位ID不能重复；同一家公司一批最多批准2个。判断交给Agent，兜底交给代码。",
            },
          ]}
        />
      </Section>

      <Section title="踩坑：误投事故和三道安全闸门">
        <p className="mb-4">
          2026年6月4日，自动流程把一条不该投的岗位发了出去。事后排查发现是跨批次数据没做完整去重，导致前一天已经标记为"跳过"的公司在第二天重新出现并被投递。
        </p>
        <p className="mb-2">当天加了三道硬闸门：</p>
        <ol className="mb-4 list-decimal space-y-2 pl-5">
          <li>
            <strong className="text-ink">跨批次去重</strong>
            ——不只在当天去重，历史所有批次处理过的岗位ID全局排除
          </li>
          <li>
            <strong className="text-ink">公司风险名单</strong>
            ——手动维护一份公司黑名单，在名单里的直接跳过不进入AI筛选
          </li>
          <li>
            <strong className="text-ink">单公司每日限投</strong>
            ——同一家公司一天最多投递1条，就算它同时挂了5个岗位
          </li>
        </ol>
        <p>这三道闸门之后再没出过误投。</p>
      </Section>

      <Section title="数据说话">
        <DataTable
          rows={[
            ["JD 库存总量", "497 个从未推荐/联系过的岗位"],
            ["单日去重漏斗", "原始 1187 → 去重后 739 全新"],
            ["三账号推荐重复率", "9%（155条 → 141唯一）"],
            ["处理速度", "每账号约 4 条/分钟"],
            ["完整日常流程耗时", "60-90 分钟（从 2 小时+ 压缩）"],
            ["投递线回复率", "AI 标注线 75%，综合线 73%"],
          ]}
        />
      </Section>

      <Section title="项目讲解短片">
        <p>
          配套有一段项目讲解视频（Remotion 代码驱动剪辑），讲清楚pipeline三步走逻辑和核心数据。
        </p>
      </Section>

      <Section title="技术栈一览">
        <div className="flex flex-wrap gap-2">
          {[
            "Node.js",
            "Chrome DevTools Protocol (ws)",
            "JSONL",
            "LLM Prompt 模板",
            "Chrome 扩展 (Manifest V3)",
            "Remotion (React)",
            "IndexedDB",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </div>
  );
}
