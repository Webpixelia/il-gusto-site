import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Fonction utilitaire pour construire les URLs d'images Strapi
export function buildImageUrl(
  imageUrl: string | undefined,
  baseUrl: string,
  fallback = "/images/placeholder.svg",
): string {
  if (!imageUrl) return fallback

  // Si l'URL contient déjà un domaine (http/https), l'utiliser directement
  if (imageUrl.startsWith("http")) {
    return imageUrl
  }

  // Si l'URL contient déjà le domaine Strapi, l'utiliser directement
  if (imageUrl.includes("strapiapp.com")) {
    return imageUrl.startsWith("https://") ? imageUrl : `https://${imageUrl}`
  }

  // Sinon, construire l'URL avec la base
  return `${baseUrl}${imageUrl}`
}