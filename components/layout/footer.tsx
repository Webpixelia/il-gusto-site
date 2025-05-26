import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import { fetchStrapiData, getMenuBySlug } from "@/lib/strapi"
import { buildImageUrl } from "@/lib/utils"
import type { ContactInfo } from "@/types/strapi"
import DeliveryButtons from '@/components/layout/DeliveryButtons'

export default async function Footer() {
  const mainMenu = await getMenuBySlug('menu-principal');
  const legalMenu = await getMenuBySlug('menu-legal');
  const contactData = await fetchStrapiData<ContactInfo>('/contact-infos?populate=*')
  const contactInfo = contactData.data[0]

  // URL du logo
  const strapiBaseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337'
  const logoUrl = buildImageUrl(contactInfo.Logo?.url, strapiBaseUrl, '/images/placeholder-logo.png')

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Colonne Logo et description */}
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src={logoUrl}
                alt={contactInfo.Logo?.alternativeText || `Logo ${contactInfo.site_title}`}
                width={80}
                height={80}
                className="object-contain"
                unoptimized={process.env.NODE_ENV !== 'production'}
              />
              <h3 className="text-xl font-handwriting ml-3">
                {contactInfo.site_title || 'IL GUSTO'}
              </h3>
            </div>
            {contactInfo.site_description && 
                (contactInfo.site_description as string).split('\n')
                  .filter(line => line.trim() !== '')
                  .map((line, index) => (
                    <p key={index} className="text-gray-400 mb-2 last:mb-0">
                      {line.trim()}
                    </p>
                  ))
              }
          </div>

          {/* Colonne Liens rapides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <nav aria-label="Liens de pied de page">
            <ul className="space-y-2">
              {mainMenu?.menuItem
                ?.sort((a, b) => (a.Ordre || 0) - (b.Ordre || 0))
                .map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.URL || '#'}
                      target={item.Nouvel_onglet ? "_blank" : "_self"}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.Titre}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          </div>

          {/* Colonne Plateformes Livraison */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Livraison</h4>
            <div className="max-w-md mx-auto">
              {/* Boutons de livraison */}
              <DeliveryButtons 
                uberEatsStyle={{
                  bg: "bg-transparent", 
                  textColor: "text-white", 
                  borderColor: "border border-white",
                  hoverBg: "hover:bg-gray-900"
                }}
              />
            </div>
          </div>

          {/* Colonne Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p className="flex items-top">
                <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="whitespace-pre-line">
                  {contactInfo.Adresse}
                </span>
              </p>
              {contactInfo.Telephone && (
                <p className="flex items-top">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  <a 
                    href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`} 
                    className="hover:underline"
                  >
                    {contactInfo.Telephone}
                  </a>
                </p>
              )}
              {contactInfo.Horaires && (
                <p className="flex items-top">
                  <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span className="whitespace-pre-line">
                    {contactInfo.Horaires}
                  </span>
                </p>
              )}
            </address>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {contactInfo.site_title}. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            {/* Liens légaux */}
            {legalMenu?.menuItem
              ?.sort((a, b) => (a.Ordre || 0) - (b.Ordre || 0))
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.URL || '#'}
                  target={item.Nouvel_onglet ? "_blank" : "_self"}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {item.Titre}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  )
}