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

// RGB 三元组，给 three.js / canvas 用
export const rgb = {
  ink: [0.11, 0.114, 0.122],
  paper: [0.957, 0.953, 0.937],
  accent: [0.71, 0.314, 0.184],
  accentBlue: [0.302, 0.482, 0.671],
  accentGreen: [0.373, 0.478, 0.302],
  terminal: [0.09, 0.094, 0.102],
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
export const WIDTH = 1920;
export const HEIGHT = 1080;
