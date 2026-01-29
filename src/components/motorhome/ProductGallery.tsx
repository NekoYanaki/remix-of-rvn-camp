import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Sun, Moon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: {
    main: string;
    view360?: string;
    productImages: string[];
    floorPlan: {
      day: string;
      night: string;
    };
  };
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [floorPlanMode, setFloorPlanMode] = useState<"day" | "night">("day");

  // Build gallery array with all images
  const getAllImages = () => {
    const allImages: { src: string; label: string }[] = [
      { src: images.main, label: "Main View" },
    ];
    
    if (images.view360) {
      allImages.push({ src: images.view360, label: "360° View" });
    }
    
    images.productImages.forEach((img, idx) => {
      allImages.push({ src: img, label: `Product ${idx + 1}` });
    });
    
    // Add floor plan based on current mode
    allImages.push({ 
      src: floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night, 
      label: `Floor Plan (${floorPlanMode === "day" ? "Day" : "Night"})` 
    });
    
    return allImages;
  };

  const allImages = getAllImages();

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-3">
        {/* Main Image - Large */}
        <div 
          className="col-span-6 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer relative group"
          onClick={() => openModal(0)}
        >
          <img
            src={images.main}
            alt={`${name} - Main View`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
            Main View
          </div>
        </div>

        {/* Right Column - Smaller Images */}
        <div className="col-span-6 grid grid-cols-2 gap-3">
          {/* 360 View */}
          {images.view360 && (
            <div 
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer relative group"
              onClick={() => openModal(1)}
            >
              <img
                src={images.view360}
                alt={`${name} - 360° View`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <RotateCcw className="h-3 w-3" />
                360° View
              </div>
            </div>
          )}

          {/* Product Images (max 3) */}
          {images.productImages.slice(0, 3).map((img, idx) => (
            <div 
              key={idx}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer relative group"
              onClick={() => openModal(images.view360 ? idx + 2 : idx + 1)}
            >
              <img
                src={img}
                alt={`${name} - View ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}

          {/* Floor Plan with Day/Night Toggle */}
          <div className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer relative group">
            <img
              src={floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night}
              alt={`${name} - Floor Plan`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onClick={() => openModal(allImages.length - 1)}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              Floor Plan
            </div>
            {/* Day/Night Toggle */}
            <div className="absolute top-2 right-2 flex bg-white/90 rounded-full p-1 shadow">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFloorPlanMode("day");
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  floorPlanMode === "day" ? "bg-yellow-400 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Sun className="h-3 w-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFloorPlanMode("night");
                }}
                className={`p-1.5 rounded-full transition-colors ${
                  floorPlanMode === "night" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Moon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <img
              src={allImages[selectedImageIndex].src}
              alt={`${name} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
              {allImages[selectedImageIndex].label} - {selectedImageIndex + 1} / {allImages.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-white" : "border-transparent"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
