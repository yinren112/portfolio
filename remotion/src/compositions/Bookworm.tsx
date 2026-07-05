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

export const Bookworm: React.FC = () => (
  <PromoShell dark seed={23}>
    <Audio src={staticFile("bgm.wav")} />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <HeroAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />
      <TransitionSeries.Sequence durationInFrames={96}>
        <HighlightAct />
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
          <div style={{ fontFamily: fonts.sans, fontSize: 82, fontWeight: 700, color: colors.terminalText, letterSpacing: "-0.02em" }}>
            Bookworm
          </div>
        </MaskReveal>
        <BlurWords from={34}>
          <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkFaint }}>
            校园学习小程序 · 生产环境运行中
          </div>
        </BlurWords>
      </div>
    </Center>
    <LightSweep start={40} duration={30} />
  </AbsoluteFill>
);

const HighlightAct: React.FC = () => (
  <Center>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <BlurWords from={4}>
        <div style={{ fontFamily: fonts.sans, fontSize: 34, color: colors.inkFaint }}>一个人从 0 做到上线</div>
      </BlurWords>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <Counter to={10} from={14} color={colors.accent} size={150} />
        <span style={{ fontFamily: fonts.mono, fontSize: 66, fontWeight: 700, color: colors.accent }}>个月持续维护</span>
      </div>
      <KineticChars text="带真实微信支付，一天没断过" from={40} style={{ fontFamily: fonts.sans, fontSize: 26, color: colors.inkSoft }} />
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
          全栈架构 · 一人从前端到支付
        </div>
        <LayerFlow
          from={20}
          dark
          width={780}
          layers={[
            { title: "微信小程序原生框架" },
            { title: "Nginx 反向代理" },
            { title: "Fastify + TypeScript", detail: "限流 · 校验 · 结构化日志" },
            { title: "PostgreSQL + Prisma", detail: "34 个数据模型 · advisory lock 防超卖" },
            { title: "微信支付 v3", accent: true, detail: "Webhook 防重放 + 主动查单" },
          ]}
        />
      </div>
    </Center>
  );
};

const DataAct: React.FC = () => (
  <Center>
    <StatTrio
      dark
      items={[
        { value: 426, label: "次提交", suffix: "" },
        { value: 34, label: "个数据模型", suffix: "" },
        { value: 3, label: "条 CI 流水线", suffix: "" },
      ]}
    />
  </Center>
);

const OutroAct: React.FC = () => (
  <Center>
    <TerminalOutro
      from={6}
      lines={[
        { prompt: "$", text: "git log --oneline | wc -l", typeFrom: 12 },
        { text: "426", typeFrom: 44 },
        { prompt: "$", text: "echo 一个人 · 10个月 · 生产环境运行中", accent: true, typeFrom: 54 },
      ]}
    />
  </Center>
);
