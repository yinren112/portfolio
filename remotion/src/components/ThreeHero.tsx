import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { springSoft } from "../lib/motion";

// 一组悬浮的圆角块，代表"模块/数据块"，缓慢自转 + 呼吸浮动 + 相机推近轨道。
// 真实 three.js 渲染：圆角倒边 + 边缘光 + 雾化纵深，产品级质感。
const Blocks: React.FC<{ tint: [number, number, number]; dark: boolean }> = ({ tint, dark }) => {
  const frame = useCurrentFrame();

  const items = useMemo(
    () => [
      { pos: [0, 0, 0] as const, scale: 1.35, rot: 0.0, accent: true },
      { pos: [-2.3, 1.0, -1.4] as const, scale: 0.68, rot: 1.2, accent: false },
      { pos: [2.4, -0.8, -0.9] as const, scale: 0.82, rot: 2.1, accent: false },
      { pos: [1.7, 1.5, -2.4] as const, scale: 0.5, rot: 0.6, accent: true },
      { pos: [-2.0, -1.3, -1.8] as const, scale: 0.58, rot: 3.0, accent: false },
      { pos: [0.2, -2.0, -1.0] as const, scale: 0.44, rot: 1.7, accent: false },
    ],
    []
  );

  const paperCol = dark ? new THREE.Color(0.22, 0.225, 0.24) : new THREE.Color(0.95, 0.945, 0.93);
  const accentCol = new THREE.Color(tint[0], tint[1], tint[2]);

  return (
    <>
      <ambientLight intensity={dark ? 0.65 : 1.0} />
      <directionalLight position={[5, 7, 6]} intensity={dark ? 1.6 : 1.3} castShadow />
      {/* 边缘光：让暗块也有轮廓 */}
      <directionalLight position={[-6, -1, 3]} intensity={0.7} color={accentCol} />
      <directionalLight position={[0, -4, 5]} intensity={0.35} color={"#ffffff"} />
      <fog attach="fog" args={[dark ? "#17181a" : "#f4f3ef", 7, 15]} />
      {items.map((it, i) => {
        const float = Math.sin(frame * 0.03 + i * 1.3) * 0.2;
        const spin = frame * 0.006 + it.rot;
        return (
          <RoundedBox
            key={i}
            args={[1, 1, 1]}
            radius={0.12}
            smoothness={4}
            position={[it.pos[0], it.pos[1] + float, it.pos[2]]}
            rotation={[spin * 0.5, spin, spin * 0.2]}
            scale={it.scale}
          >
            <meshStandardMaterial
              color={it.accent ? accentCol : paperCol}
              roughness={it.accent ? 0.4 : 0.6}
              metalness={0.2}
            />
          </RoundedBox>
        );
      })}
    </>
  );
};

export const ThreeHero: React.FC<{ tint: [number, number, number]; dark?: boolean }> = ({
  tint,
  dark = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const push = springSoft(frame, 0);
  const z = 9.5 - push * 2.4;
  const orbit = Math.sin(frame * 0.008) * 0.7;
  const bob = Math.sin(frame * 0.012) * 0.25;

  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0 }}
      camera={{ fov: 42, position: [orbit, 0.3 + bob, z] }}
      gl={{ antialias: true }}
    >
      <Blocks tint={tint} dark={dark} />
    </ThreeCanvas>
  );
};
