import { Easing, interpolate } from "remotion";
import { easeOut } from "../theme";

export const ease = Easing.bezier(...easeOut);

// 进场动画：跟网站 .reveal 类完全一致的位移/缩放/时长手感（420ms @ 30fps ≈ 12.6 帧，取 13 帧）
export function revealProgress(frame: number, startFrame: number, durationInFrames = 13) {
  return interpolate(frame, [startFrame, startFrame + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

export function revealStyle(frame: number, startFrame: number, durationInFrames = 13) {
  const p = revealProgress(frame, startFrame, durationInFrames);
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * 14}px) scale(${0.99 + p * 0.01})`,
  };
}

export function fadeOutStyle(frame: number, startFrame: number, durationInFrames = 10) {
  const p = interpolate(frame, [startFrame, startFrame + durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return { opacity: p };
}
