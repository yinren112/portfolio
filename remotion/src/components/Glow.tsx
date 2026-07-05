import React from "react";
import { colors } from "../theme";

// 跟网站 .hero-glow 一致的柔和氛围光斑
export const Glow: React.FC<{ tint?: string }> = ({ tint = colors.accent }) => (
  <div
    style={{
      position: "absolute",
      inset: "-10% -6%",
      zIndex: 0,
      background: `radial-gradient(closest-side, ${tint}30, transparent), radial-gradient(closest-side at 85% 15%, ${colors.accentGreen}26, transparent 70%)`,
      filter: "blur(60px)",
      pointerEvents: "none",
    }}
  />
);
