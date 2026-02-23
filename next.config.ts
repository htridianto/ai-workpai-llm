import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@libsql/client', '@prisma/adapter-libsql'],
  experimental: {    
    // serverComponentsExternalPackages: ['@libsql/client', '@prisma/adapter-libsql'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/dashboard',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
