export type ProjectSummary = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  href: string;
  external?: string;
};

export const projects: ProjectSummary[] = [
  {
    slug: "open-boss",
    name: "open-boss",
    tagline: "Agent 原生设计的求职信息自动化流水线",
    description:
      "感知-推理-行动-观察闭环，把每天 2 小时以上的岗位筛选，压缩到人工只花 10 分钟做最终确认。",
    tags: ["Agent 原生设计", "983 岗位处理", "回复率 75%", "多账号并行"],
    href: "/projects/open-boss",
  },
  {
    slug: "bookworm",
    name: "Bookworm",
    tagline: "校园学习小程序 · 生产环境运行中",
    description:
      "一个人从 0 做到上线，带真实微信支付，持续维护没有断过。",
    tags: ["10 个月", "426 次提交", "34 个数据模型", "3 条 CI 流水线"],
    href: "/projects/bookworm",
  },
  {
    slug: "learn",
    name: "零基础学 AI",
    tagline: "从私人学习工具到公开上线的网站",
    description: "给一个人做的工具，验证有效后改造成所有人能用的产品。",
    tags: ["40 课 96 题", "线上运行中", "AI 实时批改"],
    href: "/projects/learn",
    external: "https://lailinkeji.com/learn/",
  },
  {
    slug: "xhs-scout",
    name: "xhs-rental-scout",
    tagline: "Agent 原生设计的租房信息筛选工具",
    description:
      "持续观察、累积证据识别中介和虚假信息——最后靠它租到了房子。",
    tags: ["Agent 原生设计", "29 轮检索", "211 个账号画像库", "有单元测试"],
    href: "/projects/xhs-scout",
  },
];

export const navLinks = [
  { href: "/", label: "首页" },
  { href: "/ai-native", label: "AI 工具栈" },
  { href: "/about", label: "关于" },
];
