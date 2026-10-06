import type { NextConfig } from "next";

// GitHub Pages serves project sites from a sub-path (e.g. /kundeep-kitchen).
// The deploy workflow sets PAGES_BASE_PATH; locally it is empty.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML export — GitHub Pages can only serve files, not run a Node server.
  output: "export",
  basePath,
  // Emit /menu/index.html so /menu/ resolves on static hosting.
  trailingSlash: true,
  images: {
    // Pages can't run Next's image optimizer; this loader just adds the base path.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
