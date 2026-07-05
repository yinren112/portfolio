# remotion

四个项目各一条 15 秒的高质感宣传片，用网站自己的设计 token 渲染（暖 terracotta 强调色、
终端深色、系统字体栈），不是套通用模板。full HD 1920×1080 输出。

## 为什么看起来是"设计过的"

不是"一点字配卡片、几个画面过一遍"，而是一整套动效系统：

- **真实 3D**（`@remotion/three` + R3F）：开场悬浮的圆角块阵列，边缘光 + 雾化纵深 + 相机推近轨道，
  产品级质感（`ThreeHero.tsx`）
- **活的背景**：极光色斑低频漂移 + 视差浮尘粒子，全片持续流动不静止
  （`AuroraBackground.tsx` / `ParticleField.tsx`），转场时不重置——氛围层贴在 `PromoShell` 里贯穿
- **动态排版**：逐字弹入、遮罩上推、模糊消散、弹簧过冲（`KineticText.tsx`）
- **数据在动**：数字弹簧滚动计数（`Counter.tsx` / `StatTrio.tsx`）；流水线里一个发光包裹沿连线
  穿过各阶段、经过时点亮该阶段（`PipelineFlow.tsx`）；架构层有数据脉冲自上而下穿过（`LayerFlow.tsx`）
- **电影感转场**：缩放穿越（放大+模糊+淡出）、方向推移，不是硬切（`lib/transitions.ts`）
- **电影级叠加**：动态颗粒、暗角、高光扫过、转场色差脉冲（`Cinematic.tsx`）
- **弹簧物理**：所有进场都走 spring，不是线性（`lib/motion.ts`）

每条片子五幕：3D 开场 → 问题/亮点大数字 → 系统架构流动图 → 数据滚动 → 终端收尾（打字机 + 光标）。

## 本地开发

```bash
npm install
npm run studio          # Remotion Studio 实时预览
```

## 渲染

```bash
npm run render:all      # 四条一起
# 或单条 npm run render:open-boss / :bookworm / :learn / :xhs-scout
```

产物在 `out/`（不入 git）。渲染完复制到 `../public/videos/`，并抽一帧当 poster（约 2.3s，3D 开场帧）：

```bash
cp out/open-boss.mp4 ../public/videos/open-boss-promo.mp4
ffmpeg -y -i ../public/videos/open-boss-promo.mp4 -ss 2.3 -update 1 -frames:v 1 -q:v 3 \
  ../public/videos/posters/open-boss-poster.jpg
```

## 音频

`public/bgm.wav` 由 `scripts/gen-audio.js` 纯数学合成（无版权/API 依赖）。改音乐改脚本重跑：

```bash
node scripts/gen-audio.js
```

## 依赖注意

`three` / `@react-three/fiber` 用 v8（配 React 18）；`@remotion/*` 全部锁定 4.0.469 与核心版本对齐。
根项目 `tsconfig.json` 把 `remotion/` 排除在 Next 编译外——这是独立子工程，各自 `node_modules`。
