import type { ContentPage } from "@/types/restaurant";
import { contact } from "./contact";

export const pages: ContentPage[] = [
  {
    slug: "mentions-legales",
    titre: "Mentions légales",
    seo: {
      metaTitle: "Mentions légales - IL GUSTO",
      metaDescription: "Mentions légales du site IL GUSTO Restaurant.",
      robotsIndex: false,
    },
    updatedAt: "2026-07-14",
    content: [
      { type: "heading", level: 2, text: "1. Éditeur du site" },
      {
        type: "paragraph",
        text: `Le présent site est édité par ${contact.nom}, [TODO: forme juridique — ex. Entreprise Individuelle / SARL / SAS], [TODO: si société, capital social], immatriculé(e) au Registre du Commerce et des Sociétés de [TODO: ville RCS] sous le numéro [TODO: n° RCS ou SIREN], numéro SIRET [TODO: n° SIRET], dont le siège social est situé au ${contact.adresse.rue}, ${contact.adresse.codePostal} ${contact.adresse.ville}.`,
      },
      {
        type: "paragraph",
        text: `Numéro de TVA intracommunautaire : [TODO: n° TVA, si applicable].`,
      },
      {
        type: "paragraph",
        text: `Directeur de la publication : [TODO: nom du représentant légal].`,
      },
      {
        type: "paragraph",
        text: `Contact : ${contact.telephone} — ${contact.email}`,
      },
      { type: "heading", level: 2, text: "2. Hébergement" },
      {
        type: "paragraph",
        text: "Le site est hébergé par [TODO: nom de l'hébergeur], [TODO: adresse de l'hébergeur], [TODO: téléphone/contact de l'hébergeur].",
      },
      { type: "heading", level: 2, text: "3. Propriété intellectuelle" },
      {
        type: "paragraph",
        text: `L'ensemble des contenus présents sur ce site (textes, photographies, logos, éléments graphiques) est la propriété exclusive de ${contact.nom}, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation préalable écrite, est interdite et pourra donner lieu à des poursuites conformément aux articles L.335-2 et suivants du Code de la propriété intellectuelle.`,
      },
      { type: "heading", level: 2, text: "4. Données personnelles" },
      {
        type: "paragraph",
        text: "Le traitement des données personnelles collectées via ce site (notamment via le formulaire de contact) fait l'objet d'une politique dédiée. Voir notre Politique de confidentialité.",
      },
      { type: "heading", level: 2, text: "5. Cookies" },
      {
        type: "paragraph",
        text: "Ce site est susceptible d'utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie de mesure d'audience ou publicitaire n'est déposé sans consentement préalable. [TODO: à ajuster si vous ajoutez Google Analytics, Meta Pixel, etc.]",
      },
      { type: "heading", level: 2, text: "6. Limitation de responsabilité" },
      {
        type: "paragraph",
        text: `${contact.nom} s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, mais ne saurait être tenu responsable des erreurs, omissions, ou de l'indisponibilité temporaire du site.`,
      },
      { type: "heading", level: 2, text: "7. Droit applicable" },
      {
        type: "paragraph",
        text: "Les présentes mentions légales sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution relève de la compétence des tribunaux français.",
      },
    ],
  },
  {
    slug: "politique-de-confidentialite",
    titre: "Politique de confidentialité",
    seo: {
      metaTitle: "Politique de confidentialité - IL GUSTO",
      metaDescription: "Politique de confidentialité et protection des données du site IL GUSTO.",
      robotsIndex: false,
    },
    updatedAt: "2026-07-14",
    content: [
      { type: "heading", level: 2, text: "1. Responsable du traitement" },
      {
        type: "paragraph",
        text: `Le responsable du traitement des données collectées sur ce site est ${contact.nom}, ${contact.adresse.rue}, ${contact.adresse.codePostal} ${contact.adresse.ville}, joignable à ${contact.email} ou au ${contact.telephone}.`,
      },
      { type: "heading", level: 2, text: "2. Données collectées" },
      {
        type: "paragraph",
        text: "Lorsque vous utilisez le formulaire de contact de ce site, nous collectons les données que vous nous transmettez volontairement : nom, adresse email, et le contenu de votre message. Aucune autre donnée personnelle n'est collectée en dehors de ce formulaire.",
      },
      { type: "heading", level: 2, text: "3. Finalités du traitement" },
      {
        type: "list",
        items: [
          "Répondre à vos demandes de renseignement ou de réservation",
          "Assurer le suivi de notre relation avec vous",
        ],
      },
      { type: "heading", level: 2, text: "4. Base légale" },
      {
        type: "paragraph",
        text: "Le traitement de vos données repose sur votre consentement, exprimé lors de l'envoi du formulaire de contact, ainsi que sur l'intérêt légitime du restaurant à répondre à vos demandes.",
      },
      { type: "heading", level: 2, text: "5. Durée de conservation" },
      {
        type: "paragraph",
        text: "Les données transmises via le formulaire de contact sont conservées pendant une durée maximale de [TODO: ex. 3 ans] à compter de notre dernier échange, sauf obligation légale de conservation plus longue.",
      },
      { type: "heading", level: 2, text: "6. Destinataires des données" },
      {
        type: "paragraph",
        text: "Vos données sont destinées exclusivement à l'équipe du restaurant IL GUSTO et ne sont ni vendues, ni cédées, ni communiquées à des tiers, à l'exception des prestataires techniques nécessaires au fonctionnement du site (hébergeur, [TODO: service d'envoi d'emails éventuel]).",
      },
      { type: "heading", level: 2, text: "7. Vos droits" },
      {
        type: "paragraph",
        text: "Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité concernant vos données personnelles.",
      },
      {
        type: "paragraph",
        text: `Pour exercer ces droits, vous pouvez nous contacter à l'adresse ${contact.email} ou par courrier à l'adresse du restaurant.`,
      },
      { type: "heading", level: 2, text: "8. Réclamation" },
      {
        type: "paragraph",
        text: "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) — www.cnil.fr.",
      },
      { type: "heading", level: 2, text: "9. Cookies" },
      {
        type: "paragraph",
        text: "Ce site n'utilise pas de cookies de suivi ou publicitaires. Seuls des cookies techniques strictement nécessaires au fonctionnement du site peuvent être utilisés.",
      },
    ],
  },
];

/**
 * Équivalent du getPageBySlug(slug) d'origine.
 */
export function getPageBySlug(slug: string): ContentPage | null {
  return pages.find((p) => p.slug === slug) ?? null;
}