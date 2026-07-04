import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "瓦帕迪力 · 个人网站",
  description:
    "风景园林本科，AI协同下的全栈实践者。求职自动化流水线、校园学习小程序、AI学习网站、小红书租房情报工具——真实运行的项目，不是课程作业。",
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
