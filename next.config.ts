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
      {
        source: '/.source/:path*',
        destination: `${process.env.MINIO_PUBLIC_ENDPOINT || 'http://localhost:7000'}/${process.env.MINIO_BUCKET || 'rag-llm'}/.source/:path*`, // Proxy to External API
      },
      {
        source: '/whatsapp/:path*',
        destination: `${process.env.WHATSAPP_API_URL || 'http://localhost:30302'}/:path*`, // Proxy to External API
      },
      {
        source: '/aissistant/:path*',
        destination: `${process.env.AISSISTANT_API_URL || 'http://localhost:8080'}/api/v1/:path*`, // Proxy to External API
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
