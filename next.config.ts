import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: process.env.NEXT_DEV_INDICATORS === 'false' ? false : undefined,
  async rewrites() {
    // Serve the Storybook static bundle (written to public/storybook/ by the
    // prebuild step) at /storybook. Next.js public-dir routing doesn't map
    // /storybook or /storybook/ to index.html on its own.
    return [
      { source: "/storybook", destination: "/storybook/index.html" },
      { source: "/storybook/", destination: "/storybook/index.html" },
    ]
  },
};

export default nextConfig;
