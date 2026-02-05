import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    qualities: [50, 60, 75, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "stagingctspr.axesawebhosting9.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blog.ctspr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "blogctspr.axesawebhosting.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
