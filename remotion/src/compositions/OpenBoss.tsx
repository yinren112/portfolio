import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PromoShell } from "../components/PromoShell";
import { ThreeHero } from "../components/ThreeHero";
import { KineticChars, MaskReveal, BlurWords } from "../components/KineticText";
import { PipelineFlow } from "../components/PipelineFlow";
import { Counter } from "../components/Counter";
import { StatTrio } from "../components/StatTrio";
import { TerminalOutro } from "../components/TerminalOutro";
import { LightSweep } from "../components/Cinematic";
import { Center } from "../components/Center";
import { scaleThrough, softSlide } from "../lib/transitions";
import { colors, fonts, rgb } from "../theme";
import { springIn, ramp } from "../lib/motion";

export const OpenBoss: React.FC = () => (
  <PromoShell dark seed={11}>
    <Audio src={staticFile("bgm.wav")} />
    <TransitionSeries>
      {/* 幕1：3D 悬浮块 + 标题 */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <HeroAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />

      {/* 幕2：问题陈述 + 大数字 */}
      <TransitionSeries.Sequence durationInFrames={96}>
        <ProblemAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={softSlide("up")} timing={linearTiming({ durationInFrames: 16 })} />

      {/* 幕3：流水线系统图（核心） */}
      <TransitionSeries.Sequence durationInFrames={156}>
        <SystemAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 16 })} />

      {/* 幕4：数据 */}
      <TransitionSeries.Sequence durationInFrames={84}>
        <DataAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />

      {/* 幕5：终端收尾 */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <OutroAct />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </PromoShell>
);

const HeroAct: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ThreeHero tint={rgb.accent} dark />
      <Center>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: 40 }}>
          <MaskReveal from={18} style={{ marginBottom: 4 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 82, fontWeight: 700, color: colors.terminalText, letterSpacing: "-0.02em" }}>
              open-boss
            </div>
          </MaskReveal>
          <BlurWords from={34}>
            <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkFaint }}>
              Agent 原生设计的招聘信息处理系统
            </div>
          </BlurWords>
        </div>
      </Center>
      <LightSweep start={40} duration={30} />
    </AbsoluteFill>
  );
};

const ProblemAct: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <BlurWords from={4}>
          <div style={{ fontFamily: fonts.sans, fontSize: 34, color: colors.inkFaint, textAlign: "center" }}>
            每天两个多小时滚岗位、判断靠不靠谱
          </div>
        </BlurWords>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <Counter to={90} from={14} color={colors.accent} size={150} />
          <span style={{ fontFamily: fonts.mono, fontSize: 66, fontWeight: 700, color: colors.accent }}>分钟/天</span>
        </div>
        <KineticChars
          text="流程机械、标准固定的部分，交给程序"
          from={40}
          style={{ fontFamily: fonts.sans, fontSize: 26, color: colors.inkSoft }}
        />
      </div>
    </Center>
  );
};

const SystemAct: React.FC = () => {
  const frame = useCurrentFrame();
  const s = springIn(frame, 4);
  return (
    <Center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 46, width: "100%" }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 40,
            fontWeight: 700,
            color: colors.terminalText,
            opacity: ramp(frame, 4, 14),
            transform: `translateY(${(1 - s) * 20}px)`,
          }}
        >
          感知 <Arrow /> 推理 <Arrow /> 行动 <Arrow /> 观察
        </div>
        <PipelineFlow
          from={20}
          dark
          stages={[
            { title: "岗位抓取", mode: "自动", detail: "三账号并行 · CDP连真实Chrome" },
            { title: "规则初筛", mode: "自动", detail: "通勤 / 班制 / 薪资下限" },
            { title: "AI 精筛", mode: "半自动", detail: "Agent 按 Prompt 手册终筛" },
            { title: "人工审核", mode: "人工", detail: "逐条确认后才投递" },
          ]}
        />
      </div>
    </Center>
  );
};

const Arrow: React.FC = () => (
  <span style={{ color: colors.accent, margin: "0 10px", fontWeight: 400 }}>→</span>
);

const DataAct: React.FC = () => (
  <Center>
    <StatTrio
      dark
      items={[
        { value: 983, label: "岗位处理量", suffix: "" },
        { value: 75, label: "投递线回复率", suffix: "%" },
        { value: 3, label: "道安全闸门", suffix: "" },
      ]}
    />
  </Center>
);

const OutroAct: React.FC = () => (
  <Center>
    <TerminalOutro
      from={6}
      lines={[
        { prompt: "$", text: "cat open-boss/README.md", typeFrom: 12 },
        { text: "决定投不投的权限，始终留在人手里。", typeFrom: 40 },
        { prompt: "$", text: "open github.com/yinren112/open-boss", accent: true, typeFrom: 54 },
      ]}
    />
  </Center>
);
