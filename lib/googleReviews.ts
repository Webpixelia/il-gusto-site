import { fetchStrapiData } from './strapi';
import type { ContactInfo } from '@/types/strapi';
import type { GoogleReview } from '@/types/strapi';

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    // Récupération du place_id depuis Strapi
    const contactData = await fetchStrapiData<ContactInfo>('/contact-infos');
    const placeId = contactData.data[0]?.place_id_google;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!placeId) {
      console.warn("Aucun place_id Google configuré dans Strapi");
      return [];
    }

    if (!apiKey) {
      console.warn("Aucun apiKey Google configuré dans Strapi");
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