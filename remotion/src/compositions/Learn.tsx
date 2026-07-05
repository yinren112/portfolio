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
import { revealStyle } from "../components/utils";

export const Learn: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("bgm.wav")} />
      <Sequence from={0} durationInFrames={75}>
        <Scene>
          <Glow />
          <Act durationInFrames={75}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <LogoMark size={100} />
              <div style={{ fontFamily: fonts.sans, fontSize: 52, fontWeight: 700, color: colors.ink }}>零基础学 AI</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkSoft, textAlign: "center", maxWidth: 720 }}>
                从私人学习工具到公开上线的网站
              </div>
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={65} durationInFrames={105}>
        <Scene>
          <Act durationInFrames={105}>
            <TransformMoment />
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={160} durationInFrames={175}>
        <Scene>
          <Act durationInFrames={175}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 700, color: colors.ink }}>系统怎么跑</div>
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
                { prompt: "$", text: "open lailinkeji.com/learn/" },
                { text: "40 课 · 96 题 · 线上运行中" },
                { prompt: "$", text: "echo 任何人都可以去学去挑错", accent: true },
              ]}
            />
          </Act>
        </Scene>
      </Sequence>
    </>
  );
};

const TransformMoment: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ ...revealStyle(frame, 0), fontFamily: fonts.mono, fontSize: 30, color: colors.inkFaint }}>
          私人命令行工具
        </div>
        <div style={{ ...revealStyle(frame, 20), fontFamily: fonts.sans, fontSize: 34, color: colors.accent }}>→</div>
        <div style={{ ...revealStyle(frame, 40), fontFamily: fonts.mono, fontSize: 34, fontWeight: 700, color: colors.ink }}>
          公开网站
        </div>
      </div>
      <div style={{ ...revealStyle(frame, 60), fontFamily: fonts.sans, fontSize: 22, color: colors.inkFaint, textAlign: "center", maxWidth: 780 }}>
        验证有效后写了完整改造计划，去掉私人信息，换一套全新密钥
      </div>
    </div>
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
        { title: "Nginx", detail: "复用官网现有 HTTPS 证书" },
        { title: "Go 标准库 HTTP 服务", detail: "学习码鉴权 · 安全会话" },
        { title: "SQLite" },
        { title: "DeepSeek API", accent: true, detail: "密钥未配置时自动降级" },
      ]}
    />
  );
};

const StatRowWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return <StatRow frame={frame} startFrame={0} stats={["40 课 96 题", "线上运行中", "AI 实时批改"]} />;
};
