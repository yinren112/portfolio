import React from "react";
import { AbsoluteFill } from "remotion";
import { colors } from "../theme";
import { Grain } from "./Grain";

export const Scene: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}> = ({ children, dark = false, center = true }) => (
  <AbsoluteFill
    style={{
      background: dark ? colors.terminal : colors.paper,
      display: "flex",
      flexDirection: "column",
      alignItems: center ? "center" : "flex-start",
      justifyContent: "center",
      padding: 72,
    }}
  >
    {children}
    <Grain opacity={dark ? 0.035 : 0.05} />
  </AbsoluteFill>
);
