import { fetchStrapiData } from "@/lib/strapi";
import type { ContactInfo } from "@/types/strapi";
import { getMenuBySlug } from "@/lib/strapi";
import HeaderClient from "./header-client";

export default async function HeaderServer() {
  // Récupération des données côté serveur
  const mainMenu = await getMenuBySlug('menu-principal');
  const contactData = await fetchStrapiData<ContactInfo>('/contact-infos?populate=*');
  const contactInfo = contactData.data[0];
  const strapiBaseUrl = process.env.STRAPI_API_URL;
  const logoUrl = contactInfo.Logo?.url
    ? `${strapiBaseUrl}${contactInfo.Logo.url}` 
    : '/images/placeholder.svg';

  // Passage des données au composant client
  return (
    <HeaderClient 
      mainMenu={mainMenu} 
      contactInfo={contactInfo}
      logoUrl={logoUrl}
    />
  );
}