import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: process.env.NEXT_DEV_INDICATORS === 'false' ? false : undefined,
};

export default nextConfig;
