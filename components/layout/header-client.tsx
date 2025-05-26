"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { Phone } from "lucide-react";
import type { Menu, MenuItem, ContactInfo } from "@/types/strapi";

// Définition des props en utilisant les types existants
interface HeaderClientProps {
    mainMenu: Menu;
    contactInfo: ContactInfo;
    logoUrl: string;
}

export default function HeaderClient({ mainMenu, contactInfo, logoUrl }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo avec lien vers l'accueil */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src={logoUrl}
                alt={contactInfo.Logo?.alternativeText || `Logo ${contactInfo.site_title}`}
                width={50}
                height={50}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
            {mainMenu?.menuItem
              ?.sort((a, b) => (a.Ordre || 0) - (b.Ordre || 0))
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.URL || '#'}
                  target={item.Nouvel_onglet ? "_blank" : "_self"}
                  className="font-handwriting hover:text-[#4a8063] transition-colors"
                >
                  {item.Titre}
                </Link>
              ))}
          </nav>

          {/* Numéro de téléphone dynamique */}
          {contactInfo?.Telephone && (
            <Link
              href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`}
              className="hidden md:flex items-center gap-2 bg-[#4a8063] hover:bg-[#3a6a53] px-4 py-2 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{contactInfo.Telephone}</span>
            </Link>
          )}

          {/* Bouton menu mobile */}
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

      {/* Menu mobile - affiché conditionnellement */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-black border-t border-gray-800 py-4`}>
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4">
            {mainMenu?.menuItem
              ?.sort((a, b) => (a.Ordre || 0) - (b.Ordre || 0))
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.URL || '#'}
                  target={item.Nouvel_onglet ? "_blank" : "_self"}
                  className="font-handwriting hover:text-[#4a8063] transition-colors"
                >
                  {item.Titre}
                </Link>
              ))}
          
            {contactInfo?.Telephone && (
              <Link
                href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 bg-[#4a8063] hover:bg-[#3a6a53] px-4 py-2 rounded-md transition-colors w-fit"
              >
                <Phone className="w-4 h-4" />
                <span>{contactInfo.Telephone}</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}