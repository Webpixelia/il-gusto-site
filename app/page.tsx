import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import MenuPreview from "@/components/layout/MenuPreview"
import GoogleReviews from '@/components/layout/GoogleReviews';
import { MapPin, Phone, Clock, ChevronRight, Star, Utensils, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { fetchStrapiData, getGalerieData, generateDirectionsUrl } from '@/lib/strapi'
import type { ContactInfo } from '@/types/strapi'
import ContactMap from '@/components/layout/ContactMap'

export default async function Home() {
  // Récupération des données depuis Strapi
  const contactData = await fetchStrapiData<ContactInfo>('/contact-infos?populate=*');
  const contactInfo = contactData.data[0];
  const galerieData = await getGalerieData();

  const strapiBaseUrl = process.env.STRAPI_API_URL;
  const logoUrl = contactInfo.Logo?.url
    ? `${strapiBaseUrl}${contactInfo.Logo.url}` 
    : '/images/placeholder.svg';
  console.log('Logo URL:', logoUrl);

  // Récupération des images featured
  const allImages = galerieData.flatMap(category => 
    category.images.map(img => ({ ...img, categoryName: category.name }))
  );
  const featuredImages = allImages.filter(img => img.featured).slice(0, 4);

  // Génération de l'URL pour le lien Itinéraire
  const directionsUrl = generateDirectionsUrl(
    contactInfo.Latitude,
    contactInfo.Longitude,
    contactInfo.Adresse
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section - Improved with better accessibility and semantic HTML */}
        <section
          className="relative h-[80vh] bg-black flex items-center justify-center overflow-hidden"
          aria-label="Bannière principale"
        >
          <div className="absolute inset-0 opacity-40 z-0">
            <Image
              src="/images/pizza-bg.jpg"
              alt="Four à pizza traditionnel avec flammes"
              fill
              className="object-cover"
              priority
              sizes="100vw" 
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src={logoUrl}
                alt="IL GUSTO Logo - Restaurant Italien"
                width={200}
                height={200}
                className="animate-fade-in"
              />
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-handwriting mb-4">IL GUSTO</h1>
            <p className="text-white text-xl md:text-2xl font-handwriting mb-8">
              Authentique Restaurant Italien à Lille
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#menu"
                className="bg-[#4a8063] hover:bg-[#3a6a53] text-white font-handwriting py-3 px-6 rounded-md text-lg transition-all"
                aria-label="Voir notre menu"
              >
                Notre Menu
              </Link>
              <Link
                href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`}
                className="bg-white hover:bg-gray-100 text-black font-handwriting py-3 px-6 rounded-md text-lg transition-all flex items-center justify-center gap-2"
                aria-label="Nous appeler"
              >
                <Phone className="w-4 h-4" /> {contactInfo.Telephone}
              </Link>
            </div>
          </div>
        </section>

        {/* Promotion Banner - New section */}
        <section className="bg-[#4a8063] text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="font-handwriting text-xl">
              <span className="font-bold">OFFRE SPÉCIALE :</span> -20% sur toutes les pizzas à emporter du lundi au
              jeudi !
            </p>
          </div>
        </section>

        {/* Info Section - Improved with better semantic structure */}
        <section className="py-12 bg-white" aria-labelledby="info-heading">
          <div className="container mx-auto px-4">
            <h2 id="info-heading" className="sr-only">
              Informations pratiques
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#f9f9f9] p-6 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <MapPin className="w-10 h-10 text-[#4a8063] mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-handwriting mb-2">Adresse</h3>
                <address className="not-italic whitespace-pre-line">
                        {contactInfo.Adresse}
                </address>
                <Link
                  href={contactInfo.Adresse ? 
                    `https://maps.google.com/?q=${encodeURIComponent(contactInfo.Adresse)}` :
                    'https://maps.google.com'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 text-[#4a8063] hover:underline"
                  aria-label="Voir notre adresse sur Google Maps"
                >
                  Voir sur Google Maps
                </Link>
              </div>

              <div className="bg-[#f9f9f9] p-6 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <Phone className="w-10 h-10 text-[#4a8063] mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-handwriting mb-2">Contact</h3>
                <p className="text-gray-700 mb-2">
                  <a 
                    href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`} 
                    className="hover:underline"
                  >
                    {contactInfo.Telephone}
                  </a>
                </p>
                <p className="text-gray-700">
                  <a href={`mailto:${contactInfo.Email}`} className="hover:underline">
                    {contactInfo.Email}
                  </a>
                </p>
                <p className="mt-3 text-sm text-gray-600">Pour commandes et réservations</p>
              </div>

              <div className="bg-[#f9f9f9] p-6 rounded-lg flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <Clock className="w-10 h-10 text-[#4a8063] mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-handwriting mb-2">Horaires</h3>
                <ul className="space-y-1">
                    {(contactInfo.Horaires as string).split('\n').map((line: string, index: number) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>
                <p className="mt-3 text-sm text-gray-600">Cuisine ouverte en continu le weekend</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - New section */}
        <section className="py-16 bg-[#f9f9f9]" aria-labelledby="about-heading">
          <div className="container mx-auto px-4">
            <h2 id="about-heading" className="text-4xl font-handwriting text-center mb-12">
              Notre Histoire
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-handwriting text-[#4a8063] mb-4">Passion & Tradition</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Depuis 2018, IL GUSTO vous fait découvrir les saveurs authentiques de l'Italie au cœur de Lille. Notre
                  chef, originaire de Naples, perpétue les recettes traditionnelles transmises de génération en
                  génération.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Notre four à bois, importé directement d'Italie, est l'âme de notre restaurant. Il nous permet de
                  cuire nos pizzas à haute température, leur donnant cette texture croustillante à l'extérieur et
                  moelleuse à l'intérieur qui fait la renommée des pizzas napolitaines.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Tous nos ingrédients sont soigneusement sélectionnés : mozzarella di bufala, tomates San Marzano,
                  huile d'olive extra vierge... Nous privilégions les produits frais et de saison pour vous offrir une
                  expérience culinaire inoubliable.
                </p>
              </div>
              <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/pizza-bg.jpg"
                  alt="Notre chef préparant une pizza traditionnelle"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Menu Preview Section - Improved with better semantic structure and accessibility */}
        <MenuPreview />

        {/* Gallery Section */}
        <section className="py-16 bg-white" aria-labelledby="gallery-heading">
          <div className="container mx-auto px-4">
            <h2 id="gallery-heading" className="text-4xl font-handwriting text-center mb-12">
              Notre Cuisine
            </h2>
            
            {featuredImages.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {featuredImages.map((image, index) => (
                    <div key={`${image.src}-${index}`} className="relative h-48 md:h-64 rounded-lg overflow-hidden group">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority={index < 2}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link href="/galerie" className="text-[#4a8063] hover:text-[#3a6a53] font-handwriting inline-flex items-center">
                    Voir plus de photos <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={`placeholder-${index}`} className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Photo {index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section - New section */}
        {/*
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 id="testimonials-heading" className="text-4xl font-handwriting text-center mb-12">
              Ce que disent nos clients
            </h2>
            <GoogleReviews />
          </div>
        </section>
        */}
        <section className="py-16 bg-[#f9f9f9]" aria-labelledby="testimonials-heading">
          <div className="container mx-auto px-4">
            <h2 id="testimonials-heading" className="text-4xl font-handwriting text-center mb-12">
              Avis Clients
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">il y a 2 semaines</span>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "La meilleure pizza de Lille ! La pâte est parfaite, fine et croustillante. Les ingrédients sont frais
                  et de qualité. Le service est impeccable. Je recommande vivement !"
                </blockquote>
                <footer className="font-semibold">Marie L.</footer>
              </Card>

              <Card className="p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">il y a 1 mois</span>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "Excellente découverte ! Les pâtes sont délicieuses et faites maison. L'ambiance est chaleureuse et le
                  personnel très accueillant. Un vrai restaurant italien comme on les aime."
                </blockquote>
                <footer className="font-semibold">Thomas D.</footer>
              </Card>

              <Card className="p-6 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                    <Star className="w-5 h-5 fill-current" aria-hidden="true" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">il y a 3 mois</span>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "Le tiramisu est à tomber par terre ! Je viens régulièrement chez IL GUSTO et je n'ai jamais été
                  déçue. Les prix sont raisonnables pour la qualité proposée. À essayer absolument !"
                </blockquote>
                <footer className="font-semibold">Sophie M.</footer>
              </Card>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="https://g.page/ilgusto-lille/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4a8063] hover:bg-[#3a6a53] text-white font-handwriting py-2 px-6 rounded-md transition-all inline-flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Laisser un avis
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - New section */}
        <section className="py-16 bg-[#4a8063] text-white" aria-labelledby="cta-heading">
          <div className="container mx-auto px-4 text-center">
            <h2 id="cta-heading" className="text-4xl font-handwriting mb-6">
              Envie de déguster nos spécialités ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Réservez votre table ou commandez à emporter dès maintenant !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-black hover:bg-gray-900 text-white font-handwriting py-3 px-6 rounded-md text-lg transition-all inline-flex items-center justify-center"
              >
                <Utensils className="w-5 h-5 mr-2" /> Commander en ligne
              </Link>
            </div>
          </div>
        </section>

        {/* Map Section - Improved with better semantic structure and accessibility */}
        <section className="py-16 bg-white" aria-labelledby="location-heading">
          <div className="container mx-auto px-4">
            <h2 id="location-heading" className="text-4xl font-handwriting text-center mb-12">
              Nous Trouver
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Composant de carte dynamique */}
                <ContactMap contact={contactInfo} />
              <div>
                <h3 className="text-3xl font-handwriting text-[#4a8063] mb-4">IL GUSTO</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Situé au cœur de Lille, à proximité du Théâtre Sébastopol, IL GUSTO vous propose des pizzas et pâtes
                  authentiques, préparées avec des ingrédients frais et de qualité.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Notre four à bois traditionnel donne à nos pizzas une saveur unique que vous ne trouverez nulle part
                  ailleurs à Lille.
                </p>
                <div className="space-y-3">
                  <div className="flex items-top">
                    <MapPin className="w-5 h-5 text-[#4a8063] mr-2" aria-hidden="true" />
                    <address className="not-italic whitespace-pre-line">
                        {contactInfo.Adresse}
                    </address>
                  </div>
                  <div className="flex items-top">
                    <Phone className="w-5 h-5 text-[#4a8063] mr-2" aria-hidden="true" />
                    <p className="text-gray-700">
                        <a 
                          href={`tel:${contactInfo.Telephone.replace(/\s/g, '')}`} 
                          className="hover:underline"
                        >
                          {contactInfo.Telephone}
                        </a>
                    </p>
                  </div>
                  <div className="flex items-top">
                    <Clock className="w-5 h-5 text-[#4a8063] mr-2" aria-hidden="true" />
                    <ul className="space-y-1">
                        {(contactInfo.Horaires as string).split('\n').map((line: string, index: number) => (
                          <li key={index}>{line}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#4a8063] hover:bg-[#3a6a53] text-white font-handwriting py-2 px-6 rounded-md transition-all inline-flex items-center"
                  >
                    <MapPin className="w-4 h-4 mr-2" /> Itinéraire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
