import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Sun, Moon, RotateCcw, Play, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: {
    main: string;
    view360?: string;
    productImages: string[];
    floorPlan: {
      day: string;
      night: string;
    };
    video?: string;
  };
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [floorPlanMode, setFloorPlanMode] = useState<"day" | "night">("day");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Build gallery array with all images
  const getAllImages = () => {
    const allImages: { src: string; label: string; type: "image" | "360" | "floorplan" }[] = [
      { src: images.main, label: "รูปหลัก", type: "image" },
    ];
    
    if (images.view360) {
      allImages.push({ src: images.view360, label: "360° View", type: "360" });
    }
    
    images.productImages.slice(0, 2).forEach((img, idx) => {
      allImages.push({ src: img, label: `รูปที่ ${idx + 2}`, type: "image" });
    });
    
    // Add floor plan based on current mode
    allImages.push({ 
      src: floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night, 
      label: `Floor Plan`, 
      type: "floorplan"
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

  // Get video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-3">
      {/* Main Grid Layout - Compact */}
      <div className="grid grid-cols-12 gap-2">
        {/* Main Image - Large */}
        <div 
          className="col-span-7 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer relative group"
          onClick={() => openModal(0)}
        >
          <img
            src={images.main}
            alt={`${name} - รูปหลัก`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Right Column - Thumbnails (max 4) */}
        <div className="col-span-5 grid grid-cols-2 gap-2">
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
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                  <RotateCcw className="h-3 w-3" />
                  360°
                </div>
              </div>
            </div>
          )}

          {/* Product Images (max 2) */}
          {images.productImages.slice(0, 2).map((img, idx) => (
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
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center gap-1">
              <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
                <Image className="h-3 w-3" />
                Floor Plan
              </div>
              {/* Day/Night Toggle */}
              <div className="flex bg-white/90 backdrop-blur-sm rounded-full p-0.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFloorPlanMode("day");
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    floorPlanMode === "day" ? "bg-amber-400 text-white" : "text-gray-600"
                  }`}
                >
                  <Sun className="h-3 w-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFloorPlanMode("night");
                  }}
                  className={`p-1 rounded-full transition-colors ${
                    floorPlanMode === "night" ? "bg-indigo-600 text-white" : "text-gray-600"
                  }`}
                >
                  <Moon className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Button (if available) */}
      {images.video && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowVideoModal(true)}
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          ดูวิดีโอ
        </Button>
      )}

      {/* Gallery Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-2 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <img
              src={allImages[selectedImageIndex].src}
              alt={`${name} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />

            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full text-sm">
              {allImages[selectedImageIndex].label} • {selectedImageIndex + 1}/{allImages.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
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

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0 bg-black">
          <DialogTitle className="sr-only">วิดีโอรถบ้าน {name}</DialogTitle>
          {images.video && getYouTubeId(images.video) && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(images.video)}?rel=0`}
                title="YouTube video player"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductGallery;
