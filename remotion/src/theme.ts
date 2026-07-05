// 直接复用 app/globals.css 的设计 token，保证视频和网站是同一套视觉语言，不是另起一套模板。
export const colors = {
  ink: "#1c1d1f",
  inkSoft: "#55575c",
  inkFaint: "#8b8d92",
  paper: "#f4f3ef",
  canvas: "#e3e1db",
  accent: "#b5502f",
  accentBlue: "#4d7bab",
  accentGreen: "#5f7a4d",
  border: "#e3e1db",
  borderDark: "#a5a39b",
  terminal: "#17181a",
  terminalText: "#dcdad2",
  terminalAccent: "#6fb287",
} as const;

export const fonts = {
  sans: '"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Segoe UI", system-ui, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
} as const;

// 跟 globals.css 里 --ease-out / --ease-in-out 完全一致
export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeInOut = [0.77, 0, 0.175, 1] as const;

export const FPS = 30;
export const DURATION = 450; // 15s
export const WIDTH = 1280;
export const HEIGHT = 720;
