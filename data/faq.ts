// data/faq.ts
//
// Remplace : getFaqs() (endpoint Strapi: GET /api/faqs)
//
// Le champ `reponse` était un Rich Text Strapi (tableau de blocks) que
// FaqSection.tsx reconvertissait en texte simple avec parseRichText().
// Ici on stocke directement le texte final : plus besoin de parser.
//
// ⚠️ TODO : remplacer par les FAQ réelles.

import type { FaqItem } from "@/types/restaurant";

export const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Acceptez-vous les réservations ?",
    reponse:
      "Oui, nous acceptons les réservations par téléphone au 03 65 67 38 60 ou via notre formulaire de contact.",
  },
  {
    id: 2,
    question: "Proposez-vous des options végétariennes ?",
    reponse:
      "Oui, nous proposons plusieurs options végétariennes, notamment des pizzas et des salades.",
  },
  {
    id: 3,
    question: "Faites-vous la livraison ?",
    reponse:
      "Oui, nous proposons la livraison via la plateforme Uber Eats.",
  },
  {
    id: 4,
    question: "Avez-vous une salle pour manger sur place ?",
    reponse:
      "Oui, nous disposons d'une salle agréable et lumineuse pour vous permettre de vous restaurer sur place.",
  },
];
