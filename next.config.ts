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
  async redirects() {
    // The layout shells moved from /docs/patterns/* to their own
    // /docs/layouts/* section. Keep old links working.
    return [
      {
        source: "/docs/patterns/app-shell",
        destination: "/docs/layouts/app-shell",
        permanent: true,
      },
      {
        source: "/docs/patterns/auth-shell",
        destination: "/docs/layouts/auth-shell",
        permanent: true,
      },
      {
        source: "/docs/patterns/page-layout",
        destination: "/docs/layouts/page-layout",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
