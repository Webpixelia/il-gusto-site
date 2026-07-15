import type React from "react";
import ContentRenderer from "@/components/ContentRenderer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, getPageBySlug } from "@/data/pages";
import PageHeader from "@/components/layout/page-header";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Génère toutes les pages statiquement au build (plus besoin de
// fetch/ISR : le contenu ne peut plus changer sans redéploiement).
export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page)
    return {
      title: "Page non trouvée",
      robots: { index: false, follow: false },
    };

  return {
    title: page.seo?.metaTitle || page.titre,
    description: page.seo?.metaDescription,
    robots: {
      index: page.seo?.robotsIndex ?? true,
      follow: true,
    },
  };
}

export default async function DynamicPage(props: PageProps): Promise<React.ReactElement> {
  const { slug } = await props.params;
  const page = getPageBySlug(slug);

  if (!page) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHeader title={page.titre} imagePath={page.heroImage || "/images/placeholder.svg"} />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <ContentRenderer content={page.content} className="prose-lg md:prose-xl prose-slate" />
              <p className="text-sm text-gray-600 mt-8">
                Dernière mise à jour : {new Date(page.updatedAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
