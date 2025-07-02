import type { Metadata } from "next"
import Image from "next/image"
import PageHeader from "@/components/layout/page-header"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import DeliveryButtons from '@/components/layout/DeliveryButtons'
import { getAllCategories, getPlatsByCategorySlug } from "@/lib/strapi"
import { buildImageUrl } from "@/lib/utils"
import type { Plat, Category, Supplement } from "@/types/strapi";

export const metadata: Metadata = {
  title: "Menu - IL GUSTO Restaurant Italien à Lille",
  description:
    "Découvrez notre menu de pizzas au feu de bois, pâtes fraîches et desserts italiens authentiques. Sur place et à emporter.",
  openGraph: {
    title: "Menu - IL GUSTO Restaurant Italien à Lille",
    description: "Découvrez notre menu de pizzas au feu de bois, pâtes fraîches et desserts italiens authentiques.",
    url: "https://www.ilgusto-lille.fr/menu",
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
  },
}

interface PlatsByBase {
  [key: string]: Plat[];
}

export default async function MenuPage() {
  const categories = await getAllCategories();
  const platsByCategory: Record<string, Plat[]> = {};

  // On récupère les plats de chaque catégorie à l'aide de l'API
  for (const category of categories) {
    const plats = await getPlatsByCategorySlug(category.Slug);
    platsByCategory[category.Slug] = plats;
  }

  // Organiser les pizzas par base
  const pizzasParBase = (plats: Plat[]): PlatsByBase => {
    return plats.reduce((acc, plat) => {
      const base = plat.Base;
      if (!base) return acc;
      
      if (!acc[base]) {
        acc[base] = [];
      }
      acc[base].push(plat);
      return acc;
    }, {} as PlatsByBase);
  };
  
  return (
    <>
      <Header />
      <main>
        <PageHeader title="Notre Menu" description="Des saveurs authentiques de l'Italie à Lille" imagePath="/images/menu-recto.jpeg?height=400&width=1200&text=IL+GUSTO"/>

        {/* Menu Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {categories.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {categories.map((category: Category) => {
                    const imageUrl = buildImageUrl(
                      category.Image?.url,
                      process.env.STRAPI_API_URL || 'http://localhost:1337',
                      "/images/placeholder.svg?height=400&width=600&text=Image"
                    );

                    const altText = category.Image?.alternativeText 
                      || category.Nom 
                      || "Image de catégorie";

                    return (
                      <div key={category.id} className="bg-[#f9f9f9] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                        <div className="relative h-64">
                          <Image
                            src={imageUrl}
                            alt={altText}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-6">
                          <h2 className="text-3xl font-handwriting text-[#4a8063] mb-2">
                            {category.Nom || "Catégorie sans nom"}
                          </h2>
                          {category.Description && (
                            <p className="text-gray-700 mb-4">{category.Description}</p>
                          )}
                          <a 
                            href={`#${category.Slug || category.id}`} 
                            className="text-[#4a8063] font-semibold hover:underline"
                          >
                            Voir les plats
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sections des plats */}
                {categories.map((category: Category) => {
                  const categorySlug = category.Slug;
                  const categoryPlats = platsByCategory[categorySlug] || [];

                  const bases = pizzasParBase(categoryPlats);
                  const hasMultipleBases = Object.keys(bases).length >= 2;

                  return (
                    <section key={category.id} id={categorySlug} className="mb-16 scroll-mt-24">
                      <div className="flex items-center mb-8">
                        <h2 className="text-4xl font-handwriting text-[#4a8063]">
                          {category.Nom || "Catégorie sans nom"}
                        </h2>
                        <div className="ml-4 h-0.5 flex-1 bg-gray-200"></div>
                      </div>

                      {categoryPlats.length > 0 ? (
                        <>
                          {hasMultipleBases ? (
                            // Affichage groupé par base (pour les pizzas)
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                              {Object.entries(bases).map(([baseName, plats]) => (
                                <div key={baseName}>
                                  <h3 className="text-2xl font-handwriting mb-4">{baseName}</h3>
                                  <div className="space-y-6">
                                    {plats.map((plat: Plat) => (
                                      <div key={plat.id} className="border-b border-gray-100 pb-4">
                                        <div className="flex justify-between items-center mb-1">
                                          <h4 className="font-semibold">{plat.Nom}</h4>
                                          <span className="font-semibold">{plat.Prix.toFixed(2)}€</span>
                                        </div>
                                        {plat.Description && (
                                          <p className="text-sm text-gray-600">{plat.Description}</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            // Affichage normal pour les autres catégories
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                              {categoryPlats.map((plat: Plat) => (
                                <div key={plat.id} className="border-b border-gray-100 pb-4">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-semibold">{plat.Nom}</h4>
                                    <span className="font-semibold">{plat.Prix.toFixed(2)}€</span>
                                  </div>
                                  {plat.Description && (
                                    <p className="text-sm text-gray-600">{plat.Description}</p>
                                  )}
                                  {plat.Base && !hasMultipleBases && (
                                    <p className="text-sm text-gray-500">({plat.Base})</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Section des suppléments */}
                          {category.supplements && category.supplements.length > 0 && (
                            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                              <div className="flex items-center mb-4">
                                <h3 className="text-2xl font-handwriting text-[#4a8063]">
                                  Suppléments disponibles
                                </h3>
                                <div className="ml-4 h-0.5 flex-1 bg-gray-200"></div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {category.supplements.map((supplement: Supplement) => (
                                  supplement.Disponible !== false && (
                                    <div key={supplement.id} className="bg-white p-4 rounded shadow-sm">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-medium text-gray-800">{supplement.Nom}</h4>
                                        <span className="font-semibold text-[#4a8063]">
                                          +{supplement.Prix.toFixed(2)}€
                                        </span>
                                      </div>
                                    </div>
                                  )
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-500">Aucun plat disponible dans cette catégorie.</p>
                      )}
                    </section>
                  );
                })}
              </>
            ) : (
              <p className="text-center py-16 text-gray-500">Aucune catégorie disponible.</p>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#4a8063] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-handwriting mb-6">Envie de déguster nos spécialités ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Commandez dès maintenant via UberEats !</p>
            <div className="max-w-md mx-auto">
              {/* Boutons de livraison */}
              <DeliveryButtons />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
