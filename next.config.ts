import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Brand metadata fallbacks for shared OG/twitter generation later
  poweredByHeader: false,
  // YouTube thumbnails are served directly from i.ytimg.com — whitelist
  // them for next/image so we don't pay the cost of duplicating thumbnails
  // in our own /public folder.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
