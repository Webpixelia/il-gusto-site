import type { Metadata } from "next";
import { MapPin, Phone, Clock, Mail, Map } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SimpleContactForm from "@/components/SimpleContactForm";
import { contact } from "@/data/contact";
import { faqs } from "@/data/faq";
import { formatAdresse, formatHoraires } from "@/lib/format";
import DeliveryButtons from "@/components/layout/DeliveryButtons";
import ContactMap from "@/components/layout/ContactMap";
import FaqSection from "@/components/layout/FaqSection";

export const metadata: Metadata = {
  title: "Contact - IL GUSTO Restaurant Italien à Lille",
  description:
    "Contactez-nous pour toute information ou réservation. Restaurant italien IL GUSTO, 233 Rue des Postes, 59000 Lille.",
  openGraph: {
    title: "Contact - IL GUSTO Restaurant Italien à Lille",
    description:
      "Contactez-nous pour toute information ou réservation. Restaurant italien IL GUSTO, 233 Rue des Postes, 59000 Lille.",
    url: "https://www.ilgusto-lille.fr/contact",
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ContactPage() {
  const horaires = formatHoraires(contact.horaires);

  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Contact"
          description="Nous sommes à votre écoute"
          imagePath="/images/il-gusto-contact.webp?height=400&width=1200&text=IL+GUSTO+LILLE"
        />

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
                        {formatAdresse(contact.adresse).join("\n")}
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                      <p>
                        <a href={`tel:${contact.telephone.replace(/\s/g, "")}`} className="hover:underline">
                          {contact.telephone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p>
                        <a href={`mailto:${contact.email}`} className="hover:underline">
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-[#4a8063] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horaires d'ouverture</h3>
                      <ul className="space-y-1">
                        {horaires.map((line, index) => (
                          <li key={index}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Nous trouver</h3>
                  <ContactMap contact={contact} />
                </div>
              </div>

              {/* Infos commande & Formulaire de contact */}
              <div className="space-y-6">
                <h2 className="text-3xl font-handwriting text-[#4a8063]">Commander</h2>

                <div className="flex flex-col md:flex-row gap-6 bg-[#f9f9f9] p-6 rounded-lg shadow-md">
                  <div className="flex items-start md:w-1/3 hidden">
                    <MapPin className="w-5 h-5 text-[#4a8063] mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Zone de livraison</h3>
                      <p className="text-sm">Nous livrons dans un rayon de 5 km autour du restaurant.</p>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="flex items-start">
                      <Map className="w-5 h-5 text-[#4a8063] mr-3 mt-0.5 flex-shrink-0" />
                      <h3 className="font-semibold mb-4">Plateformes de livraison</h3>
                    </div>
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
  );
}
