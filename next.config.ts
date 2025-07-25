import type { NextConfig } from "next";

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

export default nextConfig;
