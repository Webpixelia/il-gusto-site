import { contact } from "@/data/contact";

export async function getGoogleReviews(): Promise<any[]> {
  try {
    const placeId = contact.localisation.googlePlaceId;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!placeId) {
      console.warn("Aucun place_id Google configuré");
      return [];
    }

    if (!apiKey) {
      console.warn("Aucun apiKey Google configuré");
      return [];
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?` +
      `place_id=${placeId}&fields=reviews&key=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache de 1 heure
    );

    const data = await response.json();
    
    return data.result?.reviews?.slice(0, 3) || []; // Retourne max 3 avis
  } catch (error) {
    console.error("Erreur lors de la récupération des avis Google:", error);
    return [];
  }
}