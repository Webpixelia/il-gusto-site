import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { contact } from "@/data/contact";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.SITE_URL || "https://www.ilgusto-lille.fr";
const faviconUrl = contact.logo || "/images/placeholder-logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "IL GUSTO - Restaurant Italien & Pizzeria à Lille | Pizza, Pasta & Desserts",
  description:
    "Restaurant italien authentique à Lille. Pizzas au feu de bois, pâtes fraîches et desserts maison. Sur place et à emporter. Réservez au 03 65 67 38 60.",
  keywords:
    "restaurant italien lille, pizzeria lille, pizza feu de bois, livraison pizza lille, restaurant rue des postes, il gusto lille",
  openGraph: {
    title: "IL GUSTO - Restaurant Italien & Pizzeria à Lille",
    description: "Pizzas au feu de bois, pâtes fraîches et desserts maison. Sur place et à emporter.",
    url: siteUrl,
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/placeholder.svg`,
        width: 1200,
        height: 630,
        alt: "IL GUSTO Restaurant Italien à Lille",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IL GUSTO - Restaurant Italien & Pizzeria à Lille",
    description: "Pizzas au feu de bois, pâtes fraîches et desserts maison. Sur place et à emporter.",
    images: [`${siteUrl}/images/placeholder.svg`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: faviconUrl,
    shortcut: faviconUrl,
    apple: faviconUrl,
    other: {
      rel: "apple-touch-icon",
      url: faviconUrl,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
