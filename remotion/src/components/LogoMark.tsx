import React from "react";
import { colors, fonts } from "../theme";

// 跟 app/icon.svg 完全一致的印章样式
export const LogoMark: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div
    style={{
      position: "relative",
      width: size,
      height: size,
      borderRadius: size * 0.22,
      background: colors.terminal,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span
      style={{
        fontFamily: fonts.sans,
        fontSize: size * 0.52,
        fontWeight: 700,
        color: colors.paper,
      }}
    >
      瓦
    </span>
    <div
      style={{
        position: "absolute",
        right: size * 0.12,
        bottom: size * 0.12,
        width: size * 0.16,
        height: size * 0.16,
        borderRadius: "50%",
        background: colors.accent,
      }}
    />
  </div>
);
