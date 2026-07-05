import React from "react";
import { AbsoluteFill } from "remotion";
import { AuroraBackground } from "./AuroraBackground";
import { ParticleField } from "./ParticleField";
import { MovingGrain, Vignette } from "./Cinematic";

// 贯穿全片的持续氛围层：极光背景 + 视差粒子在最底，颗粒 + 暗角在最顶，
// 中间夹前景内容。转场只切换前景，氛围永远连续流动，不会每次重置。
export const PromoShell: React.FC<{ dark?: boolean; seed?: number; children: React.ReactNode }> = ({
  dark = false,
  seed = 7,
  children,
}) => (
  <AbsoluteFill>
    <AuroraBackground dark={dark} />
    <ParticleField dark={dark} seed={seed} count={44} />
    {children}
    <Vignette strength={dark ? 0.42 : 0.28} />
    <MovingGrain opacity={dark ? 0.05 : 0.06} />
  </AbsoluteFill>
);
