// components/layout/ContactMap.tsx
import { generateMapUrl } from "@/lib/maps";
import { formatAdresseInline } from "@/lib/format";
import type { ContactInfo } from "@/types/restaurant";

export default function ContactMap({ contact }: { contact: ContactInfo }) {
  const { latitude, longitude } = contact.localisation;
  const isValidCoords = latitude && longitude && !isNaN(latitude) && !isNaN(longitude);

  if (!isValidCoords) {
    return (
      <div className="rounded-lg overflow-hidden shadow-lg h-[300px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Carte non disponible</p>
      </div>
    );
  }

  const adresse = formatAdresseInline(contact.adresse);
  const mapUrl = generateMapUrl(latitude, longitude, adresse);
  const mapTitle = `Localisation ${contact.nom} - ${contact.adresse.rue}`;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg h-[300px]">
      <iframe
        title={mapTitle}
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label="Carte interactive avec notre emplacement"
      />
    </div>
  );
}
