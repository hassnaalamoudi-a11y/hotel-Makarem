import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "makaremhotels.com" },
      { protocol: "https", hostname: "edge.sitecorecloud.io" },
      { protocol: "https", hostname: "tbi-p-001.sitecorecontenthub.cloud" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
