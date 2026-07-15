// lib/maps.ts
//
// Reprend telles quelles les 2 fonctions utilitaires de lib/strapi.ts qui
// n'avaient déjà aucune dépendance à Strapi (pures fonctions de formatage
// d'URL). Elles remplacent les imports depuis "@/lib/strapi".

export const generateMapUrl = (lat: number, lng: number, address: string) => {
  const encodedAddress = encodeURIComponent(address.replace(/\n/g, ", "));
  return `https://maps.google.com/maps?q=${encodedAddress}%40${lat},${lng}&z=16&output=embed`;
};

export function generateDirectionsUrl(
  latitude: number,
  longitude: number,
  address: string
): string {
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}
