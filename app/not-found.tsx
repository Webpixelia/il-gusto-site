import Link from 'next/link'
import { Home } from 'lucide-react'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl font-handwriting text-[#4a8063] mb-6">404</h1>
          <h2 className="text-3xl font-handwriting mb-4">Page non trouvée</h2>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-[#4a8063] hover:bg-[#3a6a53] text-white font-handwriting py-3 px-6 rounded-md transition-all"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
} 