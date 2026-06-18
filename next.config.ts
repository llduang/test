import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出，便于部署到 Cloudflare Pages
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // 静态导出必须关闭图片优化
    unoptimized: true,
  },
};

export default nextConfig;
