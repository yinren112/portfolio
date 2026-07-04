export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-10 font-sans text-xs leading-relaxed text-ink-faint">
        <p>
          瓦帕迪力 · 个人网站，不代表任何公司或机构。部分项目涉及的历史数据已做脱敏和抽象化处理。
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
