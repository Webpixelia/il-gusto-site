'use client';
import { useState } from 'react';
import Image from 'next/image'; // Ajoutez cette importation
import { GalleryModal } from '@/components/ImageModalCarousel';
import { X, ChevronLeft, ChevronRight } from 'lucide-react'; // Importez les icônes si nécessaire

export function GalleryView({ galerieData }: { galerieData: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<{src: string, alt: string}[]>([]);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  const openModal = (images: {src: string, alt: string}[], index: number) => {
    setModalImages(images);
    setInitialImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <>
      {galerieData.map((category: any) => (
        <section key={category.id.toString()} id={category.id.toString()} className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-8">
            <h2 className="text-4xl font-handwriting text-[#4a8063]">{category.name}</h2>
            <div className="ml-4 h-0.5 flex-1 bg-gray-200"></div>
          </div>

          {category.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((image: any, index: number) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => openModal(
                    galerieData.flatMap((c: any) => c.images),
                    galerieData.flatMap((c: any) => c.images).findIndex((img: any) => img.src === image.src)
                  )}
                >
                  <div className="relative h-64">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 bg-[#f9f9f9]">
                    <p className="text-gray-700">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">Aucune image disponible pour cette catégorie</p>
          )}
        </section>
      ))}

      {isModalOpen && (
        <GalleryModal
          images={modalImages}
          initialIndex={initialImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}