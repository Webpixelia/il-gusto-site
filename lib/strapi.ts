// lib/strapi.ts
import type { Category, Plat, StrapiResponse, CategorieGalerie, GalerieImage, FaqItem, Menu, Page } from '@/types/strapi';
import { buildImageUrl } from './utils';

export async function fetchStrapiData<T>(
    endpoint: string, 
    populate?: string
  ): Promise<StrapiResponse<T>> {
    const baseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
    const url = `${baseUrl}/api${endpoint}${populate ? `?${populate}` : ''}`;
    
    const res = await fetch(url, {
      next: { revalidate: 60 } // Revalidation toutes les heures 3600
    });
  
    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
  
    const data = await res.json();
    
    return data;
}

// Fonctions spécifiques
export async function getAllCategories(): Promise<Category[]> {
    /*const res = await fetchStrapiData<Category>(
        '/categories', 
        'populate=*&sort=createdAt:asc');
    return res.data;*/
    const res = await fetchStrapiData<Category>(
        '/categories', 
        'populate=*&sort=createdAt:asc'
    );
    
    return res.data?.map((category: any) => ({
        //id: category.id,
        ...category,
        //Image: category.Image || null,
        /*supplements: {
            data: category.supplements?.map((sup: any) => ({
                id: sup.id,
                attributes: sup
            })) || []
        }*/
    })) || [];
}

export async function orgetPlatsByCategorySlug(slug: string) {
    const response = await fetch(`${process.env.STRAPI_API_URL}/api/plats?filters[categorie][Slug][$eq]=${slug}`);
    const data = await response.json();
    return data.data || [];
}
export async function getPlatsByCategorySlug(slug: string): Promise<Plat[]> {
    const res = await fetchStrapiData<Plat>(
    '/plats',
    `filters[categorie][Slug][$eq]=${slug}&sort=createdAt:desc`
    );
    return res.data || [];
  }

export async function getFeaturedCategoriesWithPlats() {
    try {
      const apiUrl = `${process.env.STRAPI_API_URL}/api/categories?filters[Featured][$eq]=true&populate[Plats][sort][0]=createdAt:desc`;
      const res = await fetch(apiUrl);
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const { data } = await res.json();
  
      return data?.map((category: any) => ({
        id: category.id,
        Nom: category.Nom || 'Nom manquant',
        Slug: category.Slug || '',
        Description: category.Description || '',
        Featured: category.Featured || false,
        plats: {
          data: (category.Plats || []).slice(0, 4).map((plat: any) => ({
            id: plat.id,
            Nom: plat.Nom,
            Prix: plat.Prix,
            Description: plat.Description,
            Base: plat.Base
          }))
        }
      })) || [];
  
    } catch (error) {
      console.error("Fetch error:", error);
      return [];
    }
}

export async function getGalerieCategories(): Promise<CategorieGalerie[]> {
    const res = await fetchStrapiData<CategorieGalerie>(
        '/categorie-galeries',
        'populate[galeries][populate][Image][fields][0]=url&populate[galeries][populate][Image][fields][1]=alternativeText&populate[galeries][populate][Image][fields][2]=width&populate[galeries][populate][Image][fields][3]=height&sort=createdAt:asc'
    );
    return res.data;
}
  
export async function getAllGalerieImages(): Promise<GalerieImage[]> {
    const res = await fetchStrapiData<GalerieImage>(
        '/galeries',
        'populate[Image][fields][0]=url&populate[Image][fields][1]=alternativeText&populate[Image][fields][2]=width&populate[Image][fields][3]=height&populate[categorie_galerie][fields][0]=Nom&populate[categorie_galerie][fields][1]=Slug&sort=createdAt:asc'
    );
    return res.data;
}

export async function getGalerieData() {
    try {
      // Utilisez la requête qui fonctionne avec populate[galeries]
      const res = await fetchStrapiData<CategorieGalerie>(
        '/categorie-galeries',
        //'populate[galeries][populate][Image][fields][0]=url&populate[galeries][populate][Image][fields][1]=alternativeText&populate[galeries][populate][Image][fields][2]=width&populate[galeries][populate][Image][fields][3]=height&sort=createdAt:asc',
        'populate[galeries][populate][Image][fields][0]=url&populate[galeries][populate][Image][fields][1]=alternativeText&populate[galeries][populate][Image][fields][2]=width&populate[galeries][populate][Image][fields][3]=height&populate[galeries][fields][0]=Featured&populate[galeries][fields][1]=Nom&sort=createdAt:asc'
      );
  
      if (!res.data) return [];
  
      // Transformation des données
      const baseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
      return res.data.map(category => ({
        id: category.id,
        name: category.Nom,
        slug: category.Slug,
        images: (category.galeries || []).map(galerie => ({
          src: buildImageUrl(galerie.Image.url, baseUrl),
          alt: galerie.Image.alternativeText || galerie.Nom,
          width: galerie.Image.width,
          height: galerie.Image.height,
          featured: galerie.Featured || false
        }))
      }));
  
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      return [];
    }
}

export const generateMapUrl = (lat: number, lng: number, address: string) => {
    const encodedAddress = encodeURIComponent(address.replace(/\n/g, ', '));
    return `https://maps.google.com/maps?q=${encodedAddress}%40${lat},${lng}&z=16&output=embed`;
};

export async function getFaqs(): Promise<FaqItem[]> {
    const res = await fetchStrapiData<FaqItem>(
      '/faqs',
      'sort=createdAt:asc'
    );
    return res.data;
}

export async function getMenuBySlug(slug: string): Promise<Menu> {
    const res = await fetchStrapiData<Menu>(
        '/menus',
        `filters[Slug][$eq]=${slug}&populate=menuItem`
      );
      return res.data[0] || null;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
    try {        
        if (!slug) {
          console.error('Slug is undefined or empty in getPageBySlug');
          return null;
        }
        
        const response = await fetchStrapiData<Page>(
            '/pages',
            `filters[Slug][$eq]=${slug}&populate[SEO][populate]=true&populate[ImgHero][populate]=true`
        );
                
        if (!response.data || response.data.length === 0) {
            console.warn(`No page found with slug: ${slug}`);
            return null;
        }
        
        return response.data[0];
    } catch (error) {
        console.error('Error fetching page:', error);
        return null;
    }
}

export function generateDirectionsUrl(latitude: number, longitude: number, address: string): string {
  // Vérification des coordonnées
  if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
    // Fallback: utiliser juste l'adresse si les coordonnées ne sont pas valides
    return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  }
  
  // Création de l'URL Google Maps avec les coordonnées
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}