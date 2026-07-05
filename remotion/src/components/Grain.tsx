import React from "react";

// 跟网站 .grain-overlay 用同一份 SVG feTurbulence 噪点，保证质感一致
const GRAIN_SVG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
      backgroundImage: GRAIN_SVG,
    }}
  />
);
