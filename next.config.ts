import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  compress: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
  /* 配置选项 */
  webpack: (config, { buildId, dev }) => {
    // 开启缓存
    config.cache = true;

    return config;
  },
};

export default nextConfig;
