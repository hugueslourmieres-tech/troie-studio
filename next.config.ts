import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Brand metadata fallbacks for shared OG/twitter generation later
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);
