// components/ContactMap.tsx
import { generateMapUrl } from '@/lib/strapi';
import type { ContactInfo } from '@/types/strapi';

export default function ContactMap({ contact }: { contact: ContactInfo }) {
  // Validation des coordonnées
  const isValidCoords = 
    contact?.Latitude && contact?.Longitude &&
    !isNaN(contact.Latitude) && !isNaN(contact.Longitude);

  if (!isValidCoords) {
    return (
        <div className="rounded-lg overflow-hidden shadow-lg h-[300px] bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Carte non disponible</p>
        </div>
    );
  }

  const mapUrl = generateMapUrl(
    contact.Latitude, 
    contact.Longitude,
    contact.Adresse
  );

  const mapTitle = contact.alt_text_map || `Localisation IL GUSTO - ${contact.Adresse.split('\n')[0]}`;

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