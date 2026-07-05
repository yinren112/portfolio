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

export const Bookworm: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("bgm.wav")} />
      <Sequence from={0} durationInFrames={75}>
        <Scene>
          <Glow />
          <Act durationInFrames={75}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <LogoMark size={100} />
              <div style={{ fontFamily: fonts.sans, fontSize: 56, fontWeight: 700, color: colors.ink }}>Bookworm</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkSoft, textAlign: "center", maxWidth: 720 }}>
                校园学习小程序 · 生产环境运行中
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
                一个人从 0 做到上线
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 88, fontWeight: 700, color: colors.accent, lineHeight: 1 }}>
                10 个月
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkFaint }}>
                持续维护，带真实微信支付，没有断过
              </div>
            </div>
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
                { prompt: "$", text: "git log --oneline | wc -l" },
                { text: "426" },
                { prompt: "$", text: "echo 一个人从0到上线", accent: true },
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
        { title: "微信小程序原生框架" },
        { title: "Nginx 反向代理" },
        { title: "Fastify + TypeScript" },
        { title: "PostgreSQL + Prisma" },
        { title: "微信支付 v3", accent: true, detail: "Webhook 防重放" },
      ]}
    />
  );
};

const StatRowWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return <StatRow frame={frame} startFrame={0} stats={["426 次提交", "34 个数据模型", "3 条 CI 流水线"]} />;
};
