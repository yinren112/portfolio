import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { PromoShell } from "../components/PromoShell";
import { ThreeHero } from "../components/ThreeHero";
import { KineticChars, MaskReveal, BlurWords } from "../components/KineticText";
import { LayerFlow } from "../components/LayerFlow";
import { StatTrio } from "../components/StatTrio";
import { TerminalOutro } from "../components/TerminalOutro";
import { LightSweep } from "../components/Cinematic";
import { Center } from "../components/Center";
import { scaleThrough, softSlide } from "../lib/transitions";
import { colors, fonts, rgb } from "../theme";
import { springIn, ramp } from "../lib/motion";

export const Learn: React.FC = () => (
  <PromoShell dark seed={41}>
    <Audio src={staticFile("bgm.wav")} />
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <HeroAct />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={scaleThrough()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />
      <TransitionSeries.Sequence durationInFrames={96}>
        <TransformAct />
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
          <div style={{ fontFamily: fonts.sans, fontSize: 78, fontWeight: 700, color: colors.terminalText, letterSpacing: "-0.02em" }}>
            零基础学 AI
          </div>
        </MaskReveal>
        <BlurWords from={34}>
          <div style={{ fontFamily: fonts.sans, fontSize: 30, color: colors.inkFaint }}>
            从私人学习工具到公开上线的网站
          </div>
        </BlurWords>
      </div>
    </Center>
    <LightSweep start={40} duration={30} />
  </AbsoluteFill>
);

const TransformAct: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = springIn(frame, 30);
  return (
    <Center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
          <BlurWords from={6}>
            <div style={{ fontFamily: fonts.mono, fontSize: 40, color: colors.inkFaint }}>私人命令行工具</div>
          </BlurWords>
          <div style={{ fontFamily: fonts.sans, fontSize: 52, color: colors.accent, opacity: ramp(frame, 30, 40), transform: `scale(${0.5 + arrow * 0.5})` }}>→</div>
          <BlurWords from={44}>
            <div style={{ fontFamily: fonts.mono, fontSize: 46, fontWeight: 700, color: colors.terminalText }}>公开网站</div>
          </BlurWords>
        </div>
        <KineticChars
          text="验证有效后写了完整改造计划，换一套全新密钥"
          from={58}
          style={{ fontFamily: fonts.sans, fontSize: 25, color: colors.inkSoft }}
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, width: "100%" }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 40, fontWeight: 700, color: colors.terminalText, opacity: ramp(frame, 4, 14), transform: `translateY(${(1 - s) * 20}px)` }}>
          系统怎么跑
        </div>
        <LayerFlow
          from={20}
          dark
          width={760}
          layers={[
            { title: "Nginx", detail: "复用官网现有 HTTPS 证书" },
            { title: "Go 标准库 HTTP 服务", detail: "学习码鉴权 · 安全会话 · 日志脱敏" },
            { title: "SQLite", detail: "无 CGO 驱动 · 容器构建简单" },
            { title: "DeepSeek API", accent: true, detail: "密钥未配置时自动降级为规则自评" },
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
        { value: 40, label: "课", suffix: "" },
        { value: 96, label: "道题", suffix: "" },
        { value: 100, label: "%线上运行", prefix: "", suffix: "" },
      ]}
    />
  </Center>
);

const OutroAct: React.FC = () => (
  <Center>
    <TerminalOutro
      from={6}
      lines={[
        { prompt: "$", text: "open lailinkeji.com/learn/", typeFrom: 12 },
        { text: "40 课 · 96 题 · 线上运行中", typeFrom: 42 },
        { prompt: "$", text: "echo 任何人都可以去学、去挑错", accent: true, typeFrom: 54 },
      ]}
    />
  </Center>
);
