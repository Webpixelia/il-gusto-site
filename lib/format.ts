// lib/format.ts
//
// L'ancien Strapi stockait Adresse et Horaires comme du texte brut
// pré-formaté (une chaîne avec des \n), affiché directement avec
// `.split('\n').map(line => <li>{line}</li>)`. La nouvelle structure
// (data/contact.ts) est structurée (objet adresse, tableau horaires par
// jour) — meilleur pour la donnée, mais il faut la formatter pour l'affichage.
// Ces deux helpers reproduisent le rendu visuel d'origine.

import type { ContactInfo, JourHoraire } from "@/types/restaurant";

export function formatAdresse(adresse: ContactInfo["adresse"]): string[] {
  return [`${adresse.rue}`, `${adresse.codePostal} ${adresse.ville}`];
}

export function formatAdresseInline(adresse: ContactInfo["adresse"]): string {
  return `${adresse.rue}, ${adresse.codePostal} ${adresse.ville}`;
}

function formatJour(j: JourHoraire): string {
  const creneaux: string[] = [];
  if (j.ouvertureMidi && j.fermetureMidi) {
    creneaux.push(`${j.ouvertureMidi} - ${j.fermetureMidi}`);
  }
  if (j.ouvertureSoir && j.fermetureSoir) {
    creneaux.push(`${j.ouvertureSoir} - ${j.fermetureSoir}`);
  }
  if (creneaux.length === 0) return `${j.jour} : Fermé`;
  return `${j.jour} : ${creneaux.join(" / ")}`;
}

/** Une ligne par jour, prête à être mappée dans un <li> (remplace
 *  contactInfo.Horaires.split('\n')). */
export function formatHoraires(horaires: JourHoraire[]): string[] {
  return horaires.map(formatJour);
}
