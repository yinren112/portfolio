import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// 流动的极光背景：多个色斑用低频正弦各自漂移，永不静止。
// 深色/浅色两套配色，跟网站 paper / terminal 呼应。
type Blob = { hue: string; x: number; y: number; r: number; phase: number; speed: number; drift: number };

export const AuroraBackground: React.FC<{ dark?: boolean; intensity?: number }> = ({
  dark = false,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const base = dark ? colors.terminal : colors.paper;

  const blobs: Blob[] = dark
    ? [
        { hue: colors.accent, x: 30, y: 35, r: 46, phase: 0, speed: 0.011, drift: 10 },
        { hue: colors.accentGreen, x: 72, y: 60, r: 40, phase: 2, speed: 0.009, drift: 12 },
        { hue: colors.accentBlue, x: 55, y: 20, r: 34, phase: 4, speed: 0.013, drift: 9 },
      ]
    : [
        { hue: colors.accent, x: 28, y: 30, r: 50, phase: 0, speed: 0.010, drift: 9 },
        { hue: colors.accentGreen, x: 74, y: 66, r: 44, phase: 2.4, speed: 0.008, drift: 11 },
        { hue: colors.accentBlue, x: 60, y: 24, r: 36, phase: 4.1, speed: 0.012, drift: 8 },
      ];

  const alpha = dark ? 0.22 : 0.16;

  return (
    <AbsoluteFill style={{ background: base, overflow: "hidden" }}>
      {blobs.map((b, i) => {
        const dx = Math.sin(frame * b.speed + b.phase) * b.drift;
        const dy = Math.cos(frame * b.speed * 0.8 + b.phase) * b.drift;
        const pulse = 1 + Math.sin(frame * 0.02 + b.phase) * 0.08;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${b.x + dx}%`,
              top: `${b.y + dy}%`,
              width: `${b.r * pulse}%`,
              height: `${b.r * pulse}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: `radial-gradient(closest-side, ${b.hue}${Math.round(alpha * intensity * 255)
                .toString(16)
                .padStart(2, "0")}, transparent 72%)`,
              filter: "blur(60px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
