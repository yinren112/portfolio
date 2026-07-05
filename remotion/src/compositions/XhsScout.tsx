import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PromoShell } from "../components/PromoShell";
import { ThreeHero } from "../components/ThreeHero";
import { KineticChars, MaskReveal, BlurWords } from "../components/KineticText";
import { LayerFlow } from "../components/LayerFlow";
import { Counter } from "../components/Counter";
import { StatTrio } from "../components/StatTrio";
import { TerminalOutro } from "../components/TerminalOutro";
import { LightSweep } from "../components/Cinematic";
import { Center } from "../components/Center";
import { scaleThrough, softSlide } from "../lib/transitions";
import { colors, fonts, rgb } from "../theme";
import { springIn, ramp } from "../lib/motion";

export const XhsScout: React.FC = () => (
  <PromoShell dark seed={59}>
    <Audio src={staticFile("bgm.wav")} />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <HeroAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />
      <TransitionSeries.Sequence durationInFrames={96}>
        <ProblemAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={softSlide("up")} timing={linearTiming({ durationInFrames: 16 })} />
      <TransitionSeries.Sequence durationInFrames={156}>
        <SystemAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 16 })} />
      <TransitionSeries.Sequence durationInFrames={84}>
        <DataAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />
      <TransitionSeries.Sequence durationInFrames={90}>
        <OutroAct />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </PromoShell>
);

const HeroAct: React.FC = () => (
  <AbsoluteFill>
    <ThreeHero tint={rgb.accent} dark />
    <Center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: 40 }}>
        <MaskReveal from={18}>
          <div style={{ fontFamily: fonts.sans, fontSize: 70, fontWeight: 700, color: colors.terminalText, letterSpacing: "-0.02em" }}>
            xhs-rental-scout
          </div>
        </MaskReveal>
        <BlurWords from={34}>
          <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkFaint }}>
            Agent 原生设计的房源筛选系统
          </div>
        </BlurWords>
      </div>
    </Center>
    <LightSweep start={40} duration={30} />
  </AbsoluteFill>
);

const ProblemAct: React.FC = () => (
  <Center>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <BlurWords from={4}>
        <div style={{ fontFamily: fonts.sans, fontSize: 34, color: colors.inkFaint }}>在小红书上搜房源，翻十条</div>
      </BlurWords>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <Counter to={8} from={14} color={colors.accent} size={150} />
        <span style={{ fontFamily: fonts.mono, fontSize: 66, fontWeight: 700, color: colors.accent }}>条是中介</span>
      </div>
      <KineticChars text="判断逻辑可以写成规则，不必每次靠肉眼看" from={40} style={{ fontFamily: fonts.sans, fontSize: 26, color: colors.inkSoft }} />
    </div>
  </Center>
);

const SystemAct: React.FC = () => {
  const frame = useCurrentFrame();
  const s = springIn(frame, 4);
  return (
    <Center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, width: "100%" }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 40, fontWeight: 700, color: colors.terminalText, opacity: ramp(frame, 4, 14), transform: `translateY(${(1 - s) * 20}px)` }}>
          感知 <Arrow /> 推理 <Arrow /> 行动 <Arrow /> 观察
        </div>
        <LayerFlow
          from={20}
          dark
          width={760}
          layers={[
            { title: "xhs 命令行工具", detail: "外部子进程 · 负责搜索/读取" },
            { title: "pipeline.py", detail: "编排 init/search/read/report" },
            { title: "rules.py", accent: true, detail: "纯函数规则引擎 · 价格提取含暗语" },
            { title: "本地文件", detail: "黑白名单库 · 跨轮次证据累积" },
          ]}
        />
      </div>
    </Center>
  );
};

const Arrow: React.FC = () => <span style={{ color: colors.accent, margin: "0 10px", fontWeight: 400 }}>→</span>;

const DataAct: React.FC = () => (
  <Center>
    <StatTrio
      dark
      items={[
        { value: 29, label: "轮检索", suffix: "" },
        { value: 211, label: "个账号画像", suffix: "" },
        { value: 115, label: "个职业号拉黑", suffix: "" },
      ]}
    />
  </Center>
);

const OutroAct: React.FC = () => (
  <Center>
    <TerminalOutro
      from={6}
      lines={[
        { prompt: "$", text: "cat data/results/R29.md", typeFrom: 12 },
        { text: "靠它筛出真实房东候选，租到了房子", typeFrom: 40 },
        { prompt: "$", text: "open github.com/yinren112/xhs-rental-scout", accent: true, typeFrom: 54 },
      ]}
    />
  </Center>
);
