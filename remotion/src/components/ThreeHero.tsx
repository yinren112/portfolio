import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { springSoft } from "../lib/motion";

// 一组悬浮的圆角块，代表"模块/数据块"，缓慢自转 + 呼吸浮动 + 推近。
// 关键：所有运动都通过物体自身的 position/rotation（由 useCurrentFrame 驱动）来做，
// 相机保持静止 —— 每帧改 camera prop 会让 R3F 在 Remotion 里抖动（鬼畜抽动）。
// 推近效果改成移动整个 group 的 z，视觉等价但走的是"物体变换"这条稳定路径。
const ITEMS = [
  { pos: [0, 0, 0] as const, scale: 1.35, rot: 0.0, accent: true },
  { pos: [-2.3, 1.0, -1.4] as const, scale: 0.68, rot: 1.2, accent: false },
  { pos: [2.4, -0.8, -0.9] as const, scale: 0.82, rot: 2.1, accent: false },
  { pos: [1.7, 1.5, -2.4] as const, scale: 0.5, rot: 0.6, accent: true },
  { pos: [-2.0, -1.3, -1.8] as const, scale: 0.58, rot: 3.0, accent: false },
  { pos: [0.2, -2.0, -1.0] as const, scale: 0.44, rot: 1.7, accent: false },
];

const Blocks: React.FC<{ tint: [number, number, number]; dark: boolean }> = ({ tint, dark }) => {
  const frame = useCurrentFrame();

  // 颜色只算一次，避免每帧 new THREE.Color 造成材质抖动
  const paperCol = useMemo(
    () => (dark ? new THREE.Color(0.22, 0.225, 0.24) : new THREE.Color(0.95, 0.945, 0.93)),
    [dark]
  );
  const accentCol = useMemo(() => new THREE.Color(tint[0], tint[1], tint[2]), [tint]);

  // 用 group 做推近 + 极轻的轨道摆动（都由 frame 决定，纯函数，输出必然平滑）
  const push = springSoft(frame, 0);
  const dollyZ = -2.4 + push * 2.4;
  const yaw = Math.sin(frame * 0.008) * 0.06;
  const bob = Math.sin(frame * 0.012) * 0.15;

  return (
    <group position={[0, bob, dollyZ]} rotation={[0, yaw, 0]}>
      <ambientLight intensity={dark ? 0.65 : 1.0} />
      <directionalLight position={[5, 7, 6]} intensity={dark ? 1.6 : 1.3} />
      <directionalLight position={[-6, -1, 3]} intensity={0.7} color={accentCol} />
      <directionalLight position={[0, -4, 5]} intensity={0.35} color={"#ffffff"} />
      <fog attach="fog" args={[dark ? "#17181a" : "#f4f3ef", 7, 15]} />
      {ITEMS.map((it, i) => {
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
    </group>
  );
};

export const ThreeHero: React.FC<{ tint: [number, number, number]; dark?: boolean }> = ({
  tint,
  dark = false,
}) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0 }}
      camera={{ fov: 42, position: [0, 0.3, 9.5] }}
      gl={{ antialias: true }}
    >
      <Blocks tint={tint} dark={dark} />
    </ThreeCanvas>
  );
};
