import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
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
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
