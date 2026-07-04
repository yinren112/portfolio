import type { Metadata } from "next";
import CaseHeader from "@/components/CaseHeader";
import Section from "@/components/Section";
import LayerStack from "@/components/LayerStack";
import DecisionList from "@/components/DecisionList";
import DataTable from "@/components/DataTable";
import { Tag } from "@/components/Tag";

export const metadata: Metadata = {
  title: "learn · 瓦帕迪力",
};

const TRANSFORM_CHECKLIST = [
  "原私人应用完全不动，所有改造只在新目录进行，互不影响",
  "新版本不能包含私人密钥、个人学习进度、私人课程内容、原有Git历史",
  "公开版必须换一套全新的API密钥，不能复用私人版的",
  "登录方式从\"无验证\"改成\"8位随机学习码\"——不收集手机号、邮箱、密码",
  "保留核心学习体验（四级掌握、间隔复习、连接题、AI批改、断线续学）",
  "首版明确不做：管理后台、排行榜、微信登录、课程上传——这些等真实使用数据证明需要时再加",
];

const COURSE_TOPICS = [
  "Token与上下文窗口",
  "Temperature",
  "Prompt工程",
  "RAG五步流程",
  "Fine-tuning vs RAG",
  "MCP三大角色",
  "Agent运行循环(感知-推理-行动-观察)",
  "Multi-agent协作",
  "Workflow vs Agent",
  "数据标注与RLHF",
  "RLVR与测试时算力",
  "参差不齐的智能(Jagged Intelligence)",
  "上下文工程",
  "Scaling Laws与MoE",
];

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <CaseHeader
        name="learn"
        tagline="从一个人的私人学习工具，到所有人能用的公开网站。"
        stats={["40 课 96 题", "线上运行中", "AI 实时批改", "私人工具→公开产品"]}
        link={{
          label: "在线体验：lailinkeji.com/learn/（真实功能，非截图）",
          href: "https://lailinkeji.com/learn/",
        }}
      />

      <Section title="起点：一个只有一个人用的工具">
        <p className="mb-4">
          最开始做的是一个纯粹私人的命令行学习工具，压根没打算做成网站——给身边的人准备大模型和Agent方向的面试复习用的。这个工具本身就不简单：11个模块、44个知识点、108道练习题，有一套自己设计的间隔重复算法（答对后按1/3/7/14/30天逐步拉开复习间隔，答错就退一级），还有"连接题"专门考察知识能不能在不同场景之间迁移，考的是理解，不是死记硬背。
        </p>
        <p className="mb-4">
          程序断网也能用——在线时用DeepSeek批改开放式回答，请求失败会自动降级成规则自评，不会让学习过程中断。整个工具打包成一个双击就能跑的exe，字体、图标、课程数据全部内置。
        </p>
        <p>这个工具因为内嵌了API密钥，只能私人使用，不能公开。</p>
      </Section>

      <Section title="决策：这个东西值得让更多人用">
        <p className="mb-5">
          工具做出来、真的用出效果之后，判断是：这套"知识点分级+间隔复习+AI批改"的学习方法本身是通用的，不该锁死在一个人手里。于是写了一份完整的改造计划，把私人工具变成公开产品——这份计划本身就是这个项目最能体现工程判断力的地方。
        </p>
        <div className="rounded-lg border border-border bg-canvas/40 p-5">
          <p className="mb-3 font-sans text-sm font-semibold text-ink">
            改造前必须做到的事：
          </p>
          <ul className="space-y-2.5">
            {TRANSFORM_CHECKLIST.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 text-accent-green">✓</span>
                <span className="text-ink-soft">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-5">
          最后一条尤其值得说：
          <strong className="text-ink">
            主动选择不做的功能，跟做出来的功能一样重要
          </strong>
          。
        </p>
      </Section>

      <Section title="系统怎么跑">
        <LayerStack
          layers={[
            { title: "微信小程序官网入口", detail: "lailinkeji.com/learn/" },
            { title: "Nginx", detail: "复用官网现有HTTPS证书，没有另起一套" },
            {
              title: "Go 标准库 HTTP 服务",
              detail: "学习码鉴权 · 安全会话Cookie · 输入校验 · 日志脱敏",
            },
            { title: "SQLite", detail: "无CGO驱动，容器构建简单" },
            {
              title: "DeepSeek API",
              detail: "GradeLesson · GradeConnection · Variant，密钥未配置时自动降级为规则自评",
              variant: "accent",
            },
          ]}
        />
      </Section>

      <Section title="关键技术决策">
        <DecisionList
          items={[
            {
              question: "为什么后端坚持用 Go 标准库，不上框架",
              answer:
                "这是个功能边界很清楚的小应用（学习码鉴权、几个API端点、SQLite读写），不需要框架帮忙管理复杂的路由树或中间件栈。标准库自带的net/http已经够用，少一个框架依赖，长期维护和排查问题都更简单。",
            },
            {
              question: "为什么身份认证用\"8位随机学习码\"而不是手机号/邮箱",
              answer:
                "公开产品第一版的目标是\"能学习\"，不是\"能做用户运营\"。手机号/邮箱意味着要处理验证码、隐私合规、找回密码这些额外的工程量和合规责任。一个随机学习码既能让用户换设备恢复进度，又不涉及任何个人身份信息，边界最小。",
            },
            {
              question: "为什么AI批改要有自动降级",
              answer:
                "外部API不可能100%可用，密钥可能过期、请求可能超时。如果批改失败就让学习者卡住，用户体验会很差。设计上让AI批改失败时自动切换到规则自评，用户感知不到中断，只是判分精细度降低了一点。",
            },
          ]}
        />
      </Section>

      <Section title="这门课讲了什么">
        <p className="mb-4">
          零基础也能学的AI基础课，从最基本的Token讲到当前AI圈最前沿的讨论：
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {COURSE_TOPICS.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <p>
          这些内容是把自己长期实际使用各类AI工具积累的理解，整理成了一套可以系统学习的课程，没有照搬现成的科普文章。
        </p>
      </Section>

      <Section title="数据说话">
        <DataTable
          rows={[
            ["课程规模", "40课，96道题"],
            ["私人版历史", "11模块，44知识点，108题"],
            ["部署方式", "Docker Compose + Nginx，复用现有服务器"],
            ["上线状态", "线上运行中，可直接访问体验"],
          ]}
        />
      </Section>

      <Section title="技术栈一览">
        <div className="flex flex-wrap gap-2">
          {["Go", "SQLite", "DeepSeek API", "Docker Compose", "Nginx", "原生HTML/CSS/JS"].map(
            (t) => (
              <Tag key={t}>{t}</Tag>
            ),
          )}
        </div>
      </Section>
    </div>
  );
}
