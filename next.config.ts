import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { buildId, dev }) => {
    // 开启缓存
    config.cache = true;

    return config;
  }
};

export default nextConfig;
