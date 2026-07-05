import { withBase } from "@/lib/paths";

// 15秒项目速览：跟网站同一套设计语言渲染出来的 Remotion 视频，不是外部素材硬嵌
export default function PromoVideo({ src, poster }: { src: string; poster: string }) {
  return (
    <video
      controls
      preload="metadata"
      poster={withBase(poster)}
      className="w-full rounded-xl border border-border"
      src={withBase(src)}
    />
  );
}
