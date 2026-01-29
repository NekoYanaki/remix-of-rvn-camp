import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  Play,
  Image as ImageIcon,
} from "lucide-react";
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
    const allImages: {
      src: string;
      label: string;
      type: "image" | "360" | "floorplan" | "video";
    }[] = [{ src: images.main, label: "รูปหลัก", type: "image" }];

    if (images.view360) {
      allImages.push({ src: images.view360, label: "360° View", type: "360" });
    }

    images.productImages.slice(0, 3).forEach((img, idx) => {
      allImages.push({ src: img, label: `รูปที่ ${idx + 2}`, type: "image" });
    });

    allImages.push({
      src:
        floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night,
      label: `Floor Plan`,
      type: "floorplan",
    });

    return allImages;
  };

  const allImages = getAllImages();

  // Get thumbnails (max 4: 360 + floor plan side by side, then product images)
  const getThumbnails = () => {
    const thumbs: {
      src: string;
      label: string;
      type: "image" | "360" | "floorplan" | "video";
      index: number;
    }[] = [];

    let idx = 1;

    // 360° view first
    if (images.view360) {
      thumbs.push({ src: images.view360, label: "360°", type: "360", index: idx });
      idx++;
    }

    // Floor plan next to 360°
    thumbs.push({
      src:
        floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night,
      label: "Floor Plan",
      type: "floorplan",
      index: allImages.length - 1,
    });

    // Then product images
    images.productImages.slice(0, 2).forEach((img, i) => {
      thumbs.push({ src: img, label: `รูป ${i + 1}`, type: "image", index: idx });
      idx++;
    });

    return thumbs.slice(0, 4);
  };

  const thumbnails = getThumbnails();

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

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-3">
      {/* Main Grid Layout - Like reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
        {/* Main Image - Takes ~60% on desktop */}
        <div
          className="lg:col-span-3 aspect-[4/3] lg:aspect-[16/11] rounded-xl overflow-hidden cursor-pointer relative group"
          onClick={() => openModal(0)}
        >
          <img
            src={images.main}
            alt={`${name} - รูปหลัก`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Thumbnails Grid - 2 columns x 2 rows on desktop */}
        <div className="lg:col-span-2 grid grid-cols-4 lg:grid-cols-2 gap-2">
          {thumbnails.map((thumb, i) => (
            <div
              key={i}
              className="aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden cursor-pointer relative group"
              onClick={() => openModal(thumb.index)}
            >
              <img
                src={thumb.src}
                alt={thumb.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay badges */}
              {thumb.type === "360" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm">
                    <RotateCcw className="h-3.5 w-3.5" />
                    360°
                  </div>
                </div>
              )}

              {thumb.type === "floorplan" && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-1.5">
                  <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-medium shadow-sm">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Floor Plan
                  </div>
                  {/* Day/Night Toggle */}
                  <div className="flex bg-white/95 backdrop-blur-sm rounded-full p-0.5 shadow-sm">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFloorPlanMode("day");
                      }}
                      className={`p-1.5 rounded-full transition-colors ${
                        floorPlanMode === "day"
                          ? "bg-amber-400 text-white"
                          : "text-muted-foreground hover:text-foreground"
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
                        floorPlanMode === "night"
                          ? "bg-indigo-600 text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Moon className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Video Tile (if available and space) */}
          {images.video && thumbnails.length < 4 && (
            <div
              className="aspect-[4/3] lg:aspect-[16/11] rounded-lg overflow-hidden cursor-pointer relative group bg-muted"
              onClick={() => setShowVideoModal(true)}
            >
              {images.view360 ? (
                <img
                  src={images.view360}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="h-4 w-4 lg:h-5 lg:w-5 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Button (if no space in grid) */}
      {images.video && thumbnails.length >= 4 && (
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
              {allImages[selectedImageIndex].label} • {selectedImageIndex + 1}/
              {allImages.length}
            </div>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-white scale-110"
                      : "border-transparent opacity-70 hover:opacity-100"
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
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <DialogTitle className="sr-only">วิดีโอรถบ้าน {name}</DialogTitle>
          {images.video && getYouTubeId(images.video) && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  images.video
                )}?rel=0`}
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
