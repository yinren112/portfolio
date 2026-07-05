import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, fonts } from "../theme";
import { Counter } from "./Counter";
import { springIn, ramp } from "../lib/motion";

type Item = { value: number; label: string; suffix?: string; prefix?: string };

// 三个数据依次弹入，数字滚动计数，中间有细分隔线。
export const StatTrio: React.FC<{ items: Item[]; dark?: boolean }> = ({ items, dark = false }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {items.map((it, i) => {
        const from = 6 + i * 16;
        const s = springIn(frame, from);
        return (
          <React.Fragment key={it.label}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                padding: "0 64px",
                opacity: ramp(frame, from, from + 10),
                transform: `translateY(${(1 - s) * 30}px) scale(${0.9 + s * 0.1})`,
              }}
            >
              <Counter
                to={it.value}
                from={from}
                prefix={it.prefix}
                suffix={it.suffix}
                color={colors.accent}
                size={110}
              />
              <div style={{ fontFamily: fonts.sans, fontSize: 26, color: dark ? colors.terminalText : colors.inkSoft }}>
                {it.label}
              </div>
            </div>
            {i < items.length - 1 && (
              <div
                style={{
                  width: 1.5,
                  height: 90,
                  background: dark ? "#2a2c30" : colors.borderDark,
                  opacity: ramp(frame, from + 8, from + 18),
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
