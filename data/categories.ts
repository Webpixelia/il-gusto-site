// data/categories.ts
//
// Remplace : getAllCategories() (endpoint Strapi: GET /api/categories)
// ⚠️ Toutes les images doivent être copiées dans /public/images/.

import type { Category } from "@/types/restaurant";
import { menu } from "./menu";

export const categories: Category[] = [
  {
    id: 1,
    nom: "Pizzas",
    slug: "pizzas",
    description: "Cuites au feu de bois traditionnel",
    featured: true,
    image: "/images/categories/pizzas_il_gusto_lille.webp",
    imageAlt: "Pizzas Il Gusto Lille",
  },
  {
    id: 2,
    nom: "Pâtes",
    slug: "pates",
    description: "Pâtes fraîches et sauces maison",
    featured: true,
    image: "/images/categories/pates_il_gusto_lille.webp",
    imageAlt: "Pâtes Il Gusto Lille",
  },
  {
    id: 3,
    nom: "Salades",
    slug: "salades",
    description: "Des salades à foison",
    featured: false,
    image: "/images/categories/salades_il_gusto_lille.webp",
    imageAlt: "Salades Il Gusto Lille",
  },
  {
    id: 4,
    nom: "Desserts",
    slug: "desserts",
    description: "Douceurs italiennes faites maison",
    featured: true,
    image: "/images/categories/desserts_il_gusto_lille.webp",
    imageAlt: "Desserts Il Gusto Lille",
  },
  {
    id: 5,
    nom: "Boissons",
    slug: "boissons",
    description: "Des boissons à volonté",
    featured: false,
    image: "/images/categories/boissons_il_gusto_lille.webp",
    imageAlt: "Boissons Il Gusto Lille",
  },
];

/**
 * Équivalent du getFeaturedCategoriesWithPlats() d'origine : catégories
 * "featured" avec leurs 4 premiers plats (section "Notre Menu" de la home).
 * ⚠️ Les 5 catégories ci-dessus sont TOUTES featured=true : la home
 * affichera donc 5 blocs (contre 3 max habituellement pour un design en
 * grid md:grid-cols-2 lg:grid-cols-3). Repassez `featured` à `false` sur
 * les catégories que vous ne voulez pas voir sur la home (ex: Boissons).
 */
export function getFeaturedCategoriesWithPlats() {
  return categories
    .filter((c) => c.featured)
    .map((c) => ({
      ...c,
      plats: menu.filter((p) => p.categorieSlug === c.slug).slice(0, 4),
    }));
}
