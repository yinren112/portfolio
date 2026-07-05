import React from "react";
import { colors, fonts } from "../theme";
import { revealStyle } from "./utils";

// 跟网站 Tag/StatBar 组件一致的胶囊标签，第一个高亮为强调色
export const StatRow: React.FC<{ stats: string[]; frame: number; startFrame: number }> = ({
  stats,
  frame,
  startFrame,
}) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
    {stats.map((stat, i) => (
      <div
        key={stat}
        style={{
          borderRadius: 8,
          border: `1px solid ${i === 0 ? `${colors.accent}66` : colors.border}`,
          background: i === 0 ? `${colors.accent}1a` : "transparent",
          color: i === 0 ? colors.accent : colors.inkSoft,
          fontFamily: fonts.mono,
          fontSize: 20,
          fontWeight: i === 0 ? 700 : 500,
          padding: "10px 18px",
          ...revealStyle(frame, startFrame + i * 6),
        }}
      >
        {stat}
      </div>
    ))}
  </div>
);
