# remotion

15秒项目速览视频，四个案例各一条，跟网站首页 `app/globals.css` 用同一套设计 token（暖纸色背景、
terracotta强调色、终端深色场景、系统字体栈），复用了网站上 `Pipeline`/`LayerStack`/`Tag` 组件的
视觉规范，不是套一个通用宣传片模板硬嵌上去的。

## 本地开发

```bash
npm install
npm run studio          # Remotion Studio，实时预览
```

## 渲染

```bash
npm run render:open-boss
npm run render:bookworm
npm run render:learn
npm run render:xhs-scout
```

产物在 `out/`（不入 git），渲染完手动复制到 `../public/videos/` 并用 ffmpeg 抽一帧当
`poster`：

```bash
cp out/open-boss.mp4 ../public/videos/open-boss-promo.mp4
ffmpeg -y -i ../public/videos/open-boss-promo.mp4 -ss 1.5 -update 1 -frames:v 1 -q:v 3 \
  ../public/videos/posters/open-boss-poster.jpg
```

## 音频

`public/bgm.wav` 是 `scripts/gen-audio.js` 用纯数学合成出来的（不是外部素材，没有版权问题）：
低音pad + 稀疏五声音阶琶音 + 转场提示音 + 结尾和弦。改音乐直接改这个脚本重新跑：

```bash
node scripts/gen-audio.js
```

## 结构

- `src/theme.ts` — 颜色/字体/缓动，直接抄 `app/globals.css`
- `src/components/` — 共享视觉组件（Logo印章、终端窗口、Pipeline横排、LayerStack竖排、
  数字胶囊标签、氛围光斑、颗粒纹理），跟网站同名组件视觉一一对应
- `src/compositions/` — 四个项目各一个15秒脚本，统一的五幕结构：Logo → 问题陈述 →
  系统图 → 数据 → 终端收尾
