import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// La fonction buildImageUrl() a été supprimée : elle ne servait qu'à
// résoudre les URLs d'images Strapi (media.strapiapp.com...). Toutes les
// images pointent maintenant directement vers /public/images/..., plus
// besoin de résolution d'URL.
