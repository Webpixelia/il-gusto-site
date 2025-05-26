import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { fetchStrapiData } from '@/lib/strapi'
import type { ContactInfo } from '@/types/strapi'

const inter = Inter({ subsets: ["latin"] });
const contactData = await fetchStrapiData<ContactInfo>('/contact-infos', `populate=Logo`);
const contactInfo = contactData.data[0];

// URL du logo pour le favicon
const strapiBaseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337'
const faviconUrl = contactInfo.Logo?.url 
  ? `${strapiBaseUrl}${contactInfo.Logo.url}`
  : '/images/placeholder-logo.png'

export const metadata: Metadata = { 
  metadataBase: new URL('http://localhost:3001'),
  title: "IL GUSTO - Restaurant Italien & Pizzeria à Lille | Pizza, Pasta & Desserts",
  description:
    "Restaurant italien authentique à Lille. Pizzas au feu de bois, pâtes fraîches et desserts maison. Sur place et à emporter. Réservez au 03 65 67 38 60.",
  keywords:
    "restaurant italien lille, pizzeria lille, pizza feu de bois, livraison pizza lille, restaurant rue des postes, il gusto lille",
  openGraph: {
    title: "IL GUSTO - Restaurant Italien & Pizzeria à Lille",
    description: "Pizzas au feu de bois, pâtes fraîches et desserts maison. Sur place et à emporter.",
    url: "https://ilgusto-lille.fr",
    siteName: "IL GUSTO Restaurant",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/placeholder.svg",
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
    images: ["/images/placeholder.svg"],
  },
  alternates: {
    canonical: "https://ilgusto-lille.fr",
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
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
