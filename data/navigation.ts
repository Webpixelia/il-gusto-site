import type { NavMenu } from "@/types/restaurant";

export const mainMenu: NavMenu = {
  slug: "menu-principal",
  nom: "Menu principal",
  items: [
    { id: 1, titre: "Accueil", url: "/", ordre: 1 },
    { id: 2, titre: "Menu", url: "/menu", ordre: 2 },
    { id: 3, titre: "Galerie", url: "/galerie", ordre: 3 },
    { id: 4, titre: "Contact", url: "/contact", ordre: 4 },
  ],
};

export const legalMenu: NavMenu = {
  slug: "menu-legal",
  nom: "Menu légal",
  items: [
    {
      id: 1,
      titre: "Politique de confidentialité",
      url: "/politique-de-confidentialite",
      ordre: 1,
    },
    { id: 2, titre: "Mentions légales", url: "/mentions-legales", ordre: 2 },
  ],
};

/**
 * Équivalent du getMenuBySlug(slug) d'origine.
 */
export function getMenuBySlug(slug: string): NavMenu | null {
  if (slug === mainMenu.slug) return mainMenu;
  if (slug === legalMenu.slug) return legalMenu;
  return null;
}
