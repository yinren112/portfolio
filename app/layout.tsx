import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

// 发给 HR 的链接以国内镜像为准，OG 绝对地址统一指向它；
// Vercel 构建复用同一套，保证聊天软件里的预览卡片始终可用
const SITE_URL = `https://lailinkeji.com${process.env.NEXT_PUBLIC_BASE_PATH || "/me"}`;

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
