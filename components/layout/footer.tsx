import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { contact } from "@/data/contact";
import { mainMenu, legalMenu } from "@/data/navigation";
import { formatAdresse, formatHoraires } from "@/lib/format";
import DeliveryButtons from "@/components/layout/DeliveryButtons";

export default function Footer() {
  const mainItems = [...mainMenu.items].sort((a, b) => a.ordre - b.ordre);
  const legalItems = [...legalMenu.items].sort((a, b) => a.ordre - b.ordre);

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Colonne Logo et description */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src={contact.logo}
                alt={contact.logoAlt || `Logo ${contact.nom}`}
                width={80}
                height={80}
                className="object-contain"
              />
              <h3 className="text-xl font-handwriting ml-3">{contact.nom || "IL GUSTO"}</h3>
            </div>
            {contact.description &&
              contact.description
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, index) => (
                  <p key={index} className="text-gray-400 mb-2 last:mb-0">
                    {line.trim()}
                  </p>
                ))}
            <div className="mt-4">
              <Image
                src="/images/logo-halal.png"
                alt="Logo Halal"
                width={90}
                height={80}
                className="object-contain"
                priority={false}
              />
            </div>
          </div>

          {/* Colonne Liens rapides et Livraison */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <nav aria-label="Liens de pied de page">
              <ul className="space-y-2">
                {mainItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url || "#"}
                      target={item.nouvelOnglet ? "_blank" : "_self"}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.titre}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Livraison</h4>
              <div className="max-w-md mx-auto">
                <DeliveryButtons
                  uberEatsStyle={{
                    bg: "bg-transparent",
                    textColor: "text-white",
                    borderColor: "border border-white",
                    hoverBg: "hover:bg-gray-900",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Colonne Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p className="flex items-top">
                <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="whitespace-pre-line">
                  {formatAdresse(contact.adresse).join("\n")}
                </span>
              </p>
              {contact.telephone && (
                <p className="flex items-top">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  <a href={`tel:${contact.telephone.replace(/\s/g, "")}`} className="hover:underline">
                    {contact.telephone}
                  </a>
                </p>
              )}
              {contact.horaires?.length > 0 && (
                <p className="flex items-top">
                  <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
                  <span className="whitespace-pre-line">
                    {formatHoraires(contact.horaires).join("\n")}
                  </span>
                </p>
              )}
            </address>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {contact.nom}. Tous droits réservés.
          </p>
          <div className="flex space-x-4">
            {legalItems.map((item) => (
              <Link
                key={item.id}
                href={item.url || "#"}
                target={item.nouvelOnglet ? "_blank" : "_self"}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {item.titre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
