import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { springIn, ramp, clamp01 } from "../lib/motion";

export type Stage = { title: string; mode: "自动" | "半自动" | "人工"; detail: string };

const MODE: Record<Stage["mode"], string> = {
  自动: colors.accentGreen,
  半自动: colors.accent,
  人工: colors.accentBlue,
};

// 数据包在流水线上流动：卡片依次弹入，一个发光包裹沿连线穿过各阶段，
// 包裹经过时该阶段边框点亮。比静态横排图有"系统在运行"的动势。
export const PipelineFlow: React.FC<{ stages: Stage[]; from: number; dark?: boolean }> = ({
  stages,
  from,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const n = stages.length;

  // 包裹从第一个卡片流到最后一个：卡片入场后开始
  const flowStart = from + n * 8 + 10;
  const flowDur = 60;
  const flowP = ramp(frame, flowStart, flowStart + flowDur);
  const packetX = flowP * (n - 1); // 0..n-1，落在卡片中心

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "stretch", gap: 0, width: 1560 }}>
      {stages.map((stage, i) => {
        const s = springIn(frame, from + i * 8);
        const c = MODE[stage.mode];
        // 包裹接近该卡片时点亮
        const near = clamp01(1 - Math.abs(packetX - i) * 1.6);
        const cardBg = dark ? "#1f2024" : colors.paper;
        return (
          <React.Fragment key={stage.title}>
            <div
              style={{
                flex: 1,
                opacity: ramp(frame, from + i * 8, from + i * 8 + 8),
                transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + s * 0.1})`,
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 16,
                  border: `1.5px solid ${near > 0.1 ? c : dark ? "#2a2c30" : colors.border}`,
                  background: cardBg,
                  padding: "24px 22px",
                  height: "100%",
                  boxShadow:
                    near > 0.1
                      ? `0 0 ${20 + near * 40}px ${c}${Math.round(near * 90)
                          .toString(16)
                          .padStart(2, "0")}, 0 12px 30px -12px rgba(0,0,0,0.25)`
                      : "0 12px 30px -14px rgba(0,0,0,0.18)",
                  transition: "none",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    borderRadius: 8,
                    border: `1px solid ${c}66`,
                    background: `${c}1f`,
                    color: c,
                    fontFamily: fonts.mono,
                    fontSize: 17,
                    fontWeight: 600,
                    padding: "5px 12px",
                    marginBottom: 14,
                  }}
                >
                  {stage.mode}
                </span>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 27,
                    fontWeight: 700,
                    color: dark ? colors.terminalText : colors.ink,
                    marginBottom: 8,
                  }}
                >
                  {stage.title}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 18, lineHeight: 1.45, color: colors.inkSoft }}>
                  {stage.detail}
                </div>
              </div>
            </div>
            {i < n - 1 && <Connector active={packetX > i} lit={clamp01((packetX - i) * 1.2)} c={c} dark={dark} />}
          </React.Fragment>
        );
      })}
      {/* 发光包裹 */}
      {flowP > 0 && flowP < 1 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${(packetX / (n - 1)) * (100 - 100 / n) + 50 / n}%`,
            transform: "translate(-50%, -50%)",
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: colors.accent,
            boxShadow: `0 0 24px 8px ${colors.accent}, 0 0 48px 16px ${colors.accent}66`,
            zIndex: 5,
          }}
        />
      )}
    </div>
  );
};

const Connector: React.FC<{ active: boolean; lit: number; c: string; dark: boolean }> = ({ lit, c, dark }) => (
  <div style={{ width: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div
      style={{
        width: "100%",
        height: 3,
        borderRadius: 2,
        background: `linear-gradient(90deg, ${c} ${lit * 100}%, ${dark ? "#2a2c30" : colors.borderDark} ${lit * 100}%)`,
      }}
    />
  </div>
);
