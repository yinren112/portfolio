import React from "react";
import { colors, fonts } from "../theme";
import { revealStyle } from "./utils";

export type Layer = { title: string; detail?: string; accent?: boolean };

// 跟网站 LayerStack.tsx 完全一致的视觉：竖排卡片 + 向下箭头
export const LayerStackDiagram: React.FC<{
  layers: Layer[];
  frame: number;
  startFrame: number;
  width?: number;
}> = ({ layers, frame, startFrame, width = 640 }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width }}>
    {layers.map((layer, i) => {
      const layerStart = startFrame + i * 8;
      return (
        <React.Fragment key={layer.title}>
          <div style={{ width: "100%", ...revealStyle(frame, layerStart) }}>
            <div
              style={{
                borderRadius: 10,
                textAlign: "center",
                padding: "14px 18px",
                border: `1px solid ${layer.accent ? `${colors.accent}66` : colors.border}`,
                background: layer.accent ? `${colors.accent}1a` : colors.paper,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 18,
                  fontWeight: 700,
                  color: layer.accent ? colors.accent : colors.ink,
                }}
              >
                {layer.title}
              </div>
              {layer.detail && (
                <div style={{ marginTop: 4, fontFamily: fonts.mono, fontSize: 13, color: colors.inkSoft }}>
                  {layer.detail}
                </div>
              )}
            </div>
          </div>
          {i < layers.length - 1 && (
            <div
              style={{
                padding: "6px 0",
                fontFamily: fonts.mono,
                fontSize: 20,
                color: colors.borderDark,
                ...revealStyle(frame, layerStart + 5),
              }}
            >
              ↓
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);
