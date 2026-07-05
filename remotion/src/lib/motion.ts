import { Easing, interpolate, spring } from "remotion";
import { easeOut, easeInOut, FPS } from "../theme";

export const ease = Easing.bezier(...easeOut);
export const easeIO = Easing.bezier(...easeInOut);

// 带自然过冲的弹簧进场（premium 手感的核心：不是线性，有回弹和沉降）
export function springIn(frame: number, from: number, config?: Parameters<typeof spring>[0]["config"]) {
  return spring({
    frame: frame - from,
    fps: FPS,
    config: { damping: 18, stiffness: 120, mass: 0.9, ...config },
  });
}

// 更软的弹簧，给大位移/相机移动用
export function springSoft(frame: number, from: number) {
  return spring({ frame: frame - from, fps: FPS, config: { damping: 26, stiffness: 70, mass: 1.1 } });
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

// 区间内 ease，区间外 clamp
export function ramp(frame: number, start: number, end: number, easing = ease) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

// 淡入 -> 保持 -> 淡出 的完整生命周期
export function lifecycle(frame: number, inStart: number, inEnd: number, outStart: number, outEnd: number) {
  return interpolate(frame, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

// 模糊进场：数值越接近0越清晰
export function blurIn(frame: number, from: number, dur = 16) {
  const p = ramp(frame, from, from + dur);
  return (1 - p) * 14;
}
