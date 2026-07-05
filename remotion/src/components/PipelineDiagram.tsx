import React from "react";
import { colors, fonts } from "../theme";
import { revealStyle } from "./utils";

export type Stage = { title: string; mode: "自动" | "半自动" | "人工"; detail: string };

const MODE_STYLE: Record<Stage["mode"], { border: string; bg: string; text: string }> = {
  自动: { border: `${colors.accentGreen}66`, bg: `${colors.accentGreen}1a`, text: colors.accentGreen },
  半自动: { border: `${colors.accent}66`, bg: `${colors.accent}1a`, text: colors.accent },
  人工: { border: `${colors.accentBlue}66`, bg: `${colors.accentBlue}1a`, text: colors.accentBlue },
};

// 跟网站 Pipeline.tsx 完全一致的视觉：横排卡片 + 模式徽章 + 箭头连接
export const PipelineDiagram: React.FC<{ stages: Stage[]; frame: number; startFrame: number; width?: number }> = ({
  stages,
  frame,
  startFrame,
  width = 1080,
}) => (
  <div style={{ display: "flex", alignItems: "stretch", width }}>
    {stages.map((stage, i) => {
      const style = MODE_STYLE[stage.mode];
      const stageStart = startFrame + i * 10;
      return (
        <React.Fragment key={stage.title}>
          <div style={{ flex: 1, ...revealStyle(frame, stageStart) }}>
            <div
              style={{
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                background: colors.paper,
                padding: "18px 16px",
                height: "100%",
                boxShadow: "0 8px 24px -12px rgba(20,20,19,0.15)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  borderRadius: 6,
                  border: `1px solid ${style.border}`,
                  background: style.bg,
                  color: style.text,
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "3px 8px",
                  marginBottom: 10,
                }}
              >
                {stage.mode}
              </span>
              <div style={{ fontFamily: fonts.sans, fontSize: 19, fontWeight: 700, color: colors.ink, marginBottom: 6 }}>
                {stage.title}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: 1.5, color: colors.inkSoft }}>
                {stage.detail}
              </div>
            </div>
          </div>
          {i < stages.length - 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                fontFamily: fonts.mono,
                fontSize: 22,
                color: colors.borderDark,
                ...revealStyle(frame, stageStart + 6),
              }}
            >
              →
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);
