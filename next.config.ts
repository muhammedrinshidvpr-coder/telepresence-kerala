import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages serves the repo site under /<repo>; local + Vercel stay root.
  basePath: process.env.PAGES ? "/telepresence-kerala" : "",
  images: { unoptimized: true },
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
