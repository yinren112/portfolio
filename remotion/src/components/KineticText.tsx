import React from "react";
import { useCurrentFrame } from "remotion";
import { springIn, ramp, blurIn } from "../lib/motion";

// 逐字弹入 + 模糊消散，每个字有轻微上移和过冲
export const KineticChars: React.FC<{
  text: string;
  from: number;
  stagger?: number;
  style?: React.CSSProperties;
}> = ({ text, from, stagger = 2.2, style }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", ...style }}>
      {text.split("").map((ch, i) => {
        const s = springIn(frame, from + i * stagger);
        const b = blurIn(frame, from + i * stagger, 12);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: ramp(frame, from + i * stagger, from + i * stagger + 8),
              transform: `translateY(${(1 - s) * 34}px) scale(${0.86 + s * 0.14})`,
              filter: `blur(${b}px)`,
              whiteSpace: "pre",
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

// 遮罩上推：文字从下方的裁切遮罩里滑出来（editorial 常用手法）
export const MaskReveal: React.FC<{
  from: number;
  delay?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from, delay = 0, children, style }) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, from + delay, { damping: 22, stiffness: 90 });
  return (
    <div style={{ overflow: "hidden", ...style }}>
      <div style={{ transform: `translateY(${(1 - s) * 105}%)` }}>{children}</div>
    </div>
  );
};

// 词组级模糊+缩放进场
export const BlurWords: React.FC<{
  from: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ from, children, style }) => {
  const frame = useCurrentFrame();
  const s = springIn(frame, from, { damping: 20, stiffness: 100 });
  const b = blurIn(frame, from, 18);
  return (
    <div
      style={{
        opacity: ramp(frame, from, from + 10),
        transform: `translateY(${(1 - s) * 24}px) scale(${0.96 + s * 0.04})`,
        filter: `blur(${b}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
