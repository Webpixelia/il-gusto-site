'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryModal = ({ 
  images, 
  initialIndex,
  onClose 
}: {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const handlePrev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
      >
        <X size={32} />
      </button>

      <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-6 p-2 text-white hover:bg-white/10 rounded-full"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 p-2 text-white hover:bg-white/10 rounded-full"
      >
        <ChevronRight size={48} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 text-center text-white">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};