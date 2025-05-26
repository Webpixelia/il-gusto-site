import React from 'react';
import StrapiRichTextRenderer from '@/components/StrapiRichTextRenderer';
import type { Metadata } from "next"
import { notFound } from 'next/navigation'
import { getPageBySlug } from "@/lib/strapi"
import PageHeader from "@/components/layout/page-header"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

// Définition des types pour les paramètres de page
type GenerateMetadataProps = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

type PageProps = {
  params: { slug: string }
}

// Cette fonction est appelée pour générer les métadonnées de la page dynamique
export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {  
  const page = await getPageBySlug(params.slug);
  
  if (!page) return {
    title: "Page non trouvée",
    robots: { index: false, follow: false }
  };
  
  return {
    title: page.SEO?.MetaTitle || page.Titre,
    description: page.SEO?.MetaDescription,
    robots: {
      index: page.SEO?.RobotsIndex ?? true,
      follow: true
    },
  };
}

export default async function DynamicPage(
  props: PageProps
): Promise<React.ReactElement> {  
  const page = await getPageBySlug(props.params.slug);
  
  if (!page) notFound();

  const heroImageUrl = page.ImgHero 
    ? `${process.env.STRAPI_API_URL || 'http://localhost:1337'}${page.ImgHero.url}`
    : "/images/placeholder.svg";

  return (
    <>
      <Header />
      <main>
        <PageHeader title={page.Titre} imagePath={heroImageUrl} />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <StrapiRichTextRenderer 
                content={page.Contenu} 
                className="prose-lg md:prose-xl prose-slate" 
              />
              <p className="text-sm text-gray-600 mt-8">
                Dernière mise à jour : {new Date(page.publishedAt).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}