import type { NextConfig } from "next";

// Toutes les images sont maintenant servies depuis /public (locales), plus
// besoin d'autoriser des domaines externes Strapi via images.domains /
// remotePatterns : la section `images` a été entièrement supprimée.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;