// data/contact.ts
//
// Remplace : fetchStrapiData<ContactInfo>('/contact-infos?populate=*')
//
// ⚠️ Champs optionnels du type ContactInfo non renseignés ici (le site
// compilera quand même, mais ces éléments seront absents à l'affichage) :
//  - logoAlt        : texte alternatif du logo (header/footer). TODO.
//  - description     : texte de présentation sous le logo dans le footer
//                       (remplace l'ancien `site_description` Strapi). TODO.
//  - localisation.googlePlaceId : vide pour l'instant → OK si vous
//                       n'utilisez plus les avis Google (voir plus bas).

import type { ContactInfo } from "@/types/restaurant";

export const contact: ContactInfo = {
  nom: "Il Gusto",

  logo: "/images/logo_il_gusto.png",
  logoAlt: "Logo IL GUSTO",

  description:
    "Restaurant cuisine italiene à Lille\n\nSur place ou à emporter\n\nPizza • Pasta • Sur place & à emporter",

  telephone: "03 65 67 38 60",
  email: "ilgusto59@gmail.com",

  adresse: {
    rue: "233 Rue des Postes",
    codePostal: "59000",
    ville: "Lille",
    pays: "France",
  },

  horaires: [
    {
      jour: "Lundi",
      ouvertureMidi: null,
      fermetureMidi: null,
      ouvertureSoir: "18:00",
      fermetureSoir: "00:00",
    },
    {
      jour: "Mardi",
      ouvertureMidi: "12:00",
      fermetureMidi: "14:00",
      ouvertureSoir: "18:00",
      fermetureSoir: "00:00",
    },
    {
      jour: "Mercredi",
      ouvertureMidi: "12:00",
      fermetureMidi: "14:00",
      ouvertureSoir: "18:00",
      fermetureSoir: "00:00",
    },
    {
      jour: "Jeudi",
      ouvertureMidi: "12:00",
      fermetureMidi: "14:00",
      ouvertureSoir: "18:30",
      fermetureSoir: "00:00",
    },
    {
      jour: "Vendredi",
      ouvertureMidi: null,
      fermetureMidi: null,
      ouvertureSoir: "18:00",
      fermetureSoir: "01:00",
    },
    {
      jour: "Samedi",
      ouvertureMidi: "12:00",
      fermetureMidi: "14:00",
      ouvertureSoir: "18:00",
      fermetureSoir: "01:00",
    },
    {
      jour: "Dimanche",
      ouvertureMidi: "12:00",
      fermetureMidi: "14:00",
      ouvertureSoir: "18:00",
      fermetureSoir: "00:00",
    },
  ],

  livraison: {
    uberEats: {
      enabled: true,
      label: "Uber Eats",
      linkImage: "/images/ubereats-logo.svg",
    },
    deliveroo: {
      enabled: false,
      label: "Deliveroo",
      linkImage: "/images/deliveroo-logo.svg",
    },
  },

  localisation: {
    latitude: 50.6189, // à confirmer
    longitude: 3.0505, // à confirmer
    googlePlaceId: "",
  },
};