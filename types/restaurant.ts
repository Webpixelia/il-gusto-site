// types/restaurant.ts
//
// Types "métier" du restaurant IL GUSTO, alignés sur la structure réelle
// choisie dans data/*.ts.

export interface Plat {
  id: number;
  categorieSlug: string;
  nom: string;
  prix: number;
  description?: string;
  /** Optionnel : regroupement des pizzas par base (ex: "Base Tomate",
   *  "Base Crème"). Voir note dans data/menu.ts si vous souhaitez le
   *  réintroduire pour l'affichage en 2 colonnes du menu pizzas. */
  base?: string;
}

export interface Category {
  id: number;
  nom: string;
  slug: string;
  description?: string;
  /** Catégorie mise en avant sur la home page (section "Notre Menu") */
  featured: boolean;
  /** Chemin de l'image dans /public, ex: "/images/menu/pizzas.webp" */
  image?: string;
  imageAlt?: string;
}

export interface Supplement {
  id: number;
  categorieSlug: string;
  nom: string;
  prix: number;
  disponible: boolean;
}

export interface GalleryImage {
  id: number;
  titre: string;
  /** Chemin de l'image dans /public, ex: "/images/galerie/xxx.webp" */
  image: string;
  featured?: boolean;
}

export interface GalleryCategory {
  id: number;
  nom: string;
  slug: string;
  images: GalleryImage[];
}

export interface JourHoraire {
  jour: string;
  ouvertureMidi: string | null;
  fermetureMidi: string | null;
  ouvertureSoir: string | null;
  fermetureSoir: string | null;
}

export interface DeliveryPlatform {
  enabled: boolean;
  label: string;
  linkImage: string;
  url?: string;
}

export interface ContactInfo {
  nom: string;
  logo: string;
  logoAlt?: string;
  telephone: string;
  email: string;
  adresse: {
    rue: string;
    codePostal: string;
    ville: string;
    pays: string;
  };
  horaires: JourHoraire[];
  livraison: {
    uberEats: DeliveryPlatform;
    deliveroo: DeliveryPlatform;
  };
  localisation: {
    latitude: number;
    longitude: number;
    googlePlaceId?: string;
  };
  description?: string;
}

export interface FaqItem {
  id: number;
  question: string;
  reponse: string;
}

export interface NavItem {
  id: number;
  titre: string;
  url: string;
  nouvelOnglet?: boolean;
  ordre: number;
}

export interface NavMenu {
  slug: string;
  nom: string;
  items: NavItem[];
}

export interface SeoInfo {
  metaTitle?: string;
  metaDescription?: string;
  robotsIndex?: boolean;
}

export interface ContentSection {
  type: "heading" | "paragraph" | "list";
  level?: 2 | 3 | 4;
  text?: string;
  items?: string[];
}

export interface ContentPage {
  slug: string;
  titre: string;
  seo?: SeoInfo;
  heroImage?: string;
  content: ContentSection[];
  updatedAt: string;
}

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

export interface GoogleReviewsResponse {
  result: {
    reviews: GoogleReview[];
  };
}