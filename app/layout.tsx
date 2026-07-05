import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// OG/Twitter 卡片里的图片、链接必须是"当前实际部署域名"的绝对地址，
// 不然分享出去链接预览会指向另一个域名——按优先级解析：
// 1. NEXT_PUBLIC_SITE_URL 手动指定（比如手动打包上传到一个新的 Vercel 项目/域名时用）
// 2. 自建服务器镜像版（build:mirror 设置了 NEXT_PUBLIC_BASE_PATH）固定指向 lailinkeji.com/me
// 3. Vercel 用 GitHub 连接构建时，Vercel 会自动注入 VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL，
//    直接用它，不用手动配置环境变量
// 4. 兜底：本地手动 `npm run build` 且以上都没有时，退回镜像域名
const MIRROR_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;
const VERCEL_DOMAIN =
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (MIRROR_BASE_PATH
    ? `https://lailinkeji.com${MIRROR_BASE_PATH}`
    : VERCEL_DOMAIN
      ? `https://${VERCEL_DOMAIN}`
      : "https://lailinkeji.com/me");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "瓦帕迪力 · AI应用工程师作品集",
  description:
    "求职方向：AI应用工程师 / AI产品工程师（远程）。四个真实上线的项目：Agent原生求职流水线、带微信支付的校园小程序、在线AI学习网站、租房信息筛选工具，代码可查，可在线体验。",
  openGraph: {
    title: "瓦帕迪力 · AI应用工程师作品集",
    description:
      "四个真实上线的项目：Agent原生求职流水线、带微信支付的校园小程序、在线AI学习网站、租房信息筛选工具。代码可查，可在线体验。",
    url: "./",
    siteName: "瓦帕迪力的个人网站",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "瓦帕迪力 · AI应用工程师作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "瓦帕迪力 · AI应用工程师作品集",
    description:
      "四个真实上线的项目，代码可查，可在线体验。",
    images: ["og.png"],
  },
  // 只想让拿到直达链接的人能看到，不想被搜索引擎收录、也不想出现在别人的搜索结果里。
  // 不影响微信/Slack等聊天软件的链接预览卡片——那些抓的是上面的 OG 标签，跟 robots 无关。
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col">
        <div className="grain-overlay" aria-hidden />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
