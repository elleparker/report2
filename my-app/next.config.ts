import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Comment out export config for dev mode to avoid ENOENT errors
  // output: 'export',
  // trailingSlash: true,
  // distDir: 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
