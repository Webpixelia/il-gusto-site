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
  if (!imageUrl) return fallback;

  // Nettoyage de l'URL d'entrée
  // Si l'URL contient déjà le domaine complet Strapi, on le garde tel quel
  if (imageUrl.includes("media.strapiapp.com")) {
    return imageUrl.startsWith("https://") ? imageUrl : `https://${imageUrl}`;
  }

  // Si l'URL contient déjà le domaine strapiapp.com mais pas media.strapiapp.com
  if (imageUrl.includes("strapiapp.com")) {
    // On extrait la partie après strapiapp.com
    const parts = imageUrl.split("strapiapp.com");
    if (parts.length > 1) {
      return `https://${parts[0]}media.strapiapp.com${parts[1]}`;
    }
  }

  // Si l'URL commence par http, on la retourne telle quelle
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // Sinon, on construit l'URL avec la base
  return `${baseUrl}${imageUrl}`;
}