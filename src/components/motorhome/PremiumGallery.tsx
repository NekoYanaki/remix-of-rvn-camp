import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  Play,
  Camera,
  Layout,
  Film,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface PremiumGalleryProps {
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

// Thumbnail labels for storytelling
const thumbnailLabels = ["Exterior", "Lifestyle", "Interior", "Camping Setup"];

const PremiumGallery = ({ images, name }: PremiumGalleryProps) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [floorPlanMode, setFloorPlanMode] = useState<"day" | "night">("day");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // All photos for lightbox
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

  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  const tabs = [
    { id: "photos", label: "รูปภาพ", icon: Camera },
    ...(images.view360 ? [{ id: "360", label: "360°", icon: RotateCcw }] : []),
    { id: "floorplan", label: "Floor Plan", icon: Layout },
    ...(images.video ? [{ id: "video", label: "วิดีโอ", icon: Film }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Hero Image - Large cinematic display */}
      <div
        className="relative aspect-[21/9] md:aspect-[2.4/1] rounded-3xl overflow-hidden cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <img
          src={images.main}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />
        {/* Subtle cinematic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5" />
        
        {/* Photo count badge - Minimal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(0);
          }}
          className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md text-foreground/80 px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:bg-white hover:text-foreground transition-all flex items-center gap-2"
        >
          <Camera className="h-4 w-4" />
          ดูรูปทั้งหมด
        </button>
      </div>

      {/* Media Tabs - Soft pills style */}
      <div className="flex justify-center">
        <div className="inline-flex bg-muted/30 rounded-full p-1 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {/* Photos Grid */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allPhotos.slice(1, 5).map((photo, idx) => (
              <div
                key={idx}
                className="group cursor-pointer"
                onClick={() => openLightbox(idx + 1)}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-2">
                  <img
                    src={photo}
                    alt={`${name} ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                {/* Optional label */}
                <p className="text-xs text-muted-foreground/60 text-center">
                  {thumbnailLabels[idx] || ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 360° View */}
        {activeTab === "360" && images.view360 && (
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted/30">
              <img
                src={images.view360}
                alt={`${name} - 360° View`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-center">
              <div className="bg-muted/30 px-5 py-2.5 rounded-full text-sm text-muted-foreground flex items-center gap-2">
                <RotateCcw className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
                ลากเพื่อหมุนชมรอบคัน
              </div>
            </div>
          </div>
        )}

        {/* Floor Plan */}
        {activeTab === "floorplan" && (
          <div className="space-y-6">
            {/* Day/Night Toggle - Refined */}
            <div className="flex justify-center">
              <div className="inline-flex bg-muted/30 rounded-full p-1">
                <button
                  onClick={() => setFloorPlanMode("day")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    floorPlanMode === "day"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  <Sun className="h-4 w-4" />
                  กลางวัน
                </button>
                <button
                  onClick={() => setFloorPlanMode("night")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    floorPlanMode === "night"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground/80"
                  }`}
                >
                  <Moon className="h-4 w-4" />
                  กลางคืน
                </button>
              </div>
            </div>
            
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted/20 border border-border/30">
              <img
                src={floorPlanMode === "day" ? images.floorPlan.day : images.floorPlan.night}
                alt={`Floor Plan - ${floorPlanMode}`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Video */}
        {activeTab === "video" && images.video && (
          <div
            className="aspect-[16/9] rounded-2xl overflow-hidden bg-muted/30 relative cursor-pointer group"
            onClick={() => setShowVideoModal(true)}
          >
            <img
              src={images.main}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform">
                <Play className="h-8 w-8 md:h-10 md:w-10 text-foreground/80 ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-6 md:p-12">
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors z-10 p-2"
            >
              <X className="h-6 w-6 md:h-8 md:w-8" />
            </button>

            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 md:left-12 text-white/60 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 md:right-12 text-white/60 hover:text-white transition-colors z-10 p-2"
                >
                  <ChevronRight className="h-10 w-10 md:h-12 md:w-12" />
                </button>
              </>
            )}

            <img
              src={allPhotos[lightboxIndex]}
              alt={`${name} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Minimal progress indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {allPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === lightboxIndex ? "bg-white w-8" : "bg-white/30 w-1.5 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none rounded-3xl overflow-hidden">
          <DialogTitle className="sr-only">วิดีโอ {name}</DialogTitle>
          {images.video && getYouTubeId(images.video) && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(images.video)}?rel=0&autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumGallery;
