import React from "react";
import { AbsoluteFill } from "remotion";

export const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 120 }}>
    {children}
  </AbsoluteFill>
);
