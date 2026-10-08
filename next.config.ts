import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // app/global-not-found.tsx: 404 page for unmatched URLs (one root layout per language)
    globalNotFound: true,
  },
  allowedDevOrigins: ['192.168.1.17', '192.168.111.5', '192.168.111.10'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
