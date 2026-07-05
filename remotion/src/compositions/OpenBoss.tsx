import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Scene } from "../components/Scene";
import { Glow } from "../components/Glow";
import { LogoMark } from "../components/LogoMark";
import { TerminalCard } from "../components/TerminalCard";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { StatRow } from "../components/StatRow";
import { Act } from "../components/Act";
import { colors, fonts } from "../theme";

export const OpenBoss: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("bgm.wav")} />
      <Sequence from={0} durationInFrames={75}>
        <Scene>
          <Glow />
          <Act durationInFrames={75}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
              <LogoMark size={100} />
              <div style={{ fontFamily: fonts.sans, fontSize: 56, fontWeight: 700, color: colors.ink }}>open-boss</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkSoft, textAlign: "center", maxWidth: 720 }}>
                Agent 原生设计的招聘信息处理系统
              </div>
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={65} durationInFrames={110}>
        <Scene>
          <Act durationInFrames={110}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, maxWidth: 900 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkSoft, textAlign: "center" }}>
                每天两个多小时滚岗位列表、判断靠不靠谱
              </div>
              <div style={{ fontFamily: fonts.mono, fontSize: 88, fontWeight: 700, color: colors.accent, lineHeight: 1 }}>
                60-90 分钟/天
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: colors.inkFaint }}>
                流程机械、标准固定的部分，让程序来做
              </div>
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={165} durationInFrames={175}>
        <Scene>
          <Act durationInFrames={175}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 700, color: colors.ink }}>
                感知 → 推理 → 行动 → 观察
              </div>
              <PipelineDiagramWithFrame />
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={330} durationInFrames={60}>
        <Scene>
          <Act durationInFrames={60}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.inkSoft }}>数据说话</div>
              <StatRowWithFrame />
            </div>
          </Act>
        </Scene>
      </Sequence>

      <Sequence from={385} durationInFrames={65}>
        <Scene dark>
          <Act durationInFrames={65}>
            <TerminalCard
              width={760}
              lines={[
                { prompt: "$", text: "cat open-boss/README.md" },
                { text: "决定投不投的权限，始终留在人手里。" },
                { prompt: "$", text: "open github.com/yinren112/open-boss", accent: true },
              ]}
            />
          </Act>
        </Scene>
      </Sequence>
    </>
  );
};

const PipelineDiagramWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <PipelineDiagram
      frame={frame}
      startFrame={0}
      stages={[
        { title: "岗位抓取", mode: "自动", detail: "三账号并行，CDP连接真实Chrome窗口" },
        { title: "规则初筛", mode: "自动", detail: "通勤/班制/薪资下限过滤" },
        { title: "AI 精筛", mode: "半自动", detail: "Agent按Prompt手册终筛" },
        { title: "人工审核", mode: "人工", detail: "逐条确认后才投递" },
      ]}
    />
  );
};

const StatRowWithFrame: React.FC = () => {
  const frame = useCurrentFrame();
  return <StatRow frame={frame} startFrame={0} stats={["983 岗位处理", "回复率 75%", "三道安全闸门"]} />;
};
