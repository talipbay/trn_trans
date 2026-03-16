import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  basePath: process.env.GITHUB_ACTIONS ? "/trn_trans" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
