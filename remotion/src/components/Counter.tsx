import React from "react";
import { useCurrentFrame } from "remotion";
import { springSoft } from "../lib/motion";
import { fonts } from "../theme";

// 弹簧数字滚动：从0冲到目标值并沉降，带千分位可选
export const Counter: React.FC<{
  to: number;
  from: number;
  prefix?: string;
  suffix?: string;
  color: string;
  size: number;
}> = ({ to, from, prefix = "", suffix = "", color, size }) => {
  const frame = useCurrentFrame();
  const p = springSoft(frame, from);
  const value = Math.round(to * p);
  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: size,
        fontWeight: 700,
        color,
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "-0.02em",
      }}
    >
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
};
