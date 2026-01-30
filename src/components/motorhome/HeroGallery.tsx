import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface HeroGalleryProps {
  images: {
    main: string;
    productImages: string[];
  };
  name: string;
}

const HeroGallery = ({ images, name }: HeroGalleryProps) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allPhotos = [images.main, ...images.productImages];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <>
      {/* Hero Gallery - 1 Large + 2 Small on Right */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {/* Main Large Image */}
        <div
          className="md:col-span-2 aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden cursor-pointer group relative"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images.main}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          
          {/* Photo count badge */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openLightbox(0);
            }}
            className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors flex items-center gap-1.5"
          >
            <Camera className="h-3.5 w-3.5" />
            {allPhotos.length} รูป
          </button>
        </div>

        {/* 2 Small Images on Right */}
        <div className="hidden md:flex flex-col gap-2 md:gap-3">
          {images.productImages.slice(0, 2).map((photo, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(idx + 1)}
            >
              <img
                src={photo}
                alt={`${name} ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors z-10 p-2"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
                </button>
              </>
            )}

            <img
              src={allPhotos[lightboxIndex]}
              alt={`${name} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Progress indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {allPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === lightboxIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroGallery;
