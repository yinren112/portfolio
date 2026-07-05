import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

// 前后景视差的浮尘粒子。深度越大越模糊越慢，制造空间纵深。
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const ParticleField: React.FC<{ count?: number; dark?: boolean; seed?: number; drift?: number }> = ({
  count = 40,
  dark = false,
  seed = 7,
  drift = 1,
}) => {
  const frame = useCurrentFrame();
  const particles = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: count }, () => {
      const depth = rand(); // 0 远 -> 1 近
      return {
        x: rand() * 100,
        y: rand() * 100,
        size: 1.5 + depth * 4,
        depth,
        speed: 0.15 + depth * 0.6,
        phase: rand() * Math.PI * 2,
        wobble: 3 + rand() * 6,
      };
    });
  }, [count, seed]);

  const dot = dark ? colors.terminalAccent : colors.accent;

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed * drift * 0.06) % 110;
        const yy = y < -5 ? y + 110 : y;
        const x = p.x + Math.sin(frame * 0.02 + p.phase) * p.wobble * 0.15;
        const opacity = (dark ? 0.5 : 0.35) * (0.3 + p.depth * 0.7);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${yy}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: dot,
              opacity,
              filter: p.depth < 0.5 ? `blur(${(0.5 - p.depth) * 4}px)` : "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
