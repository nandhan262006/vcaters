import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/home/leki/PROJECTS/caterers",
  },
  images: {
    remotePatterns: [
      new URL("https://talasilacaterers.com/wp-content/uploads/2024/09/**"),
    ],
  },
};

export default nextConfig;
