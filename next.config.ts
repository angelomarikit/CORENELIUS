import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    qualities: [75, 85],
  },
};

export default nextConfig;
