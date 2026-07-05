// 生成一段15秒、克制温暖的环境音床 -> public/bgm.wav
// 跟网站气质对齐：不是"电子节拍"的宣传片配乐，是柔和pad+稀疏木琴音的安静衬底，
// 只在每个转场点给一个很轻的提示音，结尾一个温和的收尾铃声。
'use strict';
const fs = require('fs');
const path = require('path');

const SR = 44100;
const DUR = 15;
const N = SR * DUR;
const buf = new Float32Array(N);
const TAU = Math.PI * 2;

function addTone(start, dur, freq, amp, attack, release) {
  const s0 = Math.floor(start * SR);
  const s1 = Math.min(N, Math.floor((start + dur) * SR));
  for (let i = s0; i < s1; i++) {
    const t = (i - s0) / SR;
    const atk = Math.min(1, t / attack);
    const rel = Math.exp(-t / release);
    buf[i] += Math.sin(TAU * freq * t) * amp * atk * rel;
  }
}

// 低音 pad：贯穿全片，非常轻的呼吸感颤音，音量克制
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const trem = 0.88 + 0.12 * Math.sin(TAU * 0.18 * t);
  buf[i] += Math.sin(TAU * 98 * t) * 0.035 * trem;
  buf[i] += Math.sin(TAU * 147 * t) * 0.018 * trem;
}

// 稀疏木琴音（五声音阶，C大调五声：C D E G A），每1.1s一个音，比原来慢很多，不抢戏
const scale = [261.63, 293.66, 329.63, 392.0, 440.0];
let noteIndex = 0;
for (let t = 1.0; t < DUR - 1.5; t += 1.1) {
  addTone(t, 1.6, scale[noteIndex % scale.length], 0.05, 0.02, 0.9);
  noteIndex++;
}

// 转场提示音：对应 Sequence 切换点 (2.17s / 5.5s / 11s / 13s)，极轻的高频"滴"
[2.17, 5.5, 11.0].forEach((t) => addTone(t, 0.3, 1046.5, 0.025, 0.005, 0.15));

// 结尾收尾：13s 处一个温和的三音和弦，收在CTA上
[523.25, 659.25, 783.99].forEach((f) => addTone(13.0, 2.6, f, 0.05, 0.15, 1.3));

// master 淡入淡出，防止削波
for (let i = 0; i < N; i++) {
  const t = i / SR;
  let g = 1;
  if (t < 0.6) g = t / 0.6;
  if (t > DUR - 1.2) g = Math.max(0, (DUR - t) / 1.2);
  buf[i] *= g;
}
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(buf[i]));
const norm = peak > 0 ? Math.min(1, 0.72 / peak) : 1;

// 写 16-bit PCM WAV
const bytesPerSample = 2;
const dataSize = N * bytesPerSample;
const header = Buffer.alloc(44);
header.write('RIFF', 0);
header.writeUInt32LE(36 + dataSize, 4);
header.write('WAVE', 8);
header.write('fmt ', 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(1, 22);
header.writeUInt32LE(SR, 24);
header.writeUInt32LE(SR * bytesPerSample, 28);
header.writeUInt16LE(bytesPerSample, 32);
header.writeUInt16LE(16, 34);
header.write('data', 36);
header.writeUInt32LE(dataSize, 40);

const data = Buffer.alloc(dataSize);
for (let i = 0; i < N; i++) {
  const s = Math.max(-1, Math.min(1, buf[i] * norm));
  data.writeInt16LE(Math.round(s * 32767), i * 2);
}

const outDir = path.join(__dirname, '..', 'public');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'bgm.wav'), Buffer.concat([header, data]));
console.log('wrote public/bgm.wav');
