import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "jolly-basketball-d4a28c8b08.strapiapp.com",
      "jolly-basketball-d4a28c8b08.media.strapiapp.com",
      "strapi-il-gusto.onrender.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.onrender.com',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;