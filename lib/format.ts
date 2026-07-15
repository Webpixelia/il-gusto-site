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
