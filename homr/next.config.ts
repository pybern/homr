import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['super-duper-broccoli-5r756j9vxvcw57-3000.app.github.dev', 'localhost:3000'],
    },
  },
};

export default nextConfig;
