import React from "react";
import { colors, fonts } from "../theme";

// 跟网站首页 TerminalHero 组件同一套视觉：深色窗口 + 三个圆点 + 等宽字体 + 绿色 $ 提示符
export const TerminalCard: React.FC<{
  lines: { prompt?: string; text: string; accent?: boolean }[];
  width?: number;
}> = ({ lines, width = 720 }) => (
  <div
    style={{
      width,
      borderRadius: 14,
      overflow: "hidden",
      border: `1px solid ${colors.borderDark}99`,
      background: colors.terminal,
      boxShadow: "0 20px 50px -12px rgba(20,20,19,0.35)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "14px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
    <div style={{ padding: "22px 24px", fontFamily: fonts.mono, fontSize: 20, lineHeight: 1.7 }}>
      {lines.map((line, i) => (
        <div key={i} style={{ color: line.accent ? colors.terminalAccent : colors.terminalText }}>
          {line.prompt !== undefined ? (
            <>
              <span style={{ color: colors.terminalAccent }}>{line.prompt} </span>
              {line.text}
            </>
          ) : (
            line.text
          )}
        </div>
      ))}
    </div>
  </div>
);
