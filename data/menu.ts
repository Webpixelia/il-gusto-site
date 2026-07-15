import type { Plat } from "@/types/restaurant";

export const menu: Plat[] = [
  // =====================
  // PIZZAS
  // =====================

  {
    id: 1,
    categorieSlug: "pizzas",
    nom: "Fruits de mer",
    prix: 11.9,
    description:
      "Sauce tomate, mozzarella, cocktail de fruits de mer, ail, persil",
    base: "Base tomate",
  },
  {
    id: 2,
    categorieSlug: "pizzas",
    nom: "Mexicaine",
    prix: 11.9,
    description:
      "Sauce tomate, mozzarella, poulet, maïs, poivrons verts, oignons",
    base: "Base tomate",
  },
  {
    id: 3,
    categorieSlug: "pizzas",
    nom: "La Gusto",
    prix: 11.9,
    description:
      "Sauce tomate, mozzarella, chorizo, jambon, poulet, poivrons, oignons",
    base: "Base tomate",
  },
  {
    id: 4,
    categorieSlug: "pizzas",
    nom: "La Calzone",
    prix: 10.9,
    description:
      "Sauce tomate, lardons, viande hachée, champignons, œuf",
    base: "Base tomate",
  },
  {
    id: 5,
    categorieSlug: "pizzas",
    nom: "Bolognaise",
    prix: 10.9,
    description:
      "Sauce tomate, mozzarella, viande hachée, oignons, origan",
    base: "Base tomate",
  },
  {
    id: 6,
    categorieSlug: "pizzas",
    nom: "Napolitaine",
    prix: 10.9,
    description:
      "Sauce tomate, mozzarella, anchois, câpres, olives",
    base: "Base tomate",
  },
  {
    id: 7,
    categorieSlug: "pizzas",
    nom: "Pêcheur",
    prix: 9.9,
    description:
      "Sauce tomate, thon, oignons, olives",
    base: "Base tomate",
  },
  {
    id: 8,
    categorieSlug: "pizzas",
    nom: "Orientale",
    prix: 9.9,
    description:
      "Sauce tomate, mozzarella, merguez, poivrons, oignons, olives",
    base: "Base tomate",
  },
  {
    id: 9,
    categorieSlug: "pizzas",
    nom: "Reine",
    prix: 9.9,
    description:
      "Sauce tomate, jambon de dinde, champignons",
    base: "Base tomate",
  },
  {
    id: 10,
    categorieSlug: "pizzas",
    nom: "Végétarienne",
    prix: 9.9,
    description:
      "Sauce tomate, mélange de légumes grillés",
    base: "Base tomate",
  },
  {
    id: 11,
    categorieSlug: "pizzas",
    nom: "Margherita",
    prix: 8.9,
    description:
      "Sauce tomate, mozzarella, origan",
    base: "Base tomate",
  },

  {
    id: 12,
    categorieSlug: "pizzas",
    nom: "Norvégienne",
    prix: 11.9,
    description:
      "Crème fraîche, mozzarella, saumon fumé, aneth",
    base: "Base crème fraîche",
  },

  {
    id: 13,
    categorieSlug: "pizzas",
    nom: "Hawaïenne",
    prix: 10.9,
    description:
      "Crème fraîche, mozzarella, poulet, ananas",
    base: "Base crème fraîche",
  },

  {
    id: 14,
    categorieSlug: "pizzas",
    nom: "Chicken Boursin",
    prix: 10.9,
    description:
      "Crème fraîche, mozzarella, crème Boursin, poulet, oignons",
    base: "Base crème fraîche",
  },

  {
    id: 15,
    categorieSlug: "pizzas",
    nom: "Chicken",
    prix: 10.9,
    description:
      "Crème fraîche, mozzarella, poulet, pommes de terre, champignons, oignons",
    base: "Base crème fraîche",
  },

  {
    id: 16,
    categorieSlug: "pizzas",
    nom: "Savoyarde",
    prix: 9.9,
    description:
      "Crème fraîche, mozzarella, jambon de dinde, pomme de terre, reblochon",
    base: "Base crème fraîche",
  },

  {
    id: 17,
    categorieSlug: "pizzas",
    nom: "Chèvre Miel",
    prix: 9.9,
    description:
      "Crème fraîche, mozzarella, chèvre, miel, noix",
    base: "Base crème fraîche",
  },

  {
    id: 18,
    categorieSlug: "pizzas",
    nom: "Kebab",
    prix: 9.9,
    description:
      "Crème fraîche, mozzarella, kebab, poivrons",
    base: "Base crème fraîche",
  },

  // PÂTES

  {
    id: 19,
    categorieSlug: "pates",
    nom: "Saumon",
    prix: 11.9,
    description:
      "Sauce maison, saumon fumé, ail, crème fraîche",
  },

  {
    id: 20,
    categorieSlug: "pates",
    nom: "Carbonara",
    prix: 9.9,
    description:
      "Lardons de dinde, champignons, œuf, crème fraîche",
  },

  {
    id: 21,
    categorieSlug: "pates",
    nom: "Poulet Forestière",
    prix: 9.9,
    description:
      "Poulet, champignons, crème fraîche",
  },

  {
    id: 22,
    categorieSlug: "pates",
    nom: "Bolognaise",
    prix: 9.9,
    description:
      "Sauce traditionnelle bolognaise",
  },

  {
    id: 23,
    categorieSlug: "pates",
    nom: "Poulet Curry",
    prix: 9.9,
    description:
      "Sauce maison curry, poulet, crème fraîche",
  },

  // Salades

  {
    id: 24,
    categorieSlug: "salades",
    nom: "Salmon",
    prix: 10.9,
    description:
      "Saumon fumé, salade, feta, tomate cerise",
  },

  {
    id: 25,
    categorieSlug: "salades",
    nom: "Végétariano",
    prix: 8.9,
    description:
      "Salade, oignon rouge, maïs, olive noire, tomate cerise",
  },

  {
    id: 26,
    categorieSlug: "salades",
    nom: "Tonno",
    prix: 9.9,
    description:
      "Thon, salade, feta, maïs, tomate cerise, olive noire",
  },

  {
    id: 27,
    categorieSlug: "salades",
    nom: "Pollo",
    prix: 9.9,
    description:
      "Poulet, salade, maïs, tomate cerise, olive noire",
  },

  // Desserts

  {
    id: 28,
    categorieSlug: "desserts",
    nom: "Nougat glacé",
    prix: 3.9,
  },

  {
    id: 29,
    categorieSlug: "desserts",
    nom: "Fondant chocolat",
    prix: 3.9,
  },

  {
    id: 30,
    categorieSlug: "desserts",
    nom: "Tiramisu Classique",
    prix: 3.9,
  },

  {
    id: 31,
    categorieSlug: "desserts",
    nom: "Crème Brûlée",
    prix: 3.9,
  },

  {
    id: 32,
    categorieSlug: "desserts",
    nom: "Tiramisu Speculoos",
    prix: 3.9,
  },

  // Boissons

  {
    id: 33,
    categorieSlug: "boissons",
    nom: "Slim",
    prix: 2.6,
  },

  {
    id: 34,
    categorieSlug: "boissons",
    nom: "Lorina",
    prix: 2.6,
  },

  {
    id: 35,
    categorieSlug: "boissons",
    nom: "Fuze Tea",
    prix: 1.9,
  },

  {
    id: 36,
    categorieSlug: "boissons",
    nom: "Eau",
    prix: 1.3,
  },

  {
    id: 37,
    categorieSlug: "boissons",
    nom: "San Pellegrino",
    prix: 2.6,
  },

  {
    id: 38,
    categorieSlug: "boissons",
    nom: "Cola",
    prix: 1.9,
  },

  {
    id: 39,
    categorieSlug: "boissons",
    nom: "Oasis",
    prix: 1.9,
  },
];

/**
 * Équivalent du getPlatsByCategorySlug(slug) d'origine.
 */
export function getPlatsByCategorySlug(slug: string): Plat[] {
  return menu.filter((p) => p.categorieSlug === slug);
}
