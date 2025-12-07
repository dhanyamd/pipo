import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
        pathname: '/**',
      },
{
     protocol: 'https',
     hostname: 'ucarecdn.com',
     port: '',
     pathname: '/**',
},
{
     protocol: 'https',
     hostname: 'placehold.co',
     port: '',
     pathname: '/**',
},
{
     protocol: 'https',
     hostname: 'oaidalleapiprodscus.blob.core.windows.net',
     port: '',
     pathname: '/**',
},

    ]
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

};

export default nextConfig;
