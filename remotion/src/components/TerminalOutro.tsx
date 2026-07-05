import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { springIn, ramp } from "../lib/motion";

type Line = { prompt?: string; text: string; accent?: boolean; typeFrom?: number };

// 收尾终端窗口：窗口弹入，命令逐字打出，光标闪烁，链接行有高光扫过。
export const TerminalOutro: React.FC<{ from: number; lines: Line[]; width?: number }> = ({
  from,
  lines,
  width = 1080,
}) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, from, { damping: 20, stiffness: 90 });

  return (
    <div
      style={{
        width,
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${colors.borderDark}99`,
        background: colors.terminal,
        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.55)",
        opacity: ramp(frame, from, from + 8),
        transform: `translateY(${(1 - s) * 40}px) scale(${0.94 + s * 0.06})`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {["#ff5f57", "#febc2e", "#28c840"].map((col, i) => (
          <span key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: col, opacity: 0.85 }} />
        ))}
        <span style={{ marginLeft: 12, fontFamily: fonts.mono, fontSize: 16, color: colors.inkFaint }}>zsh</span>
      </div>
      <div style={{ padding: "34px 36px", fontFamily: fonts.mono, fontSize: 27, lineHeight: 1.85 }}>
        {lines.map((line, i) => {
          const tf = (line.typeFrom ?? from + 14) - from;
          const localFrame = frame - from;
          const isCmd = line.prompt !== undefined;
          const chars = isCmd
            ? Math.max(0, Math.floor((localFrame - tf) / 1.1))
            : line.text.length;
          const shown = line.text.slice(0, chars);
          const done = chars >= line.text.length;
          const appear = ramp(frame, (line.typeFrom ?? from + 14), (line.typeFrom ?? from + 14) + 4);
          return (
            <div key={i} style={{ opacity: appear, color: line.accent ? colors.terminalAccent : colors.terminalText }}>
              {line.prompt !== undefined && <span style={{ color: colors.terminalAccent }}>{line.prompt} </span>}
              {shown}
              {isCmd && !done && appear > 0.5 && (
                <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0.2 }}>▊</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
