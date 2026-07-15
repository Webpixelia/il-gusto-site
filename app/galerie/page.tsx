import type { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { GalleryView } from "@/components/layout/GalleryView";
import { getGalerieData } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Galerie Photos - IL GUSTO Restaurant Italien à Lille",
  description:
    "Découvrez en images notre restaurant italien, nos pizzas au feu de bois, pâtes fraîches et desserts maison.",
  openGraph: {
    title: "Galerie Photos - IL GUSTO Restaurant Italien à Lille",
    description:
      "Découvrez en images notre restaurant italien, nos pizzas au feu de bois, pâtes fraîches et desserts maison.",
    url: "https://www.ilgusto-lille.fr/galerie",
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
  },
};

export default function GaleriePage() {
  const galerieData = getGalerieData();

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Notre Galerie"
          description="Découvrez notre restaurant et nos spécialités en images"
          imagePath="/images/il-gusto-galerie.webp?height=400&width=1200&text=IL+GUSTO+GALERIE"
        />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Navigation des catégories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {galerieData.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="bg-[#f9f9f9] hover:bg-[#4a8063] hover:text-white px-4 py-2 rounded-md transition-colors font-handwriting text-lg"
                >
                  {category.name}
                </a>
              ))}
            </div>

            {/* Sections de galerie par catégorie */}
            <GalleryView galerieData={galerieData} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
