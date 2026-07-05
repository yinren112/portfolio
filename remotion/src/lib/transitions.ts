import type { TransitionPresentation } from "@remotion/transitions";
import React from "react";
import { AbsoluteFill } from "remotion";

// 缩放穿越：出场元素放大+模糊+淡出，入场元素从略小+模糊里浮现。
// 比硬切/普通淡入高级得多，有"推镜头穿过"的电影感。
type Props = { enterDirection?: "in" | "out" };

export const scaleThrough = (props?: Props): TransitionPresentation<Props> => {
  return {
    component: ({ presentationProgress, presentationDirection, children }) => {
      const p = presentationProgress;
      const isExiting = presentationDirection === "exiting";
      const scale = isExiting ? 1 + p * 0.14 : 1.12 - p * 0.12;
      const blur = isExiting ? p * 12 : (1 - p) * 12;
      const opacity = isExiting ? 1 - p : p;
      return React.createElement(
        AbsoluteFill,
        { style: { opacity, transform: `scale(${scale})`, filter: `blur(${blur}px)` } },
        children
      );
    },
    props: props ?? {},
  };
};

// 柔和的方向性推移 + 淡化
export const softSlide = (dir: "left" | "up" = "left"): TransitionPresentation<Props> => {
  return {
    component: ({ presentationProgress, presentationDirection, children }) => {
      const p = presentationProgress;
      const isExiting = presentationDirection === "exiting";
      const axis = dir === "left" ? "translateX" : "translateY";
      const dist = isExiting ? -p * 6 : (1 - p) * 6;
      const opacity = isExiting ? 1 - p : p;
      return React.createElement(
        AbsoluteFill,
        { style: { opacity, transform: `${axis}(${dist}%)` } },
        children
      );
    },
    props: {},
  };
};
