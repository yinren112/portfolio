// 静态导出后要同时部署在 Vercel 根路径和自建服务器的 /me/ 子路径下，
// 用这个 helper 统一处理资源路径前缀，避免两套构建到处手写 basePath。
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}
