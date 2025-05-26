// types/strapi.d.ts
import type { BlocksContent } from '@strapi/blocks-react-renderer';

declare module '@strapi/strapi' {
  export interface RichTextBlock {
    type: string;
    children?: RichTextBlock[];
    level?: number;
    format?: string;
    text?: string;
    url?: string;
    // Ajoutez les autres propriétés que vous utilisez
  }
}

export interface Plat {
  id: number;
  Nom: string;
  Prix: number;
  Description?: string;
  Base?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
  
export interface Supplement {
  id: number;
  Nom: string;
  Prix: number;
  Disponible?: boolean;
  Slug?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Category {
  id: number;
  Nom: string;
  Slug: string;
  Description: string;
  Featured: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  Plats?: Plat[];
  Image?: {
    id: number;
    url: string;
    alternativeText?: string | null;
    // autres propriétés de l'image si nécessaire
  };
  supplements?: Supplement[];
}

export interface CategoryWithPlats {
  id: number;
  Nom: string;
  Slug: string;
  Description: string;
  Featured: boolean;
  plats: {
    data: Array<{
      id: number;
      Nom: string;
      Prix: number;
      Description?: string;
      Base?: string;
    }>;
  };
}

export interface GalerieImage {
  id: number;
  Nom: string;
  Image: {
      url: string;
      alternativeText?: string;
      width: number;
      height: number;
  };
  categorie_galerie?: {
      id: number;
      Nom: string;
      Slug: string;
  };
  Featured: boolean;
}
  
export interface CategorieGalerie {
  id: number;
  Nom: string;
  Slug: string;
  galeries?: GalerieImage[];
}

export interface ContactInfo {
  id: number;
  Telephone: string;
  Email: string;
  Adresse: string;
  Horaires: string;
  Latitude: number;
  Longitude: number;
  alt_text_map?: string;
  site_title?: string;
  site_description: string;
  place_id_google?: string;
  Logo?: {
    url: string;
    alternativeText?: string;
    formats?: {
      small?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
  };
}
  
// Interface générique pour les réponses Strapi
export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FaqItem {
    id: number;
    question: string;
    reponse: Array<{
      type: string;
      children: Array<{
        type: string;
        text: string;
      }>;
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
}

export interface MenuItem {
  id: number;
  Titre: string;
  URL: string;
  Nouvel_onglet?: boolean;
  Ordre?: number;
}

export interface Menu {
  id: number;
  Nom: string;
  Slug: string;
  menuItem: MenuItem[];
}

// Interface pour les attributs SEO
export interface SEO {
  id: number;
  MetaTitle?: string;
  MetaDescription?: string;
  RobotsIndex?: boolean;
}

// Interface pour le contenu riche (Rich Text)
export interface RichTextBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

// Interface pour les pages
export interface Page {
  id: number;
  documentId: string;
  Titre: string;
  Slug: string;
  Contenu: BlocksContent;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  SEO?: SEO;
  ImgHero: {
    url: string;
    alternativeText?: string;
    formats?: {
      small?: {
        url: string;
      };
      thumbnail?: {
        url: string;
      };
    };
  };
}

export interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}