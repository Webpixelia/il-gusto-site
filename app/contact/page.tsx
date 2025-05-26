import type { Metadata } from "next"
import Image from "next/image"
import { MapPin, Phone, Clock, Mail, Send, Map } from "lucide-react"
import PageHeader from "@/components/layout/page-header"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import SimpleContactForm from "@/components/SimpleContactForm"
import { fetchStrapiData } from '@/lib/strapi'
import type { ContactInfo } from '@/types/strapi'
import DeliveryButtons from '@/components/layout/DeliveryButtons'
import ContactMap from '@/components/layout/ContactMap'
import FaqSection from '@/components/layout/FaqSection'
import { getFaqs } from '@/lib/strapi'

export const metadata: Metadata = {
  title: "Contact - IL GUSTO Restaurant Italien à Lille",
  description:
    "Contactez-nous pour toute information ou réservation. Restaurant italien IL GUSTO, 233 Rue des Postes, 59000 Lille.",
  openGraph: {
    title: "Contact - IL GUSTO Restaurant Italien à Lille",
    description:
      "Contactez-nous pour toute information ou réservation. Restaurant italien IL GUSTO, 233 Rue des Postes, 59000 Lille.",
    url: "https://ilgusto-lille.fr/contact",
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
  },
}

export default async function ContactPage() {
  // Récupération des données depuis Strapi
  const contactData = await fetchStrapiData<ContactInfo>('/contact-infos');
  const contactInfo = contactData.data[0];
  const faqs = await getFaqs();
  return (
    <>
      <Header />
      <main>
        <PageHeader title="Contact" description="Nous sommes à votre écoute" imagePath="/images/placeholder.svg" />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Informations de contact */}
              <div>
                <h2 className="text-3xl font-handwriting text-[#4a8063] mb-6">Nos Coordonnées</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                      <address className="not-italic whitespace-pre-line">
                        {contactInfo.Adresse}
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                      <p>
                        <a 
                          href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`} 
                          className="hover:underline"
                        >
                          {contactInfo.Telephone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p>
                        <a 
                          href={`mailto:${contactInfo.Email}`} 
                          className="hover:underline"
                        >
                          {contactInfo.Email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horaires d'ouverture</h3>
                      <ul className="space-y-1">
                        {(contactInfo.Horaires as string).split('\n').map((line: string, index: number) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Nous trouver</h3>
                  {/* Composant de carte dynamique */}
                  <ContactMap contact={contactInfo} />
                </div>
              </div>

              {/* Infos commande & Formulaire de contact */}
              <div className="space-y-6">
                <h2 className="text-3xl font-handwriting text-[#4a8063]">Commander</h2>

                <div className="flex flex-col md:flex-row gap-6 bg-[#f9f9f9] p-6 rounded-lg shadow-md">
                {/* Partie gauche (toujours en haut sur mobile, 1/3 sur desktop) */}
                <div className="flex items-start md:w-1/3">
                  <MapPin className="w-5 h-5 text-[#4a8063] mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Zone de livraison</h3>
                    <p className="text-sm">Nous livrons dans un rayon de 5 km autour du restaurant.</p>
                  </div>
                </div>

                {/* Partie droite (toujours en bas sur mobile, 2/3 sur desktop) */}
                <div className="md:w-2/3">
                  <div className="flex items-start">
                    <Map className="w-5 h-5 text-[#4a8063] mr-3 mt-0.5 flex-shrink-0" />
                    <h3 className="font-semibold mb-4">Plateformes de livraison</h3>
                  </div>
                  {/* Boutons de livraison */}
                  <DeliveryButtons />
                </div>
              </div>
                <h2 className="text-3xl font-handwriting text-[#4a8063]">Envoyez-nous un message</h2>
                <SimpleContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#f9f9f9]">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-handwriting text-center text-[#4a8063] mb-12">Questions Fréquentes</h2>
            <FaqSection faqs={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
