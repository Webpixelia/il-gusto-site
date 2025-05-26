import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { getFeaturedCategoriesWithPlats } from "@/lib/strapi";
import type { CategoryWithPlats } from "@/types/strapi";

export default async function MenuPreview() {
    const featuredCategories = await getFeaturedCategoriesWithPlats();
    if (!featuredCategories.length) {
        return <div>Aucune catégorie disponible</div>;
    }
    return (
      <section id="menu" className="py-16 bg-black text-white" aria-labelledby="menu-heading">
        <div className="container mx-auto px-4">
          <h2 id="menu-heading" className="text-4xl font-handwriting text-center mb-12">
            Notre Menu
          </h2>
  
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category: CategoryWithPlats) => (
              <div key={category.id} className="bg-[#111] p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-handwriting text-[#4a8063] mb-4">
                  {category.Nom}
                </h3>
                
                <ul className="space-y-3">
                  {category.plats.data.map((plat: any) => (
                    <li key={plat.id} className="flex justify-between items-center">
                      <span>{plat.Nom}</span>
                      <span className="font-semibold">{plat.Prix.toFixed(2)}€</span>
                    </li>
                  ))}
                </ul>
  
                <div className="mt-6 text-center">
                  <Link
                    href={`/menu#${category.Slug}`}
                    className="inline-flex items-center text-[#4a8063] hover:text-[#3a6a53] font-handwriting"
                    aria-label={`Voir tous nos ${category.Nom}`}
                  >
                    Voir tous nos plats <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="bg-[#4a8063] hover:bg-[#3a6a53] text-white font-handwriting py-3 px-8 rounded-md text-xl transition-all inline-block"
              aria-label="Voir notre menu complet"
            >
              Menu Complet
            </Link>
          </div>
        </div>
      </section>
    );
  }