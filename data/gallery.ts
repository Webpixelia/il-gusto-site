export interface GalleryCategory {
  id: number;
  nom: string;
  slug: string;

  images: GalleryImage[];
}

export interface GalleryImage {
  id: number;
  titre: string;
  image: string;
  featured?: boolean;
}

export const gallery: GalleryCategory[] = [
  {
    id: 1,
    nom: "Notre Restaurant",
    slug: "restaurant",

    images: [
      {
        id: 1,
        titre: "Bois pour le four",
        image: "/images/gallery/bois_four_il_gusto_lille.jpg",
      },
      {
        id: 2,
        titre: "Four Il Gusto",
        image: "/images/gallery/four_pizza_four_il_gusto_lille.jpg",
      featured: true,
      },
    ],
  },

  {
    id: 2,
    nom: "Nos Pizzas",
    slug: "pizzas",

    images: [
      {
        id: 3,
        titre: "Pizza devant menu",
        image: "/images/gallery/pizza_1_il_gusto_lille.jpeg",
      },
      {
        id: 4,
        titre: "Pizza devant le four",
        image: "/images/gallery/pizza_four_il_gusto_lille.png",
      featured: true,
      },
      {
        id: 5,
        titre: "Pizza dans le four",
        image: "/images/gallery/pizzas_four_ilgusto_lille.jpeg",
      featured: true,
      },
      {
        id: 6,
        titre: "Commandes pizzas",
        image: "/images/gallery/pizzas_ilgusto_lille.jpeg",
      },
    ],
  },

  {
    id: 3,
    nom: "Nos Pâtes",
    slug: "pates",

    images: [
      {
        id: 7,
        titre: "Pâtes devant le four",
        image: "/images/gallery/four_pates_four_il_gusto_lille.jpg",
      },
    ],
  },

  {
    id: 4,
    nom: "Nos Desserts",
    slug: "desserts",

    images: [
      {
        id: 8,
        titre: "Tiramisu classique & spéculos, Crème brûlée, Fondant chocolat",
        image: "/images/gallery/desserts_1_il_gusto_lille.webp",
      featured: true,
      },
    ],
  },

  {
    id: 5,
    nom: "Nos Boissons",
    slug: "boissons",

    images: [
      {
        id: 9,
        titre: "Palestine cola, Palestine orange, Lorina limonade, Selecto, Hamoud, Ifruit, Oasis Tropical, Oasis Ice Tea",
        image: "/images/gallery/boissons_il_gusto_lille.webp",
      },
    ],
  },
];
/**
 * Équivalent du getGalerieData() d'origine, dans le même format que celui
 * consommé par app/page.tsx (home) et components/layout/GalleryView.tsx :
 * { id, name, slug, images: [{ src, alt, featured }] }
 */
export function getGalerieData() {
  return gallery.map((cat) => ({
    id: cat.id,
    name: cat.nom,
    slug: cat.slug,
    images: cat.images.map((img) => ({
      src: img.image,
      alt: img.titre,
      featured: img.featured || false,
    })),
  }));
}
