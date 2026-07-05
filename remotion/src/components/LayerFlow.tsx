import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { springIn, ramp, clamp01 } from "../lib/motion";

export type Layer = { title: string; detail?: string; accent?: boolean };

// 竖排架构层：层从两侧交替滑入，一个数据脉冲自上而下穿过，经过的连线点亮。
export const LayerFlow: React.FC<{ layers: Layer[]; from: number; dark?: boolean; width?: number }> = ({
  layers,
  from,
  dark = false,
  width = 720,
}) => {
  const frame = useCurrentFrame();
  const n = layers.length;
  const flowStart = from + n * 7 + 8;
  const flowDur = 55;
  const flowP = ramp(frame, flowStart, flowStart + flowDur);
  const pulseY = flowP * (n - 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width }}>
      {layers.map((layer, i) => {
        const s = springIn(frame, from + i * 7, { damping: 20, stiffness: 110 });
        const dir = i % 2 === 0 ? -1 : 1;
        const near = clamp01(1 - Math.abs(pulseY - i) * 1.8);
        const c = layer.accent ? colors.accent : dark ? "#2a2c30" : colors.border;
        const litBorder = near > 0.15 ? colors.accent : c;
        return (
          <React.Fragment key={layer.title}>
            <div
              style={{
                width: "100%",
                opacity: ramp(frame, from + i * 7, from + i * 7 + 8),
                transform: `translateX(${(1 - s) * 60 * dir}px) scale(${0.94 + s * 0.06})`,
              }}
            >
              <div
                style={{
                  borderRadius: 14,
                  textAlign: "center",
                  padding: "20px 24px",
                  border: `1.5px solid ${litBorder}`,
                  background: layer.accent ? `${colors.accent}1a` : dark ? "#1f2024" : colors.paper,
                  boxShadow:
                    near > 0.15
                      ? `0 0 ${16 + near * 34}px ${colors.accent}${Math.round(near * 80)
                          .toString(16)
                          .padStart(2, "0")}`
                      : "0 8px 22px -14px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 25,
                    fontWeight: 700,
                    color: layer.accent ? colors.accent : dark ? colors.terminalText : colors.ink,
                  }}
                >
                  {layer.title}
                </div>
                {layer.detail && (
                  <div style={{ marginTop: 5, fontFamily: fonts.mono, fontSize: 17, color: colors.inkSoft }}>
                    {layer.detail}
                  </div>
                )}
              </div>
            </div>
            {i < n - 1 && (
              <div style={{ height: 26, display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 3,
                    height: "100%",
                    borderRadius: 2,
                    background:
                      pulseY > i
                        ? colors.accent
                        : `linear-gradient(180deg, ${colors.borderDark}, ${dark ? "#2a2c30" : colors.border})`,
                    boxShadow: Math.abs(pulseY - i - 0.5) < 0.5 ? `0 0 12px 3px ${colors.accent}` : "none",
                  }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
