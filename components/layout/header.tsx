import { fetchStrapiData } from "@/lib/strapi";
import type { ContactInfo } from "@/types/strapi";
import { getMenuBySlug } from "@/lib/strapi";
import { buildImageUrl } from "@/lib/utils";
import HeaderClient from "./header-client";

export default async function HeaderServer() {
  // Récupération des données côté serveur
  const mainMenu = await getMenuBySlug('menu-principal');
  const contactData = await fetchStrapiData<ContactInfo>('/contact-infos?populate=*');
  const contactInfo = contactData.data[0];
  const strapiBaseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';

  // Logs pour debug
  console.log('Raw Logo URL:', contactInfo.Logo?.url);
  console.log('STRAPI_API_URL:', process.env.STRAPI_API_URL);
  
  const logoUrl = buildImageUrl(contactInfo.Logo?.url, strapiBaseUrl);
  console.log('Final Logo URL:', logoUrl);

  // Passage des données au composant client
  return (
    <HeaderClient 
      mainMenu={mainMenu} 
      contactInfo={contactInfo}
      logoUrl={logoUrl}
    />
  );
}