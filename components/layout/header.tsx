"use client";
// components/layout/header.tsx
//
// AVANT : header.tsx (server component, fetch Strapi) + header-client.tsx
// (client component, recevait les données en props).
// APRÈS : un seul composant client. Les données étant maintenant statiques
// et importées directement, plus besoin de séparer fetch (serveur) et
// interactivité (client) : header-client.tsx peut être supprimé.

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { mainMenu } from "@/data/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const items = [...mainMenu.items].sort((a, b) => a.ordre - b.ordre);

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src={contact.logo}
                alt={contact.logoAlt || `Logo ${contact.nom}`}
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.url || "#"}
                target={item.nouvelOnglet ? "_blank" : "_self"}
                className="font-handwriting hover:text-[#4a8063] transition-colors"
              >
                {item.titre}
              </Link>
            ))}
          </nav>

          {contact.telephone && (
            <Link
              href={`tel:${contact.telephone.replace(/\s/g, "")}`}
              className="hidden md:flex items-center gap-2 bg-[#4a8063] hover:bg-[#3a6a53] px-4 py-2 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{contact.telephone}</span>
            </Link>
          )}

          <button
            className="md:hidden text-white p-2"
            aria-label="Toggle mobile menu"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-black border-t border-gray-800 py-4`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.url || "#"}
                target={item.nouvelOnglet ? "_blank" : "_self"}
                className="font-handwriting hover:text-[#4a8063] transition-colors"
              >
                {item.titre}
              </Link>
            ))}

            {contact.telephone && (
              <Link
                href={`tel:${contact.telephone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 bg-[#4a8063] hover:bg-[#3a6a53] px-4 py-2 rounded-md transition-colors w-fit"
              >
                <Phone className="w-4 h-4" />
                <span>{contact.telephone}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
