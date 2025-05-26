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
  return imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`
}