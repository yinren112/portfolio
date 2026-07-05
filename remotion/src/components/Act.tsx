import React from "react";
import { useCurrentFrame } from "remotion";
import { revealStyle, fadeOutStyle } from "./utils";

// 每个 Sequence 内部通用的进场+退场包装：进场用 reveal 曲线，退场前 10 帧开始淡出
export const Act: React.FC<{ children: React.ReactNode; durationInFrames: number; enterAt?: number }> = ({
  children,
  durationInFrames,
  enterAt = 0,
}) => {
  const frame = useCurrentFrame();
  const enter = revealStyle(frame, enterAt);
  const exit = fadeOutStyle(frame, durationInFrames - 10);
  return <div style={{ ...enter, opacity: Math.min(enter.opacity as number, exit.opacity as number) }}>{children}</div>;
};
