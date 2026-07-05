import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { Glow } from "../components/Glow";
import { LogoMark } from "../components/LogoMark";
import { TerminalCard } from "../components/TerminalCard";
import { LayerStackDiagram } from "../components/LayerStackDiagram";
import { StatRow } from "../components/StatRow";
import { Act } from "../components/Act";
import { colors, fonts } from "../theme";

export const XhsScout: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("bgm.wav")} />
      <Sequence from={0} durationInFrames={75}>
        <Scene>
          <Glow />
          <Act durationInFrames={75}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <LogoMark size={100} />
              <div style={{ fontFamily: fonts.sans, fontSize: 48, fontWeight: 700, color: colors.ink }}>
                xhs-rental-scout
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkSoft, textAlign: "center", maxWidth: 720 }}>
                Agent 原生设计的房源筛选系统
              </div>
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={65} durationInFrames={105}>
        <Scene>
          <Act durationInFrames={105}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 900 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkSoft, textAlign: "center" }}>
                在小红书上搜房源，翻十条
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 88, fontWeight: 700, color: colors.accent, lineHeight: 1 }}>
                8 条是中介
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkFaint }}>
                判断逻辑可以写成规则，没必要每次靠肉眼看
              </div>
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={160} durationInFrames={175}>
        <Scene>
          <Act durationInFrames={175}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 700, color: colors.ink }}>
                感知 → 推理 → 行动 → 观察
              </div>
              <LayerStackWithFrame />
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={325} durationInFrames={65}>
        <Scene>
          <Act durationInFrames={65}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.inkSoft }}>数据说话</div>
              <StatRowWithFrame />
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={390} durationInFrames={60}>
        <Scene dark>
          <Act durationInFrames={60}>
            <TerminalCard
              width={760}
              lines={[
                { prompt: "$", text: "cat data/results/R29.md" },
                { text: "靠它筛出真实房东候选，租到了房子" },
                { prompt: "$", text: "open github.com/yinren112/xhs-rental-scout", accent: true },
              ]}
            />
          </Act>
        </Scene>
      </Sequence>
    </>
  );
};

const LayerStackWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <LayerStackDiagram
      frame={frame}
      startFrame={0}
      width={560}
      layers={[
        { title: "xhs 命令行工具", detail: "外部子进程" },
        { title: "pipeline.py", detail: "编排" },
        { title: "rules.py", accent: true, detail: "纯函数规则引擎" },
        { title: "本地文件", detail: "黑白名单库 · 去重记录" },
      ]}
    />
  );
};

const StatRowWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return <StatRow frame={frame} startFrame={0} stats={["29 轮检索", "211 个账号画像", "115 个职业号拉黑"]} />;
};
