export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-10 font-sans text-xs leading-relaxed text-ink-faint">
        <p>
          瓦帕迪力 · 个人网站，不代表任何公司或机构。部分项目涉及的历史数据已做脱敏和抽象化处理。
        </p>
        <p className="mt-2">
          本站用 Next.js 15 / React / TypeScript / Tailwind CSS 构建，
          <a
            href="https://github.com/yinren112/portfolio"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border-dark underline-offset-2 transition-colors hover:text-accent"
          >
            代码开源可查
          </a>
          ——本身就是一份可核验的前端作品。
        </p>
        <p className="mt-2">
          <a
            href="mailto:wapadlg@gmail.com"
            className="underline decoration-border-dark underline-offset-2 transition-colors hover:text-accent"
          >
            wapadlg@gmail.com
          </a>
          {" · "}
          <a
            href="https://github.com/yinren112"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-border-dark underline-offset-2 transition-colors hover:text-accent"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
