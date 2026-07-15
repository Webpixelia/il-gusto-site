// data/supplements.ts
//
// Dans Strapi, les suppléments étaient nichés dans chaque Category
// (category.supplements). Ici c'est une collection à part reliée par
// `categorieSlug`, comme pour data/menu.ts — bon réflexe : ça évite de
// dupliquer/imbriquer et reste cohérent avec le reste du modèle.

export interface Supplement {
  id: number;
  categorieSlug: string;
  nom: string;
  prix: number;
  disponible: boolean;
}

export const supplements: Supplement[] = [
  {
    id: 1,
    categorieSlug: "pizzas",
    nom: "Fromage, légumes, charcuterie",
    prix: 2,
    disponible: true,
  },
  {
    id: 2,
    categorieSlug: "pizzas",
    nom: "Viande, crevettes, saumon",
    prix: 3,
    disponible: true,
  },
  {
    id: 3,
    categorieSlug: "pizzas",
    nom: "Burrata",
    prix: 5,
    disponible: true,
  },
  {
    id: 4,
    categorieSlug: "pates",
    nom: "Gratiné",
    prix: 1,
    disponible: true,
  },
];
/**
 * Équivalent de l'ancien category.supplements (populate=*), filtré par
 * catégorie et par disponibilité.
 */
export function getSupplementsByCategorySlug(slug: string): Supplement[] {
  return supplements.filter((s) => s.categorieSlug === slug && s.disponible !== false);
}
