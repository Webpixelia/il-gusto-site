import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["localhost", "jolly-basketball-d4a28c8b08.strapiapp.com"], // Ajout du domaine Strapi Cloud
  },
};

export default nextConfig;