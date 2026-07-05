import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

// 动态颗粒：每帧微移+闪烁，比静态噪点更有胶片质感
export const MovingGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.055 }) => {
  const frame = useCurrentFrame();
  const tx = (frame * 3) % 160;
  const ty = (frame * 2) % 160;
  const flick = 0.85 + Math.sin(frame * 1.7) * 0.15;
  return (
    <AbsoluteFill
      style={{
        opacity: opacity * flick,
        mixBlendMode: "overlay",
        pointerEvents: "none",
        backgroundImage: GRAIN,
        backgroundPosition: `${tx}px ${ty}px`,
      }}
    />
  );
};

// 电影感暗角
export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.35 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse 75% 75% at 50% 48%, transparent 55%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

// 高光扫过：一道斜向光带在指定帧区间横扫画面
export const LightSweep: React.FC<{ start: number; duration?: number; angle?: number }> = ({
  start,
  duration = 24,
  angle = 18,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + duration], [-30, 130], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const on = frame >= start && frame <= start + duration;
  if (!on) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: `${p}%`,
          width: "18%",
          height: "140%",
          transform: `rotate(${angle}deg)`,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), rgba(255,255,255,0.05), transparent)",
          filter: "blur(6px)",
        }}
      />
    </AbsoluteFill>
  );
};

// 转场时的色差脉冲（RGB 分离），非常轻，只在切换瞬间
export const ChromaticPulse: React.FC<{ at: number; window?: number }> = ({ at, window = 8 }) => {
  const frame = useCurrentFrame();
  const d = Math.abs(frame - at);
  if (d > window) return null;
  const amt = interpolate(d, [0, window], [4, 0]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", opacity: 0.5 }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: `inset ${amt}px 0 0 rgba(255,0,0,0.03), inset -${amt}px 0 0 rgba(0,255,255,0.03)` }} />
    </AbsoluteFill>
  );
};
